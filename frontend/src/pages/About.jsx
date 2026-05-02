import { Link } from 'react-router-dom';

const areas = [
  {
    icon: '🦁',
    title: 'Wildlife Photography',
    desc: "Venturing into forests and sanctuaries to document raw, untamed moments — from a tiger's piercing gaze to a bird frozen mid-flight. Patience is the ultimate tool.",
  },
  {
    icon: '🎭',
    title: 'Portrait Photography',
    desc: 'Capturing the depth of the human spirit through deliberate light, thoughtful composition, and genuine emotion. Every portrait is a window into a soul.',
  },
  {
    icon: '✨',
    title: 'Model Shoots',
    desc: 'Crafting editorial and commercial imagery that elevates beauty, fashion, and personal brand. The aim: make every subject feel and look extraordinary.',
  },
  {
    icon: '🏙️',
    title: 'Street Photography',
    desc: "Freezing spontaneous slices of everyday life — the chaos, color, and quiet poetry of streets. Real people, real moments, no staging.",
  },
  {
    icon: '🎬',
    title: 'Advertisement Videography',
    desc: 'Producing compelling cinematic content for brands, products, and campaigns. From concept to color grade — delivered with precision and style.',
  },
];

export default function About() {
  return (
    <div className="min-h-screen pt-24">
      {/* Header */}
      <section className="py-20 bg-dark-2 border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="section-label">The Photographer</span>
          <h1 className="font-serif text-5xl md:text-7xl text-white mt-3 mb-6 leading-tight">
            The Story Behind the Lens
          </h1>
          <div className="h-px w-24 bg-gold/40 mx-auto" />
        </div>
      </section>

      {/* Bio */}
      <section className="py-24 bg-dark">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <span className="section-label">Who I Am</span>
              <h2 className="font-serif text-5xl text-white mt-3 mb-8">Vijay</h2>
              <div className="space-y-5 text-gray-400 leading-8 text-[15px]">
                <p>
                  I am Vijay, the creative eye behind VJ Photography. My journey in photography is driven by patience, passion, and a deep connection with nature.
                </p>
                <p>
                  What began as a personal pursuit — chasing light in forests and streets — has grown into a professional practice spanning wildlife, portraiture, model shoots, street documentation, and commercial videography.
                </p>
                <p>
                  Armed with my Sony Alpha camera system, I approach every shoot with a single belief: the best photographs are not taken — they are felt. Each frame is a conversation between subject and storyteller.
                </p>
                <p>
                  My work is rooted in authenticity. Whether I'm tracking a leopard through dense foliage at dawn or directing a model shoot in golden hour light, I seek moments that transcend the ordinary and reveal something true about the world around us.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-gold/5 to-transparent rounded-none" />
              <div className="relative bg-dark-3 border border-white/5 p-10">
                <div className="text-center mb-8">
                  <div className="font-serif text-7xl gold-gradient font-bold leading-none">VJ</div>
                  <div className="text-[9px] tracking-[0.5em] uppercase text-gray-600 mt-2">Photography</div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { num: '5+', label: 'Years of Experience' },
                    { num: '500+', label: 'Sessions Completed' },
                    { num: '5', label: 'Photography Styles' },
                    { num: '∞', label: 'Stories Captured' },
                  ].map((stat) => (
                    <div key={stat.label} className="border border-white/5 p-5 text-center">
                      <div className="font-serif text-2xl gold-gradient font-bold">{stat.num}</div>
                      <div className="text-gray-600 text-[10px] mt-1.5 tracking-wider">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Camera */}
      <section className="py-10 bg-dark-2 border-y border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-center md:text-left">
            <span className="text-5xl">📷</span>
            <div>
              <div className="text-[10px] tracking-[0.5em] uppercase text-gray-600 mb-1">Primary Gear</div>
              <div className="font-serif text-2xl text-white">Sony Alpha Series</div>
              <div className="text-gray-600 text-sm mt-1">Professional Full-Frame Mirrorless System</div>
            </div>
            <div className="hidden md:block h-12 w-px bg-white/5" />
            <div>
              <div className="text-[10px] tracking-[0.5em] uppercase text-gray-600 mb-1">Based In</div>
              <div className="font-serif text-2xl text-white">Tamil Nadu, India</div>
              <div className="text-gray-600 text-sm mt-1">Available for outstation assignments</div>
            </div>
          </div>
        </div>
      </section>

      {/* Areas */}
      <section className="py-24 bg-dark">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="section-label">Expertise</span>
            <h2 className="section-title text-4xl md:text-5xl mt-3">Areas of Work</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {areas.map((area) => (
              <div
                key={area.title}
                className="group bg-dark-3 border border-white/5 hover:border-gold/20 p-8 transition-all duration-300 hover:bg-dark-4"
              >
                <span className="text-4xl block mb-5 group-hover:scale-110 transition-transform duration-300">
                  {area.icon}
                </span>
                <h3 className="font-serif text-xl text-white mb-3 group-hover:text-gold transition-colors duration-300">
                  {area.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{area.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-24 bg-dark-2 border-y border-white/5">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <span className="section-label">My Vision</span>
          <blockquote className="font-serif text-2xl md:text-3xl text-white mt-8 leading-relaxed italic">
            "Photography is not about the camera. It's about the eyes behind it — and the heart that decides when to press the shutter."
          </blockquote>
          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-gold/30" />
            <span className="text-gray-600 text-xs tracking-[0.4em] uppercase">Vijay</span>
            <div className="h-px w-12 bg-gold/30" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-dark">
        <div className="max-w-xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl text-white mb-6">Let's Create Together</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/gallery" className="btn-outline-gold">View Gallery</Link>
            <Link to="/contact" className="btn-gold">Book a Session</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
