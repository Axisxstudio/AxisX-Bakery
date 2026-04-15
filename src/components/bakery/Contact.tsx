import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Globe, Send } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import SectionHeading from "./SectionHeading";
import { createWhatsAppLink } from "@/lib/whatsapp";
import { bakeryLocation, contactChannels } from "@/lib/site";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const contactWhatsAppUrl = createWhatsAppLink({
    intent: "inquiry",
    item: "General inquiry",
    section: "Contact section",
    reference: "/#contact",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="section-padding section-theme-contact relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_80%_20%,hsl(var(--bakery-gold)/0.06),transparent)]" />
      <div className="absolute top-0 left-0 right-0 premium-divider" />

      <div className="max-w-7xl mx-auto relative">
        <SectionHeading subtitle="Get in Touch" title="We'd Love to Hear From You" description="Have a question or want to place an order? Reach out!" />

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2"
          >
            <div className="card-luxury p-8 lg:p-10 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-bakery-gold/12 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-bakery-brown/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />

              <h3 className="relative font-heading text-2xl font-semibold mb-6 text-foreground">Contact Info</h3>

              <div className="relative rounded-2xl border border-bakery-gold/20 bg-bakery-cream/60 p-5 mb-8">
                <p className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground font-body font-medium mb-3">Location</p>
                <a
                  href={bakeryLocation.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-4 rounded-xl -m-1 p-1 transition-colors hover:bg-bakery-gold/8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <div className="p-2 rounded-xl bg-bakery-gold/12 border border-bakery-gold/20 shrink-0">
                    <MapPin size={16} className="text-bakery-gold" />
                  </div>
                  <div className="font-body text-sm text-foreground/85 font-light leading-relaxed">
                    {bakeryLocation.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                    <span className="mt-3 inline-block text-xs font-medium text-accent underline-offset-2 group-hover:underline">
                      Open in Google Maps →
                    </span>
                  </div>
                </a>
              </div>

              <div className="relative space-y-6">
                {(
                  [
                    {
                      icon: Phone,
                      label: contactChannels.phoneDisplay,
                      href: contactChannels.phoneHref,
                      external: false,
                    },
                    {
                      icon: Mail,
                      label: contactChannels.email,
                      href: contactChannels.emailHref,
                      external: false,
                    },
                    {
                      icon: Globe,
                      label: contactChannels.webDisplay,
                      href: contactChannels.webHref,
                      external: true,
                    },
                    {
                      icon: Clock,
                      label: contactChannels.hoursDisplay,
                      href: contactChannels.hoursHref,
                      external: false,
                    },
                  ] as const
                ).map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="p-2 rounded-xl bg-bakery-gold/12 border border-bakery-gold/20 shrink-0">
                      <item.icon size={16} className="text-bakery-gold" />
                    </div>
                    <a
                      href={item.href}
                      {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="font-body text-sm text-foreground/75 font-light leading-relaxed underline-offset-2 transition-colors hover:text-accent hover:underline whitespace-pre-line"
                    >
                      {item.label}
                    </a>
                  </div>
                ))}
              </div>

              <motion.a
                href={contactWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02, y: -1.5 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 220, damping: 24 }}
                className="relative mt-10 w-full inline-flex items-center justify-center gap-2 btn-premium text-primary-foreground px-6 py-3.5 rounded-xl font-body font-semibold text-sm shadow-[0_14px_34px_-16px_hsl(var(--bakery-brown)/0.35)]"
              >
                <FaWhatsapp size={16} />
                Chat on WhatsApp
              </motion.a>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="card-luxury p-8 lg:p-10 rounded-3xl space-y-5 border border-bakery-gold/15">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block font-body text-sm font-medium text-foreground mb-2">Name *</label>
                  <input required className="input-luxury" placeholder="Your name" />
                </div>
                <div>
                  <label className="block font-body text-sm font-medium text-foreground mb-2">Phone *</label>
                  <input required className="input-luxury" placeholder="+94 77 135 4761" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block font-body text-sm font-medium text-foreground mb-2">Email</label>
                  <input type="email" className="input-luxury" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="block font-body text-sm font-medium text-foreground mb-2">Product Type</label>
                  <select className="input-luxury">
                    <option>Custom Cake</option>
                    <option>Cupcakes</option>
                    <option>Bread</option>
                    <option>Pastries</option>
                    <option>Desserts</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block font-body text-sm font-medium text-foreground mb-2">Event Date</label>
                  <input type="date" className="input-luxury" />
                </div>
                <div>
                  <label className="block font-body text-sm font-medium text-foreground mb-2">Size / Quantity</label>
                  <input className="input-luxury" placeholder="e.g., 2 kg or 12 pcs" />
                </div>
              </div>
              <div>
                <label className="block font-body text-sm font-medium text-foreground mb-2">Message</label>
                <textarea rows={4} className="input-luxury resize-none" placeholder="Tell us about your order or inquiry..." />
              </div>
              <p className="text-xs text-muted-foreground font-body font-light">💬 For a faster response, we recommend reaching out via WhatsApp!</p>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.01, y: -2 }}
                whileTap={{ scale: 0.99 }}
                className="w-full btn-premium text-primary-foreground py-4 rounded-xl font-body font-semibold flex items-center justify-center gap-2"
              >
                {submitted ? (
                  <motion.span initial={{ scale: 0.5 }} animate={{ scale: 1 }}>✓ Message Sent!</motion.span>
                ) : (
                  <>
                    <Send size={16} />
                    Send Inquiry
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 lg:mt-16"
        >
          <p className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground font-body font-medium mb-3">
            Google Map
          </p>
          <div className="overflow-hidden rounded-2xl border border-bakery-gold/20 bg-bakery-cream/60 shadow-[0_16px_40px_-20px_hsl(var(--bakery-brown)/0.25)]">
            <iframe
              title="AxisX Bakery — Google Maps"
              src={bakeryLocation.mapsEmbedUrl}
              width="100%"
              height="360"
              className="block min-h-[280px] w-full border-0 sm:min-h-[360px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <p className="mt-3 text-center font-body text-xs text-muted-foreground">
            <a
              href={bakeryLocation.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent hover:underline"
            >
              Open this location in Google Maps
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
