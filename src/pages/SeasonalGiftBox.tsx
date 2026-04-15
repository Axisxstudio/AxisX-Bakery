import { motion } from "framer-motion";
import { ArrowLeft, Check, Gift } from "lucide-react";
import { Link } from "react-router-dom";
import { createWhatsAppLink } from "@/lib/whatsapp";

const inclusions = [
  "4 premium butter croissants",
  "6 artisan cookies (mixed flavors)",
  "4 seasonal mini pastries",
  "Signature gift wrapping and note card",
];

const SEASONAL_GIFT_BOX_ORDER_URL = createWhatsAppLink({
  intent: "order",
  item: "Seasonal Gift Box",
  section: "Seasonal Gift Box page",
  reference: "/seasonal-gift-box",
  notes: "Please confirm available slots and customization options.",
});

const SeasonalGiftBox = () => (
  <main className="min-h-screen section-light relative overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,hsl(var(--bakery-gold)/0.08),transparent)]" />
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative">
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-body text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          Back to home
        </Link>

        <div className="card-luxury rounded-3xl p-7 sm:p-10 lg:p-12">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-bakery-gold/20 to-bakery-gold/5 text-accent flex items-center justify-center mb-6">
            <Gift size={26} />
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl text-foreground mb-4">Seasonal Gift Box</h1>
          <p className="text-muted-foreground font-body leading-relaxed max-w-3xl">
            Curated assortment of premium pastries and cookies designed for festive gifting, corporate sharing, and special occasions.
            Freshly baked, elegantly packed, and ready for same-day pickup.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mt-10">
            <div>
              <h2 className="font-heading text-xl text-foreground mb-4">What is included</h2>
              <ul className="space-y-3">
                {inclusions.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-muted-foreground">
                    <Check size={16} className="text-accent mt-1 shrink-0" />
                    <span className="font-body text-sm sm:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-bakery-gold/15 p-6 bg-background/40">
              <h3 className="font-heading text-lg text-foreground mb-3">Pricing & availability</h3>
              <p className="text-sm text-muted-foreground mb-2">Starting at: <span className="font-semibold text-foreground">LKR 2,800</span></p>
              <p className="text-sm text-muted-foreground mb-2">Lead time: 24 hours (same-day for selected slots)</p>
              <p className="text-sm text-muted-foreground mb-6">Custom note cards and brand tags available on request.</p>

              <a
                href={SEASONAL_GIFT_BOX_ORDER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center btn-premium text-primary-foreground px-5 py-3 rounded-xl text-sm font-body font-semibold"
              >
                Order Seasonal Gift Box
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  </main>
);

export default SeasonalGiftBox;
