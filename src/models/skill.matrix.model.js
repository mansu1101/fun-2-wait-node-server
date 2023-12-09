const mongoose = require('mongoose')
// Needs to check skillMatrixSchema
const skillMatrixSchema = mongoose.Schema(
  {
    skillCode: { type: String, required: true },
    finalScore: { type: Number },
    // sid               :  {type: Boolean, default: false}, // TODO: check
    statement: { type: String },
    isActive: { type: Boolean, default: true }
  },
  { collection: 'skillMatrix', timestamps: true }
)

module.exports = skillMatrixSchema
