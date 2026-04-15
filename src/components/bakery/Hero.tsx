import { motion, useScroll, useTransform } from "framer-motion";
import { Star, Cake, Wheat, Heart } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useRef } from "react";
import heroBg from "@/assets/hero-bakery.jpg";
import { createWhatsAppLink } from "@/lib/whatsapp";

const HERO_WHATSAPP_URL = createWhatsAppLink({
  intent: "order",
  item: "Order from hero section",
  section: "Home hero",
  reference: "/#home",
});

const trustBadges = [
  { icon: Wheat, label: "Freshly Baked Daily" },
  { icon: Cake, label: "Custom Cakes" },
  { icon: Star, label: "Premium Ingredients" },
  { icon: Heart, label: "Trusted by Families" },
];

const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section id="home" ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Parallax Background */}
      <motion.div className="absolute inset-0" style={{ y: imgY }}>
        <img src={heroBg} alt="Artisan bakery display" className="w-full h-[120%] object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 gradient-overlay" />
        {/* Extra warmth overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-bakery-brown-rich/60 via-transparent to-transparent" />
      </motion.div>

      {/* Decorative floating elements */}
      <div className="absolute top-1/4 right-10 w-32 h-32 rounded-full bg-bakery-gold/5 animate-float-slow blur-2xl" />
      <div className="absolute bottom-1/3 left-10 w-24 h-24 rounded-full bg-bakery-gold/8 animate-float-delayed blur-xl" />

      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 w-full section-padding"
      >
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl rounded-3xl px-1 sm:px-2">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-dark text-bakery-gold text-xs sm:text-sm font-body tracking-[0.24em] uppercase mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-bakery-gold animate-pulse-glow" />
              Artisan Bakery · Est. 2010
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl lg:text-7xl font-heading font-bold text-bakery-cream leading-[1.08] tracking-tight"
          >
            Freshly Baked
            <br />
            Happiness,{" "}
            <span className="italic gold-text">Crafted</span>
            <br />
            <span className="italic gold-text">with Love</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.8 }}
            className="mt-11 flex flex-wrap gap-4"
          >
            <motion.a
              href="#menu"
              whileHover={{ scale: 1.02, y: -1.5 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 220, damping: 24 }}
              className="inline-flex items-center gap-2 btn-gold text-accent-foreground px-8 py-4 rounded-full font-body font-semibold text-base shadow-[0_14px_36px_-16px_hsl(var(--bakery-gold)/0.45)]"
            >
              View Our Menu
              <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>→</motion.span>
            </motion.a>
            <motion.a
              href={HERO_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, y: -1.5 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 220, damping: 24 }}
              className="inline-flex items-center gap-2 btn-outline-luxury text-bakery-cream px-8 py-4 rounded-full font-body font-semibold text-base backdrop-blur-sm"
            >
              <FaWhatsapp size={18} />
              WhatsApp Us
            </motion.a>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-16 flex flex-wrap gap-7 lg:gap-9"
          >
            {trustBadges.map((badge, i) => (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 + i * 0.1 }}
                className="flex items-center gap-2.5 group"
              >
                <div className="p-1.5 rounded-lg glass-dark group-hover:bg-bakery-gold/20 transition-colors duration-300">
                  <badge.icon size={16} className="text-bakery-gold" />
                </div>
                <span className="text-bakery-cream/70 text-sm font-body group-hover:text-bakery-cream transition-colors duration-300">{badge.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
        </div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
