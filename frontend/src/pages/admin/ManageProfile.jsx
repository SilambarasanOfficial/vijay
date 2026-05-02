import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import api from '../../utils/api';
import AdminLayout from './AdminLayout';

const fields = [
  { key: 'name', label: 'Photographer Name', type: 'text', placeholder: 'Vijay' },
  { key: 'tagline', label: 'Tagline', type: 'text', placeholder: 'Capturing the Untamed...' },
  { key: 'phone', label: 'Phone Number', type: 'text', placeholder: '9791224530' },
  { key: 'instagram', label: 'Instagram Handle', type: 'text', placeholder: '@vjphotography' },
  { key: 'experience', label: 'Years of Experience', type: 'text', placeholder: '5+' },
];

const DEFAULTS = {
  name: '',
  tagline: '',
  bio: '',
  vision: '',
  instagram: '',
  phone: '',
  experience: '',
};

export default function ManageProfile() {
  const [form, setForm] = useState(DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api
      .get('/profile')
      .then(({ data }) => {
        setForm({
          name: data.name || '',
          tagline: data.tagline || '',
          bio: data.bio || '',
          vision: data.vision || '',
          instagram: data.instagram || '',
          phone: data.phone || '',
          experience: data.experience || '',
        });
      })
      .catch(() => toast.error('Failed to load profile'))
      .finally(() => setLoading(false));
  }, []);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put('/profile', form);
      toast.success('Profile saved successfully');
    } catch {
      toast.error('Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout title="Manage Profile">
        <div className="max-w-2xl space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-12 bg-dark-3 animate-pulse" />
          ))}
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Manage Profile">
      <div className="max-w-2xl">
        <p className="text-gray-600 text-xs mb-8 tracking-wide leading-relaxed">
          Update your public profile information. These details may appear on the About page and contact section.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {fields.map(({ key, label, type, placeholder }) => (
            <div key={key}>
              <label className="admin-label">{label}</label>
              <input
                type={type}
                value={form[key]}
                onChange={set(key)}
                placeholder={placeholder}
                className="input-field bg-dark-3"
              />
            </div>
          ))}

          <div>
            <label className="admin-label">Bio</label>
            <textarea
              rows={7}
              value={form.bio}
              onChange={set('bio')}
              placeholder="Write about yourself, your journey, and what drives your photography..."
              className="input-field bg-dark-3 resize-none"
            />
          </div>

          <div>
            <label className="admin-label">Vision / Signature Quote</label>
            <textarea
              rows={3}
              value={form.vision}
              onChange={set('vision')}
              placeholder="Your personal philosophy on photography..."
              className="input-field bg-dark-3 resize-none"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={saving}
              className="btn-gold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
