import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import SectionHeading from "./SectionHeading";
import { createWhatsAppLink } from "@/lib/whatsapp";

import cakeImg from "@/assets/product-cake.jpg";
import cupcakeImg from "@/assets/product-cupcakes.jpg";
import breadImg from "@/assets/product-bread.jpg";
import pastryImg from "@/assets/product-pastries.jpg";
import dessertImg from "@/assets/product-dessert.jpg";
import weddingImg from "@/assets/product-wedding-cake.jpg";
import cinnamonImg from "@/assets/product-cinnamon.jpg";
import customImg from "@/assets/custom-cake.jpg";

const categories = ["All", "Cakes", "Cupcakes", "Bread", "Pastries", "Desserts", "Specials"];

const products = [
  { name: "Belgian Chocolate Cake", desc: "Rich ganache with gold leaf accents", price: "LKR 1,200", category: "Cakes", badge: "Bestseller", img: cakeImg },
  { name: "Vanilla Dream Cupcakes", desc: "Light buttercream, box of 6", price: "LKR 480", category: "Cupcakes", img: cupcakeImg },
  { name: "Artisan Sourdough", desc: "48-hour fermented, crusty perfection", price: "LKR 350", category: "Bread", badge: "Fresh Daily", img: breadImg },
  { name: "Butter Croissants", desc: "Flaky, golden, French-style", price: "LKR 180", category: "Pastries", img: pastryImg },
  { name: "Classic Tiramisu", desc: "Espresso-soaked layers of bliss", price: "LKR 550", category: "Desserts", img: dessertImg },
  { name: "Wedding Elegance Cake", desc: "3-tier with sugar flowers", price: "LKR 8,500", category: "Specials", badge: "Premium", img: weddingImg },
  { name: "Cinnamon Swirl Rolls", desc: "Glazed, warm, irresistible", price: "LKR 250", category: "Pastries", img: cinnamonImg },
  { name: "Custom Birthday Cake", desc: "Personalized design & flavors", price: "From LKR 1,500", category: "Cakes", badge: "Custom", img: customImg },
];

const Products = () => {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? products : products.filter((p) => p.category === active);

  return (
    <section id="menu" className="section-padding section-theme-menu relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 premium-divider" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,hsl(var(--bakery-gold)/0.04),transparent)]" />

      <div className="max-w-7xl mx-auto relative">
        <SectionHeading
          subtitle="Our Menu"
          title="Handcrafted Delights"
          description="Each item is made fresh daily with premium ingredients and artisan techniques."
        />

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3.5 mb-14"
        >
          <LayoutGroup id="menu-category-pills">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActive(cat)}
                whileHover={{ y: -1.5, scale: 1.015 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 230, damping: 24 }}
                className={`relative overflow-hidden px-6 py-2.5 rounded-full text-sm font-body font-medium transition-all duration-500 border ${
                  active === cat
                    ? "text-primary-foreground border-transparent shadow-[0_8px_24px_hsl(var(--bakery-gold)/0.35)]"
                    : "bg-white/70 border-bakery-gold/20 text-bakery-brown/80 hover:text-bakery-brown hover:border-bakery-gold/40 hover:shadow-[0_6px_18px_hsl(var(--bakery-gold)/0.15)]"
                }`}
              >
                {active === cat && (
                  <motion.div
                    layoutId="active-menu-category-pill"
                    className="absolute inset-0 rounded-full gold-gradient"
                    transition={{ type: "spring", stiffness: 280, damping: 30, mass: 0.9 }}
                  />
                )}
                <motion.span
                  className="relative z-[1]"
                  animate={{ opacity: active === cat ? 1 : 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  {cat}
                </motion.span>
              </motion.button>
            ))}
          </LayoutGroup>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-7 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((product, i) => (
              <motion.div
                key={product.name}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="group card-luxury rounded-3xl overflow-hidden"
              >
                <div className="relative overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                    src={product.img}
                    alt={product.name}
                    className="w-full h-60 object-cover"
                    loading="lazy"
                    width={800}
                    height={800}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bakery-brown/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {product.badge && (
                    <span className="absolute top-3 left-3 bg-bakery-cream/95 border border-bakery-gold/35 text-bakery-brown text-xs font-body font-semibold px-3 py-1.5 rounded-full shadow-[0_8px_18px_-10px_hsl(var(--bakery-brown)/0.35)]">
                      {product.badge}
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-[1.15rem] leading-snug font-semibold text-foreground">{product.name}</h3>
                  <p className="text-muted-foreground text-sm font-body mt-2 leading-relaxed font-light">{product.desc}</p>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-bakery-gold/10">
                    <span className="font-heading text-lg font-bold gold-text">{product.price}</span>
                    <motion.a
                      href={createWhatsAppLink({
                        intent: "order",
                        item: product.name,
                        section: `Menu - ${product.category}`,
                        reference: "/#menu",
                        notes: `Price shown: ${product.price}`,
                      })}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-1.5 btn-premium text-primary-foreground px-4 py-2 rounded-xl text-xs font-body font-medium"
                    >
                      <FaWhatsapp size={13} />
                      Order
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Products;
