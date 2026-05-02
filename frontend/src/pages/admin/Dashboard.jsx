import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import AdminLayout from './AdminLayout';

export default function Dashboard() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/photos/admin')
      .then(({ data }) => setPhotos(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const total = photos.length;
  const active = photos.filter((p) => p.isActive).length;
  const inactive = total - active;

  const categoryMap = photos.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});

  const statCards = [
    { label: 'Total Photos', value: total, icon: '🖼️', color: 'text-blue-400' },
    { label: 'Active (Visible)', value: active, icon: '✅', color: 'text-emerald-400' },
    { label: 'Inactive (Hidden)', value: inactive, icon: '⏸️', color: 'text-red-400' },
  ];

  return (
    <AdminLayout title="Dashboard">
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-28 bg-dark-3 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-8">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {statCards.map((card) => (
              <div key={card.label} className="bg-dark-3 border border-white/5 p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-500 text-xs tracking-widest uppercase">{card.label}</span>
                  <span className="text-2xl">{card.icon}</span>
                </div>
                <div className={`font-serif text-5xl font-bold ${card.color}`}>{card.value}</div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Category breakdown */}
            <div className="bg-dark-3 border border-white/5 p-6">
              <h3 className="text-[10px] tracking-[0.4em] uppercase text-gray-500 mb-6">Photos by Category</h3>
              {total === 0 ? (
                <p className="text-gray-700 text-sm">No photos uploaded yet.</p>
              ) : (
                <ul className="space-y-4">
                  {['Wildlife', 'Portrait', 'Model', 'Street', 'Advertisement'].map((cat) => {
                    const count = categoryMap[cat] || 0;
                    const pct = total > 0 ? (count / total) * 100 : 0;
                    return (
                      <li key={cat} className="flex items-center gap-4">
                        <span className="text-gray-400 text-xs w-24 flex-shrink-0">{cat}</span>
                        <div className="flex-1 h-1 bg-dark-2 relative">
                          <div
                            className="absolute inset-y-0 left-0 bg-gold transition-all duration-700"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="text-gold text-xs font-medium w-4 text-right">{count}</span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* Quick actions */}
            <div className="bg-dark-3 border border-white/5 p-6">
              <h3 className="text-[10px] tracking-[0.4em] uppercase text-gray-500 mb-6">Quick Actions</h3>
              <ul className="space-y-1">
                {[
                  { to: '/admin/photos', icon: '➕', label: 'Upload New Photo' },
                  { to: '/admin/photos', icon: '🖼️', label: 'Manage All Photos' },
                  { to: '/admin/profile', icon: '✏️', label: 'Edit Profile' },
                  { to: '/gallery', icon: '👁️', label: 'View Public Gallery', external: true },
                ].map((a) => (
                  <li key={a.label}>
                    <Link
                      to={a.to}
                      target={a.external ? '_blank' : undefined}
                      className="flex items-center gap-3 text-gray-500 hover:text-gold transition-colors py-2.5 text-sm group"
                    >
                      <span className="text-base group-hover:scale-110 transition-transform">{a.icon}</span>
                      <span>{a.label}</span>
                      {a.external && <span className="text-gray-700 text-xs ml-auto">↗</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Recent photos */}
          {photos.length > 0 && (
            <div className="bg-dark-3 border border-white/5 p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-[10px] tracking-[0.4em] uppercase text-gray-500">Recently Uploaded</h3>
                <Link to="/admin/photos" className="text-xs text-gold hover:text-gold-light transition-colors">
                  View All →
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {photos.slice(0, 5).map((photo) => (
                  <div key={photo._id} className="relative aspect-square overflow-hidden bg-dark-2">
                    <img
                      src={`/uploads/${photo.filename}`}
                      alt={photo.title}
                      className="w-full h-full object-cover"
                    />
                    {!photo.isActive && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span className="text-[8px] tracking-widest text-red-400 uppercase">Hidden</span>
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                      <p className="text-white text-[10px] truncate">{photo.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </AdminLayout>
  );
}
