import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../utils/api';
import ImageModal from '../components/ImageModal';

export default function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'All';

  // Load active categories once
  useEffect(() => {
    api.get('/categories')
      .then(({ data }) => setCategories(data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const params = activeCategory !== 'All' ? { category: activeCategory } : {};
        const { data } = await api.get('/photos', { params });
        setPhotos(data);
      } catch {
        setPhotos([]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [activeCategory]);

  const setCategory = (cat) => {
    cat === 'All' ? setSearchParams({}) : setSearchParams({ category: cat });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen pt-24">
      {/* Header */}
      <section className="py-16 bg-dark-2 border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="section-label">Portfolio</span>
          <h1 className="font-serif text-5xl md:text-7xl text-white mt-3 mb-6">Gallery</h1>
          <div className="h-px w-24 bg-gold/40 mx-auto" />
        </div>
      </section>

      {/* Category filter bar (sticky) */}
      <div className="sticky top-[52px] z-30 bg-dark/96 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-1 overflow-x-auto py-3 no-scrollbar">
            {['All', ...categories.map((c) => c.name)].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`flex-shrink-0 text-[10px] tracking-[0.2em] uppercase px-5 py-2.5 transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-gold text-dark font-semibold'
                    : 'text-gray-500 hover:text-white border border-transparent hover:border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="py-10 bg-dark min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-6">
          {loading ? (
            <div className="columns-masonry">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="masonry-item bg-dark-3 animate-pulse"
                  style={{ height: `${180 + (i % 3) * 80}px` }}
                />
              ))}
            </div>
          ) : photos.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 text-gray-700">
              <span className="text-6xl mb-5">📷</span>
              <p className="text-sm tracking-[0.3em] uppercase">No photos yet in this category</p>
            </div>
          ) : (
            <div className="columns-masonry">
              {photos.map((photo) => (
                <div
                  key={photo._id}
                  className="masonry-item group relative overflow-hidden cursor-pointer"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <img
                    src={`/uploads/${photo.filename}`}
                    alt={photo.title}
                    loading="lazy"
                    className="w-full h-auto block transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
                    <span className="text-[9px] tracking-[0.3em] uppercase text-gold font-medium">
                      {photo.category}
                    </span>
                    <span className="text-white text-sm font-medium mt-1 leading-snug">
                      {photo.title}
                    </span>
                    {photo.location && (
                      <span className="text-gray-400 text-xs mt-1 flex items-center gap-1">
                        <span>📍</span>
                        {photo.location}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {selectedPhoto && (
        <ImageModal photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
      )}
    </div>
  );
}
