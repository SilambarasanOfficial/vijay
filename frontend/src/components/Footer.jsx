import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex flex-col leading-none mb-5">
              <span className="font-serif text-3xl font-bold gold-gradient tracking-widest">VJ</span>
              <span className="text-[9px] tracking-[0.4em] text-gray-600 uppercase mt-0.5">Photography</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
              Capturing the untamed beauty of nature and human emotions — one frame at a time.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="h-px w-8 bg-gold/40" />
              <span className="text-[9px] tracking-[0.4em] text-gray-700 uppercase">Est. 2024</span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-[10px] tracking-[0.4em] uppercase text-gold mb-5">Explore</h4>
            <ul className="space-y-3">
              {[
                { to: '/', label: 'Home' },
                { to: '/about', label: 'About' },
                { to: '/gallery', label: 'Gallery' },
                { to: '/services', label: 'Services' },
                { to: '/contact', label: 'Contact' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-gray-500 hover:text-gold text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="text-gold/0 group-hover:text-gold transition-colors text-xs">→</span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[10px] tracking-[0.4em] uppercase text-gold mb-5">Connect</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+919791224530"
                  className="flex items-center gap-3 text-gray-500 hover:text-gold transition-colors group"
                >
                  <span className="text-lg">📞</span>
                  <div>
                    <div className="text-[9px] text-gray-700 tracking-widest uppercase mb-0.5">Phone</div>
                    <span className="text-sm">+91 9791224530</span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/vjphotography"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-gray-500 hover:text-gold transition-colors"
                >
                  <span className="text-lg">📸</span>
                  <div>
                    <div className="text-[9px] text-gray-700 tracking-widest uppercase mb-0.5">Instagram</div>
                    <span className="text-sm">@vjphotography</span>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-gray-700 text-xs tracking-widest">
            © {year} VJ Photography. All rights reserved.
          </p>
          <Link to="/admin/login" className="text-gray-800 hover:text-gray-600 text-xs tracking-widest transition-colors">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
