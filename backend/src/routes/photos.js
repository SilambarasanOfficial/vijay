const router = require('express').Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const {
  getPublicPhotos,
  getAllPhotos,
  createPhoto,
  updatePhoto,
  deletePhoto,
  toggleStatus,
} = require('../controllers/photoController');

// Public
router.get('/', getPublicPhotos);

// Admin — all require JWT
router.get('/admin', auth, getAllPhotos);
router.post('/', auth, upload.single('image'), createPhoto);
router.put('/:id', auth, upload.single('image'), updatePhoto);
router.delete('/:id', auth, deletePhoto);
router.patch('/:id/status', auth, toggleStatus);

module.exports = router;
