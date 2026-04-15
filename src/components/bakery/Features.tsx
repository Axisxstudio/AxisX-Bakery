import { motion } from "framer-motion";
import { Clock, Sparkles, Cake, ShieldCheck, MessageCircle, Smile } from "lucide-react";
import SectionHeading from "./SectionHeading";

const features = [
  { icon: Clock, title: "Fresh Every Morning", desc: "Baked daily before sunrise for peak freshness and flavor." },
  { icon: Sparkles, title: "Premium Ingredients", desc: "Organic flour, real butter, and farm-fresh eggs only." },
  { icon: Cake, title: "Custom Cakes", desc: "Personalized designs for birthdays, weddings & more." },
  { icon: ShieldCheck, title: "Hygiene First", desc: "FSSAI certified with top-tier kitchen standards." },
  { icon: MessageCircle, title: "Quick WhatsApp Response", desc: "Order or inquire in minutes via chat." },
  { icon: Smile, title: "Friendly Service", desc: "A warm smile with every order, guaranteed." },
];

const Features = () => (
  <section className="section-padding section-theme-features relative overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(var(--bakery-gold)/0.06),transparent)]" />

    <div className="max-w-7xl mx-auto relative">
      <SectionHeading
        subtitle="Why Choose Us"
        title="What Makes Us Special"
        description="We pour love into every recipe and pride into every interaction."
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -8, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } }}
            className="group p-7 lg:p-9 rounded-3xl card-luxury cursor-default"
          >
            <motion.div
              whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
              className="w-14 h-14 rounded-2xl bg-gradient-to-br from-bakery-gold/20 to-bakery-gold/5 flex items-center justify-center text-accent mb-6 group-hover:from-bakery-gold group-hover:to-bakery-gold-bright group-hover:text-accent-foreground transition-all duration-500"
            >
              <f.icon size={26} />
            </motion.div>
            <h3 className="font-heading text-xl font-semibold text-foreground mb-2">{f.title}</h3>
            <p className="text-muted-foreground font-body text-sm leading-relaxed font-light">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
