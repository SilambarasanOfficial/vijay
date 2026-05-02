import { Link } from 'react-router-dom';

const categories = [
  { name: 'Wildlife', icon: '🦁', desc: 'Raw moments in the wild' },
  { name: 'Portrait', icon: '🎭', desc: 'The depth of a human gaze' },
  { name: 'Model', icon: '✨', desc: 'Elegance, styled & refined' },
  { name: 'Street', icon: '🏙️', desc: 'Life in its purest chaos' },
  { name: 'Advertisement', icon: '🎬', desc: 'Brands told cinematically' },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-dark">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(201,168,76,0.06),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_80%,rgba(201,168,76,0.04),transparent)]" />
        </div>

        {/* Decorative grid lines */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/3 to-transparent" />
          <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/3 to-transparent" />
          <div className="absolute top-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/8 to-transparent" />
          <div className="absolute top-2/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/8 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-5 mb-10">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-gold/60" />
            <span className="text-[9px] tracking-[0.6em] uppercase text-gold/60">
              Professional Photography
            </span>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-gold/60" />
          </div>

          <div className="mb-6">
            <h1 className="font-serif font-bold leading-none">
              <span className="block text-8xl md:text-[10rem] lg:text-[12rem] gold-gradient tracking-tight">
                VJ
              </span>
              <span className="block text-3xl md:text-5xl text-white font-light tracking-[0.4em] uppercase mt-2">
                Photography
              </span>
            </h1>
          </div>

          <div className="h-px w-24 bg-gold/30 mx-auto my-8" />

          <p className="text-gray-400 text-base md:text-lg font-light tracking-wide max-w-xl mx-auto leading-relaxed">
            Capturing the Untamed.
            <br />
            <span className="text-gray-600">Framing Stories Beyond Words.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <Link to="/gallery" className="btn-gold">
              Explore Gallery
            </Link>
            <Link to="/contact" className="btn-outline-gold">
              Book a Session
            </Link>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="text-[8px] tracking-[0.5em] uppercase text-gray-700">Scroll</span>
          <div className="w-px h-14 bg-gradient-to-b from-gold/40 to-transparent" />
        </div>
      </section>

      {/* ── Intro strip ── */}
      <section className="py-6 bg-dark-2 border-y border-white/5 overflow-hidden">
        <div className="flex items-center gap-8 px-6 whitespace-nowrap text-gray-700 text-[10px] tracking-[0.3em] uppercase">
          {Array.from({ length: 4 }, (_, i) => (
            <span key={i} className="flex items-center gap-8">
              <span>Wildlife Photography</span>
              <span className="text-gold">◆</span>
              <span>Portrait Photography</span>
              <span className="text-gold">◆</span>
              <span>Model Shoots</span>
              <span className="text-gold">◆</span>
              <span>Street Photography</span>
              <span className="text-gold">◆</span>
              <span>Advertisement Videography</span>
              <span className="text-gold">◆</span>
            </span>
          ))}
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="py-24 bg-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="section-label">Specializations</span>
            <h2 className="section-title text-4xl md:text-5xl mt-3">Through the Lens</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to={`/gallery?category=${cat.name}`}
                className="group bg-dark-3 border border-white/5 hover:border-gold/25 p-7 flex flex-col items-center text-center transition-all duration-300 hover:bg-dark-4"
              >
                <span className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">
                  {cat.icon}
                </span>
                <h3 className="text-[11px] tracking-[0.2em] uppercase text-gray-300 group-hover:text-gold transition-colors font-medium mb-2">
                  {cat.name}
                </h3>
                <p className="text-gray-600 text-xs leading-relaxed">{cat.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── About teaser ── */}
      <section className="py-24 bg-dark-2 border-y border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="section-label">The Photographer</span>
              <h2 className="section-title text-4xl mt-3 mb-6">
                A Vision Shaped by Patience & Passion
              </h2>
              <p className="text-gray-500 leading-relaxed mb-8">
                I am Vijay — the creative eye behind VJ Photography. From tracking wildlife through dense forests at dawn to directing editorial model shoots in golden light, every frame I capture is a story told without words.
              </p>
              <Link to="/about" className="btn-outline-gold">
                My Story
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: '5+', label: 'Years Active' },
                { num: '500+', label: 'Sessions Done' },
                { num: '5', label: 'Specializations' },
                { num: '∞', label: 'Stories Told' },
              ].map((s) => (
                <div key={s.label} className="bg-dark border border-white/5 p-6 text-center">
                  <div className="font-serif text-3xl gold-gradient font-bold">{s.num}</div>
                  <div className="text-gray-600 text-xs mt-2 tracking-widest">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-28 bg-dark">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <span className="section-label">Ready?</span>
          <h2 className="font-serif text-4xl md:text-5xl text-white mt-4 mb-5 leading-tight">
            Every frame tells a story.
            <br />
            <em className="text-gold not-italic">What's yours?</em>
          </h2>
          <p className="text-gray-600 mb-10 leading-relaxed max-w-lg mx-auto">
            From wildlife expeditions to professional model shoots and brand campaigns — let's create something extraordinary together.
          </p>
          <Link to="/contact" className="btn-gold">
            Start a Conversation
          </Link>
        </div>
      </section>
    </div>
  );
}
