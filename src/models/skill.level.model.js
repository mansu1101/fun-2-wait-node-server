// load the things we need
const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const Schema = mongoose.Schema
const uuid = require('uuid')
const validator = require('validator')
// needs to discuss about updation
const SkillLevelSchema =
  {
    skillLevelId: {
      type: String,
      default: () => uuid.v4(),
      unique: true,
      validate: {
        validator: (value) => validator.isUUID(value),
        message: 'skillLevelId is Invalid UUID'
      }
    },
    skillId: {
      type: String,
      validate: {
        validator: (value) => validator.isUUID(value),
        message: 'skillId is Invalid UUID'
      },
      ref: 'skills'
    },
    orgId: {
      type: String,
      validate: {
        validator: (value) => validator.isUUID(value),
        message: 'orgId is Invalid UUID'
      },
      ref: 'orgs'
    },
    level: {
      type: Number
    },
    levelDescription: {
      type: String
    },
    isActive: {
      type: Boolean
    },
    langCode: {
      type: String
    }
    // sfiaType: { // TODO: check
    //     type: String,
    //     default: 1
    // },
    // priority: {
    //   type: String,
    //   default: false,
    // },
  }

const schema = new Schema(SkillLevelSchema, {
  collection: 'skill_level',
  timestamps: true
})

schema.index({ skillId: 1, level: 1 }, { unique: true })

schema.path('orgId').validate(async (value) => {
  const { OrgModel } = require('./org.model')
  return await OrgModel.findOne({ orgId: value })
}, 'Org does not exist')

schema.path('skillId').validate(async (value) => {
  const { SkillsModel } = require('./skills.model')
  return await SkillsModel.findOne({ skillId: value })
}, 'Skills does not exist')

schema.plugin(mongoosePaginate)

schema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject()
  object.id = _id
  return object
})
const SkillLevelModel = mongoose.model(
  'skill_level',
  schema,
  'skill_level',
  { strict: true }
)

module.exports = { SkillLevelModel, SkillLevelSchema }
