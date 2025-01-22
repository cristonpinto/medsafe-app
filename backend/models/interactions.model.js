// interactions.model.js
const interactionSchema = new mongoose.Schema({
    medicationA: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Medication',
      required: true
    },
    medicationB: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Medication',
      required: true
    },
    severity: {
      type: String,
      enum: ['high', 'moderate', 'low'],
      required: true
    },
    description: {
      type: String,
      required: true
    },
    recommendations: [String],
    source: String,
    dateIdentified: {
      type: Date,
      default: Date.now
    }
  });