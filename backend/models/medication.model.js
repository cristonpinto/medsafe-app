const mongoose = require('mongoose');

const medicationSchema = new mongoose.Schema({
  patientId: String,
  patientName: String,
  patientDob: Date,
  patientContact: String,
  patientEmail: String,
  illnessName: String,
  doctorName: String,
  doctorSpecialty: String,
  startDate: Date,
  drugs: [
    {
      name: String,
      dosage: String,
      times: [String],
      beforeAfterFood: String
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Medication', medicationSchema);