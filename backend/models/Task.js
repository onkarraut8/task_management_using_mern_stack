// models/Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  taskName: { type: String, required: true },
  taskStatus: { type: String, enum: ['PENDING', 'IN PROGRESS', 'COMPLETED'], required: true },
});

module.exports = mongoose.model('Task', taskSchema);
