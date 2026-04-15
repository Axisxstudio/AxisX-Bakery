import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Globe, Instagram, Facebook, Twitter } from "lucide-react";
import { createWhatsAppLink } from "@/lib/whatsapp";
import { bakeryLocation, contactChannels } from "@/lib/site";

const FOOTER_ORDER_URL = createWhatsAppLink({
  intent: "order",
  item: "Order from footer CTA",
  section: "Footer",
  reference: "/#contact",
});

const Footer = () => (
  <footer className="relative overflow-hidden">
    {/* CTA Strip */}
    <div className="relative gold-gradient py-8 overflow-hidden">
      <div className="absolute inset-0 shimmer" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 relative">
        <div>
          <p className="font-heading text-2xl font-bold text-accent-foreground text-center sm:text-left">
            Ready to order something special?
          </p>
          <p className="font-body text-sm text-accent-foreground/70 text-center sm:text-left mt-1">
            Fresh baked goods delivered to your doorstep
          </p>
        </div>
        <motion.a
          href={FOOTER_ORDER_URL}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="btn-premium text-primary-foreground px-8 py-3 rounded-xl font-body font-semibold text-sm"
        >
          Order Now →
        </motion.a>
      </div>
    </div>

    {/* Main Footer */}
    <div className="bg-gradient-to-b from-primary to-bakery-brown-rich text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <h3 className="font-heading text-2xl font-bold mb-2">
              AxisX <span className="gold-text">Bakery</span>
            </h3>
            <p className="font-body text-sm text-primary-foreground/60 leading-relaxed mb-8 font-light">
              Crafting artisan baked goods with love, premium ingredients, and a passion for perfection since 2010.
            </p>
            <div className="flex gap-3">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.15, y: -2 }}
                  className="w-10 h-10 rounded-xl bg-primary-foreground/8 flex items-center justify-center hover:bg-bakery-gold/20 transition-colors duration-300"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3 font-body text-sm text-primary-foreground/60">
              {["Home", "About", "Menu", "Gallery", "Contact"].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="hover:text-bakery-gold transition-colors duration-300 font-light">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-lg font-semibold mb-6">Categories</h4>
            <ul className="space-y-3 font-body text-sm text-primary-foreground/60">
              {["Custom Cakes", "Artisan Bread", "Cupcakes", "Croissants & Pastries", "Desserts", "Gift Boxes"].map((cat) => (
                <li key={cat}>
                  <a href="#menu" className="hover:text-bakery-gold transition-colors duration-300 font-light">{cat}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-lg font-semibold mb-6">Visit Us</h4>
            <div className="space-y-5 font-body text-sm text-primary-foreground/60">
              <div className="rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 p-4">
                <p className="text-[10px] tracking-[0.16em] uppercase text-primary-foreground/45 mb-2">Location</p>
                <a
                  href={bakeryLocation.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 rounded-lg -m-1 p-1 transition-colors hover:bg-primary-foreground/5"
                >
                  <div className="p-1.5 rounded-lg bg-bakery-gold/10 shrink-0 mt-0.5">
                    <MapPin size={12} className="text-bakery-gold" />
                  </div>
                  <div className="font-light leading-relaxed">
                    {bakeryLocation.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                    <span className="mt-2 inline-block text-xs text-bakery-gold group-hover:underline">
                      Directions →
                    </span>
                  </div>
                </a>
              </div>
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
                <div key={item.label} className="flex items-start gap-3">
                  <div className="p-1.5 rounded-lg bg-bakery-gold/10 shrink-0 mt-0.5">
                    <item.icon size={12} className="text-bakery-gold" />
                  </div>
                  <a
                    href={item.href}
                    {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="font-light whitespace-pre-line text-primary-foreground/60 hover:text-bakery-gold transition-colors duration-300"
                  >
                    {item.label}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-body text-primary-foreground/40 font-light">
          <p>© 2026 AxisX Bakery. All rights reserved.</p>
          <p>
            AxisX Bakery ·{" "}
            <a
              href={contactChannels.webHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-foreground/55 hover:text-bakery-gold transition-colors"
            >
              {contactChannels.webDisplay}
            </a>
          </p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
