const router = require('express').Router();
const auth = require('../middleware/auth');
const {
  getPublicCategories,
  getAllCategories,
  createCategory,
  updateCategory,
  toggleStatus,
  deleteCategory,
} = require('../controllers/categoryController');

// Public
router.get('/', getPublicCategories);

// Admin
router.get('/admin', auth, getAllCategories);
router.post('/', auth, createCategory);
router.put('/:id', auth, updateCategory);
router.patch('/:id/status', auth, toggleStatus);
router.delete('/:id', auth, deleteCategory);

module.exports = router;
