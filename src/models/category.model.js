// load the things we need
const mongoose = require('mongoose')
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate-v2')
const Schema = mongoose.Schema
const uuid = require('uuid')
const validator = require('validator')

const CategorySchema = {
  categoryId: {
    type: String,
    unique: true,
    default: () => uuid.v4(),
    validate: {
      validator: (value) => validator.isUUID(value),
      message: 'categoryId is invalid  UUID'
    }
  },
  orgId: {
    type: String,
    validate: {
      validator: (value) => validator.isUUID(value),
      message: 'orgId is invalid UUID'
    },
    ref: 'orgs'
  },
  categoryName: {
    type: String,
    required: true
  },
  parentId: {
    type: String,
    default: ''
  },
  // sfiaType: { TODO: check
  //   type: String,
  //   required: false,
  // },
  isActive: {
    type: Boolean,
    default: true
  }
  // langCode: {
  //   type: String,
  //   required: false,
  // },
}

const schema = new Schema(CategorySchema, {
  collection: 'categories',
  timestamps: true
})

schema.plugin(mongooseAggregatePaginate)

schema.path('orgId').validate(async (value) => {
  const { OrgModel } = require('./org.model')
  return await OrgModel.findOne({ orgId: value })
}, 'Org does not exist')

schema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject()
  object.id = _id
  return object
})

const CategoryModel = mongoose.model('categories', schema, 'categories')

module.exports = { CategoryModel, CategorySchema }
