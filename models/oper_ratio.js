// using mongoose
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ORSchema = new Schema({
  zone: {
    type: String,
    required: true
  },
  line_name: {
    type: String,
    required: true
  },
  plan: {
    type: Number,
    required: true,
    unique: true
  },
  actual: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  or: {
    type: Number,
    required: true,
    min: 0
  }
})

const or_prod  = mongoose.model('or_prod',ORSchema)

module.exports = or_prod