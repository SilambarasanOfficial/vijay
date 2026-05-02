import { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import api from '../../utils/api';
import AdminLayout from './AdminLayout';

const EMPTY_FORM = { title: '', description: '', location: '', category: '' };

export default function ManagePhotos() {
  const [photos, setPhotos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY_FORM);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [filterCat, setFilterCat] = useState('All');
  const fileRef = useRef(null);
  const formRef = useRef(null);

  const fetchPhotos = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/photos/admin');
      setPhotos(data);
    } catch {
      toast.error('Failed to load photos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
    api.get('/categories/admin')
      .then(({ data }) => {
        const active = data.filter((c) => c.isActive);
        setCategories(active);
        setForm((f) => ({ ...f, category: f.category || active[0]?.name || '' }));
      })
      .catch(() => toast.error('Failed to load categories'));
  }, []);

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setImageFile(null);
    setImagePreview(null);
    setEditingId(null);
    if (fileRef.current) fileRef.current.value = '';
  };

  const startEdit = (photo) => {
    setEditingId(photo._id);
    setForm({
      title: photo.title,
      description: photo.description || '',
      location: photo.location || '',
      category: photo.category,
    });
    setImagePreview(`/uploads/${photo.filename}`);
    setImageFile(null);
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editingId && !imageFile) {
      toast.error('Please select an image file');
      return;
    }
    setSubmitting(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (imageFile) fd.append('image', imageFile);

      // Do NOT set Content-Type manually — axios auto-sets multipart/form-data
      // with the correct boundary when the body is FormData
      if (editingId) {
        await api.put(`/photos/${editingId}`, fd);
        toast.success('Photo updated successfully');
      } else {
        await api.post('/photos', fd);
        toast.success('Photo uploaded successfully');
      }
      resetForm();
      fetchPhotos();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this photo permanently?')) return;
    try {
      await api.delete(`/photos/${id}`);
      toast.success('Photo deleted');
      setPhotos((prev) => prev.filter((p) => p._id !== id));
      if (editingId === id) resetForm();
    } catch {
      toast.error('Failed to delete photo');
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      const { data } = await api.patch(`/photos/${id}/status`);
      setPhotos((prev) => prev.map((p) => (p._id === id ? data : p)));
      toast.success(data.isActive ? 'Photo activated' : 'Photo deactivated');
    } catch {
      toast.error('Status update failed');
    }
  };

  const filtered =
    filterCat === 'All' ? photos : photos.filter((p) => p.category === filterCat);

  return (
    <AdminLayout title="Manage Photos">
      {/* ── Upload / Edit Form ── */}
      <div ref={formRef} className="bg-dark-3 border border-white/5 p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[10px] tracking-[0.4em] uppercase text-gray-400">
            {editingId ? '✏️ Edit Photo' : '➕ Upload New Photo'}
          </h2>
          {editingId && (
            <button onClick={resetForm} className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
              Cancel Edit
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
          {/* Left: fields */}
          <div className="space-y-4">
            <div>
              <label className="admin-label">Title *</label>
              <input
                type="text"
                required
                value={form.title}
                onChange={set('title')}
                placeholder="e.g. Golden Hour Tiger"
                className="input-field bg-dark"
              />
            </div>

            <div>
              <label className="admin-label">Category *</label>
              <select
                value={form.category}
                onChange={set('category')}
                className="input-field bg-dark"
              >
                {categories.length === 0 && (
                  <option value="">Loading categories...</option>
                )}
                {categories.map((c) => (
                  <option key={c._id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="admin-label">Location</label>
              <input
                type="text"
                value={form.location}
                onChange={set('location')}
                placeholder="e.g. Bandipur Forest, Karnataka"
                className="input-field bg-dark"
              />
            </div>

            <div>
              <label className="admin-label">Description</label>
              <textarea
                rows={4}
                value={form.description}
                onChange={set('description')}
                placeholder="Optional: tell the story behind this shot..."
                className="input-field bg-dark resize-none"
              />
            </div>
          </div>

          {/* Right: image */}
          <div className="space-y-4">
            <div>
              <label className="admin-label">Image {!editingId && '*'}</label>
              <div
                className="relative border-2 border-dashed border-white/8 hover:border-gold/30 transition-colors cursor-pointer overflow-hidden bg-dark"
                style={{ aspectRatio: '4/3' }}
                onClick={() => fileRef.current?.click()}
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-700">
                    <span className="text-4xl mb-3">📷</span>
                    <span className="text-xs tracking-widest">Click to select image</span>
                    <span className="text-[10px] mt-1">JPG, PNG, WebP — max 15 MB</span>
                  </div>
                )}
                {imagePreview && (
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
                    <span className="text-white text-xs tracking-widest bg-black/60 px-3 py-1.5">
                      Change Image
                    </span>
                  </div>
                )}
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-gold w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting
                ? editingId
                  ? 'Updating...'
                  : 'Uploading...'
                : editingId
                ? 'Update Photo'
                : 'Upload Photo'}
            </button>
          </div>
        </form>
      </div>

      {/* ── Filter bar ── */}
      <div className="flex items-center gap-2 mb-5 flex-wrap">
        <span className="text-[9px] tracking-[0.4em] uppercase text-gray-600 mr-2">Filter:</span>
        {['All', ...categories.map((c) => c.name)].map((c) => (
          <button
            key={c}
            onClick={() => setFilterCat(c)}
            className={`text-[9px] tracking-[0.2em] uppercase px-4 py-2 transition-all ${
              filterCat === c
                ? 'bg-gold text-dark font-semibold'
                : 'border border-white/10 text-gray-500 hover:text-white hover:border-white/20'
            }`}
          >
            {c}
          </button>
        ))}
        <span className="ml-auto text-[9px] text-gray-700">
          {filtered.length} photo{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* ── Photo grid ── */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="aspect-square bg-dark-3 animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-700">
          <div className="text-5xl mb-4">📷</div>
          <p className="text-sm tracking-widest">No photos found</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((photo) => (
            <div
              key={photo._id}
              className={`group bg-dark-3 border transition-all duration-200 ${
                editingId === photo._id ? 'border-gold/50' : 'border-white/5 hover:border-white/10'
              }`}
            >
              <div className="aspect-square overflow-hidden relative">
                <img
                  src={`/uploads/${photo.filename}`}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {!photo.isActive && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-[9px] tracking-widest uppercase text-red-400 bg-black/60 px-2 py-1">
                      Hidden
                    </span>
                  </div>
                )}
              </div>

              <div className="p-3">
                <div className="flex items-start justify-between gap-1 mb-3">
                  <div className="min-w-0">
                    <p className="text-white text-xs font-medium truncate">{photo.title}</p>
                    <p className="text-gray-600 text-[10px] mt-0.5">{photo.category}</p>
                    {photo.location && (
                      <p className="text-gray-700 text-[10px] mt-0.5 truncate">📍 {photo.location}</p>
                    )}
                  </div>
                  <span
                    className={`flex-shrink-0 text-[8px] px-1.5 py-0.5 tracking-wider ${
                      photo.isActive
                        ? 'bg-emerald-900/30 text-emerald-500'
                        : 'bg-red-900/30 text-red-500'
                    }`}
                  >
                    {photo.isActive ? 'ON' : 'OFF'}
                  </span>
                </div>

                <div className="flex gap-1">
                  <button
                    onClick={() => startEdit(photo)}
                    className="flex-1 text-[9px] tracking-wider uppercase py-1.5 border border-white/10 text-gray-500 hover:text-gold hover:border-gold/30 transition-all"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleToggleStatus(photo._id)}
                    className={`flex-1 text-[9px] tracking-wider uppercase py-1.5 border transition-all ${
                      photo.isActive
                        ? 'border-red-900/40 text-red-500 hover:bg-red-900/15'
                        : 'border-emerald-900/40 text-emerald-500 hover:bg-emerald-900/15'
                    }`}
                  >
                    {photo.isActive ? 'Hide' : 'Show'}
                  </button>
                  <button
                    onClick={() => handleDelete(photo._id)}
                    className="px-2.5 text-[9px] py-1.5 border border-red-900/30 text-red-600 hover:bg-red-900/20 transition-all"
                    title="Delete"
                  >
                    🗑
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
