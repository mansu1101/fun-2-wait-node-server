const mongoose = require('mongoose')
// fsRoleSkill matrix (Needs to check this)
const skillRoleMatrixSchema = mongoose.Schema(
  {
    skillCode: { type: String, required: true },
    finalScore: { type: Number },
    role: { type: String },
    isActive: { type: Boolean, default: true }
  },
  { collection: 'skillRoleMatrix', timestamps: true }
)

module.exports = skillRoleMatrixSchema
