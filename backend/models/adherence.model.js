// adherence.model.js
const adherenceSchema = new mongoose.Schema({
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
    date: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: ['taken', 'missed', 'delayed'],
      required: true
    },
    actualTime: Date,
    scheduledTime: Date,
    notes: String
  });