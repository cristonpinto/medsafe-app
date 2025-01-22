const Medication = require('../models/medication.model'); // Assuming you have a Mongoose model

exports.createMedication = async (req, res) => {
  try {
    const newMedication = new Medication(req.body);
    const savedMedication = await newMedication.save();
    res.status(201).json(savedMedication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getMedications = async (req, res) => {
  try {
    const medications = await Medication.find({ userId: req.params.userId });
    res.status(200).json(medications);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateMedication = async (req, res) => {
  try {
    const updatedMedication = await Medication.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedMedication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteMedication = async (req, res) => {
  try {
    await Medication.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Medication deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};