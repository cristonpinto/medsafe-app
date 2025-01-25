const express = require('express');
const router = express.Router();
const remindersController = require('../controllers/reminders.controller');

router.get('/:userId', remindersController.getReminders);
router.put('/:id', remindersController.updateReminderStatus);

module.exports = router;