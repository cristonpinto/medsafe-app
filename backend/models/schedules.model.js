// schedules.model.js
const scheduleSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    medicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Medication',
      required: true
    },
    frequency: {
      type: String,
      enum: ['daily', 'weekly', 'monthly', 'as-needed'],
      required: true
    },
    times: [{
      time: String,
      daysOfWeek: [Number], // 0-6 (Sunday-Saturday)
      dosage: {
        amount: Number,
        unit: String
      }
    }],
    startDate: Date,
    endDate: Date,
    active: {
      type: Boolean,
      default: true
    },
    notes: String,
    lastModified: {
      type: Date,
      default: Date.now
    }
  });