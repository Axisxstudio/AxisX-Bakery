import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import SectionHeading from "./SectionHeading";
import customImg from "@/assets/custom-cake.jpg";
import { createWhatsAppLink } from "@/lib/whatsapp";

const steps = [
  "Choose your favorite flavor & frosting",
  "Select size (1 kg, 2 kg, or larger)",
  "Add a custom message or topper",
  "Share a design reference photo",
  "Place your order 48 hours in advance",
];

const CUSTOM_CAKE_ORDER_URL = createWhatsAppLink({
  intent: "order",
  item: "Custom cake",
  section: "Custom Orders",
  reference: "/#custom",
  notes: "I can share design references and event details.",
});

const CustomOrders = () => (
  <section id="custom" className="relative overflow-hidden section-theme-custom">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_20%,hsl(var(--bakery-gold)/0.12),transparent)]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_82%,hsl(var(--bakery-brown)/0.05),transparent)]" />
    <div className="absolute top-0 left-0 right-0 premium-divider" />

    <div className="relative section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <SectionHeading
              subtitle="Custom Orders"
              title="Your Dream Cake, Our Craft"
              description="Celebrate every occasion with a one-of-a-kind creation designed just for you."
              centered={false}
            />
            <ul className="space-y-4 mb-10">
              {steps.map((step, i) => (
                <motion.li
                  key={step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  className="flex items-start gap-3 font-body text-foreground/80 font-light leading-relaxed"
                >
                  <CheckCircle2 size={20} className="text-bakery-gold shrink-0 mt-0.5" />
                  {step}
                </motion.li>
              ))}
            </ul>
            <motion.a
              href={CUSTOM_CAKE_ORDER_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, y: -1.5 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 220, damping: 24 }}
              className="inline-flex items-center gap-2 btn-premium text-primary-foreground px-8 py-4 rounded-xl font-body font-semibold shadow-[0_14px_34px_-16px_hsl(var(--bakery-brown)/0.38)]"
            >
              <FaWhatsapp size={18} />
              Request a Custom Cake
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40, rotate: 2 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden luxury-shadow border border-bakery-gold/15 bg-background/60">
              <motion.img
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                src={customImg}
                alt="Custom celebration cake"
                className="w-full h-[520px] object-cover"
                loading="lazy"
                width={800}
                height={800}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bakery-brown/20 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-3 -right-3 w-24 h-24 border-b-2 border-r-2 border-bakery-gold/30 rounded-br-3xl" />
          </motion.div>
        </div>
      </div>
    </div>
  </section>
);

export default CustomOrders;
