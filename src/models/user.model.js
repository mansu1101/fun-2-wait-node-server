// load the things we need
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const uuid = require('uuid')
const validator = require('validator')
const { isEmail } = require('validator')
const arrayValidator = require('mongoose-array-validator')
const mongoosePaginate = require('mongoose-paginate-v2')

const Address = {
  addressLine1: {
    type: String
  },
  addressLine2: {
    type: String
  },
  city: {
    type: String
  },
  state: {
    type: String
  },
  zipCode: {
    type: String
  },
  country: {
    type: String
  }
}

const UserSchema = {
  userId: {
    type: String,
    unique: true,
    default: () => uuid.v4(),
    validate: {
      validator: (value) => validator.isUUID(value),
      message: 'userId is invalid UUID'
    }
  },
  userRoleId: {
    type: String,
    validate: {
      validator: (value) => validator.isUUID(value),
      message: 'userRoleId is Invalid UUID'
    },
    ref: 'UserRole'
  },
  mobile: {
    type: String
  },
  email: {
    type: String,
    immutable: true,
    unique: true,
    validate: [isEmail, 'Enter valid email address'],
    lowercase: true,
    trim: true,
    required: true
  },
  password: {
    type: String
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  avatar: {
    type: String
  },
  address: {
    type: Address
  },
  isActive: {
    type: Boolean,
    default: true
  }
}

const schema = new Schema(UserSchema, {
  collection: 'users',
  timestamps: true
})

schema.plugin(mongoosePaginate)
schema.plugin(arrayValidator)

// path validation
schema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject()
  object.id = _id
  return object
})

schema.path('userRoleId').validate(async (value) => {
  const { UserRoleModel } = require('./user.role.model')
  return await UserRoleModel.findOne({ userRoleId: value })
}, 'User role does not exist')

// hooks
schema.pre('save', async function (next) {
  try {
    const user = this
    if (user.password) {
      const salt = await bcrypt.genSaltSync(10)
      const hash = await bcrypt.hashSync(user.password, salt, null)
      user.password = hash
    }
    next()
  } catch (err) {
    next(err)
  }
})

// methods
schema.methods.comparePassword = async function (password) {
  return await bcrypt.compareSync(password, this.password)
}

schema.methods.generateToken = async function (jwt) {
  const { UserRoleModel } = require('./user.role.model')
  const user = this
  const data = user.toJSON()
  const userRole = await UserRoleModel.findOne({
    userRoleId: data.userRoleId
  })
  const { id, password, token, createdAt, updatedAt, ...userTokenInfo } = data
  const tokenData = {
    ...userTokenInfo,
    userRole: userRole?.name,
    userRoleId: userRole?.userRoleId
  }
  const $token = jwt.sign(tokenData)
  // user.token = token;
  // user.save();
  return $token
}

// schema.methods.findUserByToken = async function (jwt, token) {
//   const user = this;
//   const { token } = user.toJSON();
//   return token;
// };

schema.methods.deleteToken = async function () {
  const user = this
  return await user.update({ $unset: { session: 1 } })
}

const UserModel = mongoose.model('user', schema, 'users', { strict: true })

module.exports = { UserModel, UserSchema }
