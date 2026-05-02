const fs = require('fs');
const path = require('path');
const { store, nextId } = require('../config/store');

const validCategory = (name) =>
  store.categories.some((c) => c.name === name && c.isActive);

// GET /api/photos  — public, active only
exports.getPublicPhotos = (req, res) => {
  let list = store.photos.filter((p) => p.isActive);
  if (req.query.category) list = list.filter((p) => p.category === req.query.category);
  res.json([...list].reverse());
};

// GET /api/photos/admin  — all photos (auth)
exports.getAllPhotos = (req, res) => {
  let list = [...store.photos];
  if (req.query.category) list = list.filter((p) => p.category === req.query.category);
  res.json(list.reverse());
};

// POST /api/photos  — upload new photo (auth)
exports.createPhoto = (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ message: 'Image file is required' });

    const { title, description = '', location = '', category } = req.body;

    if (!title || !category)
      return res.status(400).json({ message: 'Title and category are required' });

    if (!validCategory(category))
      return res.status(400).json({ message: `Invalid category: "${category}"` });

    const photo = {
      _id: nextId(),
      title,
      description,
      location,
      category,
      filename: req.file.filename,
      isActive: true,
      createdAt: new Date().toISOString(),
    };

    store.photos.push(photo);
    res.status(201).json(photo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/photos/:id  — edit photo (auth)
exports.updatePhoto = (req, res) => {
  try {
    const idx = store.photos.findIndex((p) => p._id === req.params.id);
    if (idx === -1) return res.status(404).json({ message: 'Photo not found' });

    const { title, description, location, category } = req.body;

    // Replace image file if a new one was uploaded
    if (req.file) {
      const oldPath = path.join(__dirname, '../../uploads', store.photos[idx].filename);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      store.photos[idx].filename = req.file.filename;
    }

    if (title !== undefined) store.photos[idx].title = title;
    if (description !== undefined) store.photos[idx].description = description;
    if (location !== undefined) store.photos[idx].location = location;
    if (category !== undefined) store.photos[idx].category = category;

    res.json(store.photos[idx]);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE /api/photos/:id  (auth)
exports.deletePhoto = (req, res) => {
  try {
    const idx = store.photos.findIndex((p) => p._id === req.params.id);
    if (idx === -1) return res.status(404).json({ message: 'Photo not found' });

    const [photo] = store.photos.splice(idx, 1);
    const filePath = path.join(__dirname, '../../uploads', photo.filename);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    res.json({ message: 'Photo deleted successfully' });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

// PATCH /api/photos/:id/status  — toggle active/inactive (auth)
exports.toggleStatus = (req, res) => {
  try {
    const photo = store.photos.find((p) => p._id === req.params.id);
    if (!photo) return res.status(404).json({ message: 'Photo not found' });

    photo.isActive = !photo.isActive;
    res.json(photo);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};
