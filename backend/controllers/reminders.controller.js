const Reminder = require('../models/reminder.model');

exports.getReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find({ userId: req.params.userId });
    res.status(200).json(reminders);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateReminderStatus = async (req, res) => {
  try {
    const updatedReminder = await Reminder.findByIdAndUpdate(
      req.params.id,
      { isCompleted: req.body.isCompleted },
      { new: true }
    );
    res.status(200).json(updatedReminder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};