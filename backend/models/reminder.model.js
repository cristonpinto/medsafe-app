const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
  userId: String,
  medicationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Medication' },
  patientName: String,
  drugName: String,
  dosage: String,
  time: String,
  beforeAfterFood: String,
  reminderTime: Date,
  isCompleted: Boolean
}, { timestamps: true });

module.exports = mongoose.model('Reminder', reminderSchema);