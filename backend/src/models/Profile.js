const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, default: 'Vijay' },
    tagline: {
      type: String,
      default: 'Capturing the Untamed. Framing Stories Beyond Words.',
    },
    bio: {
      type: String,
      default:
        'I am Vijay, the creative eye behind VJ Photography. My journey in photography is driven by patience, passion, and a deep connection with nature.',
    },
    vision: {
      type: String,
      default:
        'Photography is not about the camera. It\'s about the eyes behind it — and the heart that decides when to press the shutter.',
    },
    instagram: { type: String, default: '@vjphotography' },
    phone: { type: String, default: '9791224530' },
    experience: { type: String, default: '5+' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Profile', profileSchema);
