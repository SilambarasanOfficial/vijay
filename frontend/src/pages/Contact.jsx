import { useState } from 'react';
import toast from 'react-hot-toast';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    toast.success("Message sent! I'll get back to you shortly.");
    setForm({ name: '', email: '', subject: '', message: '' });
    setSubmitting(false);
  };

  const contacts = [
    {
      icon: '📞',
      label: 'Phone',
      value: '+91 9791224530',
      href: 'tel:+919791224530',
    },
    {
      icon: '📸',
      label: 'Instagram',
      value: '@vjphotography',
      href: 'https://instagram.com/vjphotography',
      external: true,
    },
  ];

  return (
    <div className="min-h-screen pt-24">
      {/* Header */}
      <section className="py-20 bg-dark-2 border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="section-label">Reach Out</span>
          <h1 className="font-serif text-5xl md:text-7xl text-white mt-3 mb-6">Let's Talk</h1>
          <p className="text-gray-500 max-w-lg mx-auto text-sm leading-relaxed">
            Have a project in mind? A vision to share? Or just want to say hi?
            I'd love to hear from you.
          </p>
          <div className="h-px w-24 bg-gold/40 mx-auto mt-8" />
        </div>
      </section>

      <section className="py-24 bg-dark">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-5 gap-16">
            {/* Info */}
            <div className="md:col-span-2">
              <h2 className="font-serif text-3xl text-white mb-4">Contact Details</h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-10">
                Whether you're planning a shoot, have a commercial inquiry, or want to collaborate — I'm just a message away.
              </p>

              <ul className="space-y-6">
                {contacts.map((c) => (
                  <li key={c.label}>
                    <a
                      href={c.href}
                      target={c.external ? '_blank' : undefined}
                      rel={c.external ? 'noreferrer' : undefined}
                      className="flex items-start gap-4 group"
                    >
                      <div className="w-11 h-11 flex-shrink-0 border border-gold/20 group-hover:border-gold/50 flex items-center justify-center text-lg transition-colors duration-200">
                        {c.icon}
                      </div>
                      <div>
                        <div className="text-[9px] tracking-[0.4em] uppercase text-gray-600 mb-1">{c.label}</div>
                        <div className="text-gray-300 group-hover:text-gold transition-colors text-sm">{c.value}</div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-12 pt-8 border-t border-white/5">
                <div className="text-[9px] tracking-[0.4em] uppercase text-gray-700 mb-3">Response Time</div>
                <p className="text-gray-500 text-sm">Usually within 24 hours</p>
              </div>
            </div>

            {/* Form */}
            <div className="md:col-span-3">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="admin-label">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={set('name')}
                      placeholder="Arjun Kumar"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="admin-label">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={set('email')}
                      placeholder="arjun@example.com"
                      className="input-field"
                    />
                  </div>
                </div>

                <div>
                  <label className="admin-label">Subject</label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={set('subject')}
                    placeholder="Booking inquiry, collaboration, etc."
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="admin-label">Message *</label>
                  <textarea
                    required
                    rows={7}
                    value={form.message}
                    onChange={set('message')}
                    placeholder="Tell me about your project, dates, location, and any specific requirements..."
                    className="input-field resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-gold w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
