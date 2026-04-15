import { motion } from "framer-motion";
import { Gift, PartyPopper, Star } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeading from "./SectionHeading";
import { createWhatsAppLink } from "@/lib/whatsapp";

const promos = [
  {
    icon: Star,
    title: "Weekend Special",
    desc: "Get 15% off on all artisan breads every Saturday & Sunday. Fresh out of the oven, right to your table.",
    cta: "Order Now",
    featured: true,
  },
  {
    icon: PartyPopper,
    title: "Birthday Deal",
    desc: "Free cupcake box (6 pcs) with every custom birthday cake order. Make celebrations sweeter.",
    cta: "Claim Offer",
    featured: false,
  },
  {
    icon: Gift,
    title: "Seasonal Gift Box",
    desc: "Curated assortment of premium pastries & cookies — perfect for gifting this season.",
    cta: "Explore",
    featured: false,
  },
];

const MotionLink = motion(Link);

const Promotions = () => (
  <section id="promotions" className="section-padding section-theme-promotions relative overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,hsl(var(--bakery-gold)/0.04),transparent)]" />

    <div className="max-w-7xl mx-auto relative">
      <SectionHeading subtitle="Special Offers" title="Sweeten Your Day" description="Exclusive deals crafted with the same love as our baked goods." />
      <div className="grid sm:grid-cols-3 gap-7 lg:gap-9">
        {promos.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.14, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4, transition: { duration: 0.45 } }}
            className={`relative p-9 lg:p-11 rounded-3xl overflow-hidden transition-all duration-500 ${
              p.featured
                ? "bg-gradient-to-br from-primary via-bakery-brown-rich to-primary text-primary-foreground premium-border shadow-[0_22px_52px_-20px_hsl(var(--bakery-brown)/0.58)]"
                : "card-luxury shadow-[0_16px_40px_-20px_hsl(var(--bakery-brown)/0.25)]"
            }`}
          >
            {p.featured && (
              <div className="absolute top-0 right-0 w-32 h-32 bg-bakery-gold/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
            )}
            <div className={`relative w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
              p.featured
                ? "bg-gradient-to-br from-bakery-gold/30 to-bakery-gold/10 text-bakery-gold"
                : "bg-gradient-to-br from-bakery-gold/20 to-bakery-gold/5 text-accent"
            }`}>
              <p.icon size={26} />
            </div>
            <h3 className="relative font-heading text-[1.95rem] leading-tight font-semibold mb-4">{p.title}</h3>
            <p className={`relative font-body text-[0.95rem] leading-relaxed mb-9 font-light ${p.featured ? "text-primary-foreground/78" : "text-muted-foreground"}`}>{p.desc}</p>
            {p.title === "Seasonal Gift Box" ? (
              <MotionLink
                to="/seasonal-gift-box"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 220, damping: 24 }}
                className={`relative inline-block font-body font-semibold text-sm px-6 py-3 rounded-xl transition-all duration-300 ${
                  p.featured ? "btn-gold text-accent-foreground" : "btn-premium text-primary-foreground"
                }`}
              >
                {p.cta} →
              </MotionLink>
            ) : (
              <motion.a
                href={createWhatsAppLink({
                  intent: "order",
                  item: p.title,
                  section: "Special Offers",
                  reference: "/#promotions",
                  notes: p.desc,
                })}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 220, damping: 24 }}
                className={`relative inline-block font-body font-semibold text-sm px-6 py-3 rounded-xl transition-all duration-300 ${
                  p.featured ? "btn-gold text-accent-foreground" : "btn-premium text-primary-foreground"
                }`}
              >
                {p.cta} →
              </motion.a>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Promotions;
