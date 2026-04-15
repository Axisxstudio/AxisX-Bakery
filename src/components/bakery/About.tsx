import { motion } from "framer-motion";
import { Leaf, HandMetal, Palette, Heart } from "lucide-react";
import SectionHeading from "./SectionHeading";
import bakerImg from "@/assets/baker-story.jpg";

const values = [
  { icon: Leaf, title: "Fresh Ingredients", desc: "Locally sourced, premium quality" },
  { icon: HandMetal, title: "Handmade Daily", desc: "Crafted with care every morning" },
  { icon: Palette, title: "Custom Designs", desc: "Tailored to your celebrations" },
  { icon: Heart, title: "Loved by Customers", desc: "500+ happy families served" },
];

const About = () => (
  <section id="about" className="section-padding section-theme-about relative overflow-hidden">
    {/* Decorative bg elements */}
    <div className="absolute top-20 right-0 w-96 h-96 rounded-full bg-bakery-gold/3 blur-3xl" />
    <div className="absolute bottom-20 left-0 w-80 h-80 rounded-full bg-bakery-gold/5 blur-3xl" />

    <div className="max-w-7xl mx-auto relative">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40, rotate: -2 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="rounded-3xl overflow-hidden luxury-shadow">
            <motion.img
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.6 }}
              src={bakerImg}
              alt="Baker kneading dough"
              className="w-full h-[550px] object-cover"
              loading="lazy"
              width={800}
              height={1000}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bakery-brown/30 to-transparent" />
          </div>
          {/* Floating badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="absolute -bottom-6 -right-4 sm:-right-6 glass-card p-6 rounded-2xl luxury-shadow"
          >
            <p className="font-heading text-4xl font-bold gold-text">15+</p>
            <p className="font-body text-sm text-muted-foreground mt-1">Years of Baking</p>
          </motion.div>
          {/* Corner accent */}
          <div className="absolute -top-3 -left-3 w-20 h-20 border-t-2 border-l-2 border-bakery-gold/30 rounded-tl-3xl" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionHeading
            subtitle="Our Story"
            title="Baked with Passion, Served with Love"
            centered={false}
          />
          <p className="text-muted-foreground font-body leading-relaxed mb-5 font-light">
            What started as a small family kitchen in 2010 has grown into a beloved artisan bakery.
            Every morning, our bakers rise before dawn to craft each loaf, pastry, and cake with the
            same dedication and love that inspired our very first batch.
          </p>
          <p className="text-muted-foreground font-body leading-relaxed mb-10 font-light">
            We believe that great baking starts with great ingredients. That's why we source locally,
            use organic flour, and never compromise on quality.
          </p>

          <div className="grid grid-cols-2 gap-4">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.3, duration: 0.5 }}
                whileHover={{ y: -3, transition: { duration: 0.3 } }}
                className="flex items-start gap-3 p-4 rounded-2xl card-luxury cursor-default"
              >
                <div className="p-2 rounded-xl bg-gradient-to-br from-bakery-gold/20 to-bakery-gold/5 text-accent shrink-0">
                  <v.icon size={20} />
                </div>
                <div>
                  <h4 className="font-body font-semibold text-sm text-foreground">{v.title}</h4>
                  <p className="text-muted-foreground text-xs font-light mt-0.5">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default About;
