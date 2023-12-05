const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate-v2')
const Schema = mongoose.Schema
const validator = require('validator')
const uuid = require('uuid')

const SkillSchema = {
  skillId: {
    type: String,
    default: () => uuid.v4(),
    unique: true,
    validate: {
      validator: (value) => validator.isUUID(value),
      message: 'skillId is invalid UUID'
    }
  },
  orgId: {
    type: String,
    validate: {
      validator: (value) => validator.isUUID(value),
      message: 'orgId is Invalid UUID'
    },
    ref: 'orgs'
  },
  categoryId: {
    type: String,
    required: true
  },
  subCategoryId: {
    type: String,
    required: true
  },
  name: { type: String },
  code: { type: String, required: true },
  description: { type: String },
  isActive: { type: Boolean, default: true },
  orgInActiveStatus: {
    type: Array,
    default: []
  }
}

const schema = new Schema(SkillSchema, {
  collection: 'skills',
  timestamps: true
})

schema.path('orgId').validate(async (value) => {
  const { OrgModel } = require('./org.model')
  return await OrgModel.findOne({ orgId: value })
}, 'Org does not exist')

schema.plugin(mongooseAggregatePaginate)
schema.plugin(mongoosePaginate)

schema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject()
  object.id = _id
  return object
})
const SkillsModel = mongoose.model('skills', schema, 'skills')

module.exports = { SkillsModel, SkillSchema }
