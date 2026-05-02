import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import api from '../../utils/api';
import AdminLayout from './AdminLayout';

const EMPTY_FORM = { name: '', description: '', order: '' };

export default function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/categories/admin');
      setCategories(data);
    } catch {
      toast.error('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCategories(); }, []);

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
  };

  const startEdit = (cat) => {
    setEditingId(cat._id);
    setForm({ name: cat.name, description: cat.description || '', order: String(cat.order) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        name: form.name.trim(),
        description: form.description.trim(),
        order: form.order ? Number(form.order) : undefined,
      };
      if (editingId) {
        const { data } = await api.put(`/categories/${editingId}`, payload);
        setCategories((prev) => prev.map((c) => (c._id === editingId ? data : c)));
        toast.success('Category updated');
      } else {
        const { data } = await api.post('/categories', payload);
        setCategories((prev) => [...prev, data].sort((a, b) => a.order - b.order));
        toast.success(`Category "${data.name}" created`);
      }
      resetForm();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggle = async (id) => {
    try {
      const { data } = await api.patch(`/categories/${id}/status`);
      setCategories((prev) => prev.map((c) => (c._id === id ? data : c)));
      toast.success(data.isActive ? 'Category activated' : 'Category deactivated');
    } catch {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (cat) => {
    if (!window.confirm(`Delete "${cat.name}"? Photos in this category will become "Uncategorised".`)) return;
    try {
      const { data } = await api.delete(`/categories/${cat._id}`);
      setCategories((prev) => prev.filter((c) => c._id !== cat._id));
      toast.success(data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed');
    }
  };

  const sorted = [...categories].sort((a, b) => a.order - b.order);

  return (
    <AdminLayout title="Manage Categories">
      <div className="grid lg:grid-cols-3 gap-8">

        {/* ── Left: Add / Edit form ── */}
        <div className="lg:col-span-1">
          <div className="bg-dark-3 border border-white/5 p-6 sticky top-8">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-[10px] tracking-[0.4em] uppercase text-gray-400">
                {editingId ? '✏️ Edit Category' : '➕ New Category'}
              </h2>
              {editingId && (
                <button
                  onClick={resetForm}
                  className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="admin-label">Name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={set('name')}
                  placeholder="e.g. Aerial Photography"
                  className="input-field bg-dark"
                />
              </div>

              <div>
                <label className="admin-label">Description</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={set('description')}
                  placeholder="Short description of this category..."
                  className="input-field bg-dark resize-none"
                />
              </div>

              <div>
                <label className="admin-label">Display Order</label>
                <input
                  type="number"
                  min="1"
                  value={form.order}
                  onChange={set('order')}
                  placeholder="e.g. 3"
                  className="input-field bg-dark"
                />
                <p className="text-[10px] text-gray-700 mt-1.5">
                  Lower number = appears first in gallery filter
                </p>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-gold w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting
                  ? editingId ? 'Saving...' : 'Creating...'
                  : editingId ? 'Save Changes' : 'Create Category'}
              </button>
            </form>

            {/* Info box */}
            <div className="mt-6 pt-6 border-t border-white/5 text-[10px] text-gray-700 leading-relaxed space-y-1.5">
              <p>• Active categories appear in the public gallery filter.</p>
              <p>• Deactivating hides the category from visitors but keeps photos intact.</p>
              <p>• Deleting reassigns photos to "Uncategorised".</p>
              <p>• Renaming updates all existing photos automatically.</p>
            </div>
          </div>
        </div>

        {/* ── Right: Category list ── */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[10px] tracking-[0.4em] uppercase text-gray-500">
              All Categories
            </h2>
            <span className="text-[10px] text-gray-700">
              {categories.length} total · {categories.filter((c) => c.isActive).length} active
            </span>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-20 bg-dark-3 animate-pulse" />
              ))}
            </div>
          ) : sorted.length === 0 ? (
            <div className="text-center py-20 text-gray-700">
              <div className="text-5xl mb-4">📂</div>
              <p className="text-sm tracking-widest">No categories yet</p>
            </div>
          ) : (
            <div className="space-y-2">
              {sorted.map((cat) => {
                const photoCount = 0; // could compute from store via API
                return (
                  <div
                    key={cat._id}
                    className={`bg-dark-3 border transition-all duration-200 p-4 flex items-start gap-4 ${
                      editingId === cat._id
                        ? 'border-gold/40'
                        : 'border-white/5 hover:border-white/10'
                    }`}
                  >
                    {/* Order badge */}
                    <div className="flex-shrink-0 w-8 h-8 border border-white/10 flex items-center justify-center text-gold font-serif text-sm font-bold">
                      {cat.order}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-white text-sm font-medium">{cat.name}</h3>
                        <span
                          className={`text-[8px] px-1.5 py-0.5 tracking-wider ${
                            cat.isActive
                              ? 'bg-emerald-900/30 text-emerald-500'
                              : 'bg-red-900/30 text-red-500'
                          }`}
                        >
                          {cat.isActive ? 'ACTIVE' : 'INACTIVE'}
                        </span>
                      </div>
                      <p className="text-gray-600 text-xs truncate">
                        {cat.description || <span className="italic">No description</span>}
                      </p>
                      <p className="text-gray-700 text-[10px] mt-1 font-mono">
                        slug: {cat.slug}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        onClick={() => startEdit(cat)}
                        className="text-[9px] tracking-wider uppercase px-3 py-1.5 border border-white/10 text-gray-500 hover:text-gold hover:border-gold/30 transition-all"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleToggle(cat._id)}
                        className={`text-[9px] tracking-wider uppercase px-3 py-1.5 border transition-all ${
                          cat.isActive
                            ? 'border-red-900/40 text-red-500 hover:bg-red-900/15'
                            : 'border-emerald-900/40 text-emerald-500 hover:bg-emerald-900/15'
                        }`}
                      >
                        {cat.isActive ? 'Hide' : 'Show'}
                      </button>
                      <button
                        onClick={() => handleDelete(cat)}
                        className="text-[9px] px-2.5 py-1.5 border border-red-900/30 text-red-600 hover:bg-red-900/20 transition-all"
                        title="Delete category"
                      >
                        🗑
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
