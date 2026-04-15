import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { createWhatsAppLink } from "@/lib/whatsapp";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Menu", href: "#menu" },
  { label: "Custom Orders", href: "#custom" },
  { label: "Gallery", href: "#gallery" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const WHATSAPP_URL = createWhatsAppLink({
  intent: "order",
  item: "General bakery order",
  section: "Navbar quick order",
  reference: "/#home",
});

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  const navBg = useTransform(scrollY, [0, 100], [0, 1]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      return;
    }
    document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <motion.nav
      style={{ opacity: 1 }}
      className={`fixed top-0 left-0 right-0 ${mobileOpen ? "z-[80]" : "z-50"} transition-all duration-500 ${
        mobileOpen
          ? "bg-bakery-cream/95 py-2 border-b border-bakery-gold/15"
          : scrolled
          ? "glass-card py-2"
          : "bg-transparent py-3"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 lg:h-16">
          <a href="#home" className="flex items-center gap-2 group">
            <motion.span
              whileHover={{ scale: 1.02 }}
              className="text-2xl lg:text-3xl font-heading font-bold"
            >
              <span className={scrolled || mobileOpen ? "text-primary" : "text-bakery-cream"}>AxisX </span>
              <span className="gold-text">Bakery</span>
            </motion.span>
          </a>

          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 + 0.2 }}
                className={`text-sm font-body font-medium transition-all duration-300 relative group ${
                  scrolled ? "text-foreground/70 hover:text-accent" : "text-bakery-cream/80 hover:text-bakery-gold"
                }`}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 gold-gradient rounded-full group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </div>

          <motion.a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="hidden lg:inline-flex items-center gap-2 btn-premium text-primary-foreground px-5 py-2.5 rounded-xl font-body font-medium text-sm"
          >
            <FaWhatsapp size={16} />
            Order via WhatsApp
          </motion.a>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2 transition-colors ${scrolled || mobileOpen ? "text-foreground" : "text-bakery-cream"}`}
            aria-label="Toggle menu"
          >
            <motion.div animate={{ rotate: mobileOpen ? 90 : 0 }} transition={{ duration: 0.3 }}>
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="lg:hidden fixed inset-0 top-0 z-[70] bg-[hsl(var(--bakery-cream))] overflow-y-auto border-t border-bakery-gold/15"
          >
            <div className="min-h-screen">
              <div className="sticky top-0 z-[1] bg-[hsl(var(--bakery-cream))] border-b border-bakery-gold/15 px-5 py-4 flex items-center justify-between">
                <p className="text-xl font-heading font-semibold text-primary">
                  AxisX <span className="gold-text">Bakery</span>
                </p>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="w-9 h-9 rounded-lg border border-bakery-gold/20 bg-bakery-cream/80 text-foreground hover:border-bakery-gold/40 transition-colors flex items-center justify-center"
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="px-5 py-6">
                <p className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground font-body font-medium mb-4">Navigation</p>
                <div className="grid grid-cols-1 gap-3">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="block rounded-xl border border-bakery-gold/20 bg-[hsl(var(--bakery-cream))] px-3 py-2.5 text-[15px] font-body font-medium text-foreground/85 hover:text-foreground hover:border-bakery-gold/35 transition-colors"
                  >
                    {link.label}
                  </motion.a>
                ))}
                </div>
                <motion.a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="inline-flex items-center gap-2 btn-premium text-primary-foreground px-5 py-3.5 rounded-xl font-body font-semibold text-sm w-full justify-center mt-5 shadow-[0_12px_30px_-16px_hsl(var(--bakery-brown)/0.45)]"
                >
                  <FaWhatsapp size={16} />
                  Order via WhatsApp
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
