import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { useState, useEffect } from "react";
import { createWhatsAppLink } from "@/lib/whatsapp";

const FLOATING_WHATSAPP_URL = createWhatsAppLink({
  intent: "order",
  item: "General order/inquiry",
  section: "Floating WhatsApp button",
  reference: "/",
});

const WhatsAppButton = () => {
  const [show, setShow] = useState(false);
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
          <AnimatePresence>
            {showPopup && (
              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="relative rounded-xl border border-bakery-gold/20 bg-bakery-cream px-3 py-2 pr-8 text-xs font-body text-foreground shadow-[0_12px_28px_-16px_hsl(var(--bakery-brown)/0.35)]"
              >
                AxisX Bakery: Place your order on WhatsApp
                <button
                  type="button"
                  onClick={() => setShowPopup(false)}
                  className="absolute right-2 top-1.5 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Close WhatsApp popup"
                >
                  ×
                </button>
                <span className="absolute -bottom-1 right-4 h-2 w-2 rotate-45 border-r border-b border-bakery-gold/20 bg-bakery-cream" />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.a
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            href={FLOATING_WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-14 h-14 rounded-full text-primary-foreground flex items-center justify-center shadow-[0_16px_30px_-12px_rgba(18,140,126,0.65)]"
            style={{ background: "linear-gradient(135deg, #25D366, #128C7E)" }}
            aria-label="Chat on WhatsApp"
          >
            <FaWhatsapp size={26} />
            <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-bakery-gold animate-pulse-glow" />
          </motion.a>
        </div>
      )}
    </AnimatePresence>
  );
};

export default WhatsAppButton;
