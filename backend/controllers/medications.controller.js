const Medication = require('../models/medication.model');
const Reminder = require('../models/reminder.model');

exports.createMedication = async (req, res) => {
  try {
    const newMedication = new Medication(req.body);
    const savedMedication = await newMedication.save();

    // Create reminders for each drug and time
    const reminders = [];
    for (const drug of req.body.drugs) {
      for (const time of drug.times) {
        const reminder = new Reminder({
          userId: req.body.userId,
          medicationId: savedMedication._id,
          patientName: req.body.patientName,
          drugName: drug.name,
          dosage: drug.dosage,
          time: time,
          beforeAfterFood: drug.beforeAfterFood,
          reminderTime: calculateReminderTime(req.body.startDate, time),
          isCompleted: false
        });
        reminders.push(reminder);
      }
    }
    await Reminder.insertMany(reminders);

    res.status(201).json({ medication: savedMedication, reminders: reminders });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getMedications = async (req, res) => {
  try {
    const medications = await Medication.find({ patientId: req.params.patientId });
    res.status(200).json(medications);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateMedication = async (req, res) => {
  try {
    const updatedMedication = await Medication.findByIdAndUpdate(req.params.id, req.body, { new: true });
    
    // Update or create new reminders based on the updated medication
    await Reminder.deleteMany({ medicationId: updatedMedication._id });
    const newReminders = [];
    for (const drug of req.body.drugs) {
      for (const time of drug.times) {
        const reminder = new Reminder({
          userId: req.body.userId,
          medicationId: updatedMedication._id,
          patientName: req.body.patientName,
          drugName: drug.name,
          dosage: drug.dosage,
          time: time,
          beforeAfterFood: drug.beforeAfterFood,
          reminderTime: calculateReminderTime(req.body.startDate, time),
          isCompleted: false
        });
        newReminders.push(reminder);
      }
    }
    await Reminder.insertMany(newReminders);

    res.status(200).json({ medication: updatedMedication, reminders: newReminders });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteMedication = async (req, res) => {
  try {
    await Medication.findByIdAndDelete(req.params.id);
    await Reminder.deleteMany({ medicationId: req.params.id });
    res.status(200).json({ message: 'Medication and associated reminders deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

function calculateReminderTime(startDate, time) {
  const reminderDate = new Date(startDate);
  switch (time) {
    case 'morning':
      reminderDate.setHours(8, 0, 0, 0);
      break;
    case 'afternoon':
      reminderDate.setHours(13, 0, 0, 0);
      break;
    case 'evening':
      reminderDate.setHours(18, 0, 0, 0);
      break;
    case 'night':
      reminderDate.setHours(22, 0, 0, 0);
      break;
  }
  return reminderDate;
}