import { useEffect } from 'react';

export default function ImageModal({ photo, onClose }) {
  useEffect(() => {
    const handler = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/92 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-dark-2 border border-white/10 shadow-2xl animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center text-gray-500 hover:text-white bg-black/50 border border-white/10 hover:border-white/30 transition-all text-xl leading-none"
          aria-label="Close"
        >
          ×
        </button>

        <div className="md:flex">
          {/* Image */}
          <div className="md:w-[65%]">
            <img
              src={`/uploads/${photo.filename}`}
              alt={photo.title}
              className="w-full h-64 md:h-[520px] object-cover"
            />
          </div>

          {/* Details */}
          <div className="md:w-[35%] p-8 flex flex-col justify-center border-l border-white/5">
            <span className="section-label mb-4">{photo.category}</span>
            <h3 className="font-serif text-2xl text-white mb-4 leading-tight">{photo.title}</h3>

            {photo.location && (
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                <span>📍</span>
                <span>{photo.location}</span>
              </div>
            )}

            {photo.description && (
              <p className="text-gray-400 text-sm leading-relaxed">{photo.description}</p>
            )}

            <div className="mt-8 pt-6 border-t border-white/5">
              <p className="text-[10px] text-gray-700 tracking-widest uppercase">VJ Photography</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
