import { Link } from 'react-router-dom';

const services = [
  {
    id: '01',
    icon: '🎭',
    title: 'Portrait & Model Photography',
    subtitle: 'You are the subject. Light is your language.',
    desc: "Professional portrait and model photography for individuals, aspiring models, and brands. From intimate headshots to full editorial spreads, I craft imagery that tells your story with elegance and depth. Every session is personal — tailored to bring out the best version of you.",
    includes: [
      'Individual & couple portraits',
      'Professional model portfolio shoots',
      'Editorial fashion photography',
      'Personal branding imagery',
      'Outdoor & studio setups',
      'Post-processing & retouching',
    ],
    tagline: 'Starting from a personalized consultation.',
  },
  {
    id: '02',
    icon: '🏙️',
    title: 'Street Photography',
    subtitle: 'Life unfiltered. Moments untamed.',
    desc: 'Documentary-style street photography that captures the pulse of a city — its people, textures, light, and raw chaos. Perfect for editorial projects, travel blogs, cultural documentation, or simply preserving the beauty of the everyday and the extraordinary hidden within it.',
    includes: [
      'Urban lifestyle documentation',
      'Cultural & festival coverage',
      'Travel & journey photography',
      'Black & white fine art prints',
      'City mood & atmosphere series',
      'Local & outstation assignments',
    ],
    tagline: 'Available for local & outstation projects.',
  },
  {
    id: '03',
    icon: '🎬',
    title: 'Advertisement Videography',
    subtitle: 'Your brand. Cinematic quality.',
    desc: 'High-quality commercial video production for brands, products, and campaigns. From initial concept to final color grade, I deliver visually stunning content that communicates your message with precision, emotion, and cinematic style. Built for digital-first platforms.',
    includes: [
      'Product showcase & demo videos',
      'Brand story & corporate films',
      'Social media reels (Instagram / YouTube)',
      'Event & launch videography',
      'Cinematic color grading',
      'Custom scripting & direction',
    ],
    tagline: 'Custom packages based on project scope.',
  },
];

export default function Services() {
  return (
    <div className="min-h-screen pt-24">
      {/* Header */}
      <section className="py-20 bg-dark-2 border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="section-label">What I Offer</span>
          <h1 className="font-serif text-5xl md:text-7xl text-white mt-3 mb-6">Services</h1>
          <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
            Every project is an opportunity to tell a story. Here's how I can help bring yours to life.
          </p>
          <div className="h-px w-24 bg-gold/40 mx-auto mt-8" />
        </div>
      </section>

      {/* Service cards */}
      <section className="py-20 bg-dark">
        <div className="max-w-5xl mx-auto px-6 space-y-2">
          {services.map((svc) => (
            <div
              key={svc.id}
              className="group bg-dark-3 border border-white/5 hover:border-gold/15 p-10 md:p-14 transition-all duration-400"
            >
              <div className="flex flex-col md:flex-row gap-10">
                {/* Left: icon & number */}
                <div className="flex-shrink-0 flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-2">
                  <span className="text-5xl group-hover:scale-110 transition-transform duration-300 inline-block">
                    {svc.icon}
                  </span>
                  <span className="text-[10px] tracking-[0.4em] uppercase text-gold/30">{svc.id}</span>
                </div>

                {/* Right: content */}
                <div className="flex-1">
                  <h2 className="font-serif text-3xl text-white mb-2 group-hover:text-gold transition-colors duration-300">
                    {svc.title}
                  </h2>
                  <p className="text-gold/60 text-sm italic mb-5">{svc.subtitle}</p>
                  <p className="text-gray-400 leading-relaxed mb-8 text-[15px]">{svc.desc}</p>

                  <div className="mb-6">
                    <div className="text-[9px] tracking-[0.4em] uppercase text-gray-600 mb-4">What's Included</div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {svc.includes.map((item) => (
                        <li key={item} className="flex items-center gap-2.5 text-gray-500 text-sm">
                          <span className="text-gold text-xs flex-shrink-0">→</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="text-gray-700 text-[11px] tracking-[0.3em] uppercase">{svc.tagline}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-dark-2 border-y border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="section-label">How It Works</span>
            <h2 className="section-title text-4xl mt-3">The Process</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { step: '01', title: 'Consultation', desc: "We discuss your vision, goals, and expectations." },
              { step: '02', title: 'Planning', desc: 'Location, timeline, styling, and shot list finalized.' },
              { step: '03', title: 'The Shoot', desc: 'Professional, relaxed session focused on authenticity.' },
              { step: '04', title: 'Delivery', desc: 'Edited, color-graded files delivered in high resolution.' },
            ].map((p) => (
              <div key={p.step} className="bg-dark border border-white/5 p-6 text-center">
                <div className="text-gold font-serif text-2xl font-bold mb-3">{p.step}</div>
                <div className="text-white text-sm font-medium mb-2">{p.title}</div>
                <div className="text-gray-600 text-xs leading-relaxed">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-dark">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <span className="section-label">Ready to Begin?</span>
          <h2 className="section-title text-3xl md:text-4xl mt-3 mb-6">Let's Create Together</h2>
          <p className="text-gray-500 mb-10 text-sm leading-relaxed">
            Every project is unique. Let's discuss your vision and build something extraordinary.
          </p>
          <Link to="/contact" className="btn-gold">Get in Touch</Link>
        </div>
      </section>
    </div>
  );
}
