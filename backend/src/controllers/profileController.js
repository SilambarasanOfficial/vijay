const { store } = require('../config/store');

const EDITABLE = ['name', 'tagline', 'bio', 'vision', 'instagram', 'phone', 'experience'];

// GET /api/profile  — public
exports.getProfile = (req, res) => {
  res.json(store.profile);
};

// PUT /api/profile  — auth
exports.updateProfile = (req, res) => {
  EDITABLE.forEach((field) => {
    if (req.body[field] !== undefined) store.profile[field] = req.body[field];
  });
  res.json(store.profile);
};
