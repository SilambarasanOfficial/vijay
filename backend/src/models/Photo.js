const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true, default: '' },
    location: { type: String, trim: true, default: '' },
    category: {
      type: String,
      required: true,
      enum: ['Wildlife', 'Portrait', 'Model', 'Street', 'Advertisement'],
    },
    filename: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Photo', photoSchema);
