let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let schemaName = 'Task'

let comment = new Schema({
  description: { type: String, required: true },
  created: { type: Number, required: true, default: Date.now() },
  authorId: { type: ObjectId, ref: 'User', required: true },
  taskId: {type: ObjectId, ref: 'Task', required: true}
})

let schema = new Schema({
  description: { type: String, required: true },
  created: { type: Number, required: true, default: Date.now() },
  authorId: { type: ObjectId, ref: 'User', required: true },
  listId: {type: ObjectId, ref: 'List', required: true},
  comments: [ comment ]
})


module.exports = mongoose.model(schemaName, schema)