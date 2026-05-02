const { store, nextId, toSlug } = require('../config/store');

// ── GET /api/categories  (public — active only) ───────────────────────────────
exports.getPublicCategories = (req, res) => {
  const list = store.categories
    .filter((c) => c.isActive)
    .sort((a, b) => a.order - b.order);
  res.json(list);
};

// ── GET /api/categories/admin  (all, including inactive) ─────────────────────
exports.getAllCategories = (req, res) => {
  const list = [...store.categories].sort((a, b) => a.order - b.order);
  res.json(list);
};

// ── POST /api/categories  ─────────────────────────────────────────────────────
exports.createCategory = (req, res) => {
  const { name, description = '', order } = req.body;

  if (!name || !name.trim())
    return res.status(400).json({ message: 'Category name is required' });

  const slug = toSlug(name);
  const exists = store.categories.find((c) => c.slug === slug);
  if (exists)
    return res.status(409).json({ message: `Category "${name}" already exists` });

  const category = {
    _id: nextId(),
    name: name.trim(),
    slug,
    description,
    isActive: true,
    order: order ?? store.categories.length + 1,
    createdAt: new Date().toISOString(),
  };

  store.categories.push(category);
  res.status(201).json(category);
};

// ── PUT /api/categories/:id  ──────────────────────────────────────────────────
exports.updateCategory = (req, res) => {
  const cat = store.categories.find((c) => c._id === req.params.id);
  if (!cat) return res.status(404).json({ message: 'Category not found' });

  const { name, description, order } = req.body;

  if (name !== undefined) {
    const newSlug = toSlug(name);
    const conflict = store.categories.find(
      (c) => c.slug === newSlug && c._id !== req.params.id
    );
    if (conflict)
      return res.status(409).json({ message: `Category "${name}" already exists` });

    // Update all photos that reference the old category name
    const oldName = cat.name;
    store.photos.forEach((p) => {
      if (p.category === oldName) p.category = name.trim();
    });

    cat.name = name.trim();
    cat.slug = newSlug;
  }

  if (description !== undefined) cat.description = description;
  if (order !== undefined) cat.order = Number(order);

  res.json(cat);
};

// ── PATCH /api/categories/:id/status  (toggle active/inactive) ───────────────
exports.toggleStatus = (req, res) => {
  const cat = store.categories.find((c) => c._id === req.params.id);
  if (!cat) return res.status(404).json({ message: 'Category not found' });

  cat.isActive = !cat.isActive;
  res.json(cat);
};

// ── DELETE /api/categories/:id  ───────────────────────────────────────────────
exports.deleteCategory = (req, res) => {
  const idx = store.categories.findIndex((c) => c._id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Category not found' });

  const [cat] = store.categories.splice(idx, 1);

  // Unlink photos that used this category
  const affected = store.photos.filter((p) => p.category === cat.name).length;
  store.photos.forEach((p) => {
    if (p.category === cat.name) p.category = 'Uncategorised';
  });

  res.json({
    message: `Category "${cat.name}" deleted`,
    photosAffected: affected,
  });
};
