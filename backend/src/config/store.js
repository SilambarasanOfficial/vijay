/**
 * In-memory data store — no database required.
 * All data resets on server restart; image files in /uploads persist.
 */
const bcrypt = require('bcryptjs');

const store = {
  users: [],
  categories: [
    { _id: 'cat_1', name: 'Wildlife',      slug: 'wildlife',      description: 'Raw moments captured in forests and sanctuaries.', isActive: true, order: 1, createdAt: new Date().toISOString() },
    { _id: 'cat_2', name: 'Portrait',      slug: 'portrait',      description: 'The depth of the human spirit through light and composition.', isActive: true, order: 2, createdAt: new Date().toISOString() },
    { _id: 'cat_3', name: 'Model',         slug: 'model',         description: 'Editorial and commercial imagery for brands and individuals.', isActive: true, order: 3, createdAt: new Date().toISOString() },
    { _id: 'cat_4', name: 'Street',        slug: 'street',        description: 'Life unfiltered — the chaos and poetry of everyday streets.', isActive: true, order: 4, createdAt: new Date().toISOString() },
    { _id: 'cat_5', name: 'Advertisement', slug: 'advertisement', description: 'Cinematic commercial content for products and campaigns.', isActive: true, order: 5, createdAt: new Date().toISOString() },
  ],
  photos: [],
  profile: {
    _id: 'profile_1',
    name: 'Vijay',
    tagline: 'Capturing the Untamed. Framing Stories Beyond Words.',
    bio: 'I am Vijay, the creative eye behind VJ Photography. My journey in photography is driven by patience, passion, and a deep connection with nature.',
    vision: "Photography is not about the camera. It's about the eyes behind it — and the heart that decides when to press the shutter.",
    instagram: '@vjphotography',
    phone: '9791224530',
    experience: '5+',
  },
};

let _id = 100;
const nextId = () => String(_id++);

const toSlug = (name) =>
  name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

// Create default admin on startup
bcrypt.hash('vjphoto@2024', 10).then((hash) => {
  store.users.push({ _id: 'u1', username: 'admin', password: hash });
  console.log('👤  Admin ready        →  admin / vjphoto@2024');
  console.log(`📂  Categories loaded  →  ${store.categories.length} default categories`);
});

module.exports = { store, nextId, toSlug };
