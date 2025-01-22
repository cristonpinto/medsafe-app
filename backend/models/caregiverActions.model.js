// caregiverActions.model.js
const caregiverActionSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    caregiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    actionType: {
      type: String,
      enum: ['medication_change', 'schedule_update', 'reminder_added', 'note_added'],
      required: true
    },
    description: String,
    timestamp: {
      type: Date,
      default: Date.now
    },
    relatedMedicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Medication'
    }
  });