import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeading from "./SectionHeading";

import cakeImg from "@/assets/product-cake.jpg";
import cupcakeImg from "@/assets/product-cupcakes.jpg";
import breadImg from "@/assets/product-bread.jpg";
import pastryImg from "@/assets/product-pastries.jpg";
import dessertImg from "@/assets/product-dessert.jpg";
import weddingImg from "@/assets/product-wedding-cake.jpg";
import cinnamonImg from "@/assets/product-cinnamon.jpg";
import customImg from "@/assets/custom-cake.jpg";

const galleryCategories = ["All", "Cakes", "Pastries", "Bread", "Events"];

const images = [
  { src: cakeImg, alt: "Chocolate layer cake", cat: "Cakes" },
  { src: cupcakeImg, alt: "Colorful cupcakes", cat: "Cakes" },
  { src: breadImg, alt: "Artisan sourdough", cat: "Bread" },
  { src: pastryImg, alt: "Golden croissants", cat: "Pastries" },
  { src: dessertImg, alt: "Tiramisu", cat: "Pastries" },
  { src: weddingImg, alt: "Wedding cake", cat: "Events" },
  { src: cinnamonImg, alt: "Cinnamon rolls", cat: "Pastries" },
  { src: customImg, alt: "Custom birthday cake", cat: "Events" },
];

const Gallery = () => {
  const [active, setActive] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const filtered = active === "All" ? images : images.filter((img) => img.cat === active);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const showPrev = () =>
    setLightboxIndex((prev) => (prev === null ? null : (prev - 1 + filtered.length) % filtered.length));
  const showNext = () =>
    setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % filtered.length));

  const activeLightboxImage = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  return (
    <section id="gallery" className="section-padding section-theme-gallery relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 premium-divider" />

      <div className="max-w-7xl mx-auto relative">
        <SectionHeading subtitle="Gallery" title="A Peek Inside Our Kitchen" description="Browse our handcrafted creations — each one a masterpiece." />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2.5 mb-12"
        >
          {galleryCategories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActive(cat)}
              whileHover={{ y: -1, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`px-5 py-2.5 rounded-full text-sm font-body font-medium transition-all duration-400 border ${
                active === cat
                  ? "btn-premium text-primary-foreground border-transparent"
                  : "bg-bakery-cream/75 border-bakery-gold/20 text-muted-foreground hover:text-foreground hover:border-bakery-gold/40"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[170px] sm:auto-rows-[190px] gap-3 sm:gap-4 md:gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((img, i) => (
              <motion.div
                key={img.alt + active}
                layout
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.96 }}
                transition={{ duration: 0.55, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className={`cursor-pointer group ${
                  i % 6 === 0
                    ? "col-span-2 row-span-2"
                    : i % 6 === 3
                      ? "sm:row-span-2"
                      : "row-span-1"
                }`}
                onClick={() => openLightbox(i)}
              >
                <div className="h-full rounded-2xl overflow-hidden relative border border-bakery-gold/18 bg-bakery-cream/50 shadow-[0_14px_34px_-18px_hsl(var(--bakery-brown)/0.35)]">
                  <motion.img
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bakery-brown/70 via-bakery-brown/15 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-4">
                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-400">
                      <span className="block text-bakery-cream font-body text-sm font-semibold">{img.alt}</span>
                      <span className="block text-bakery-cream/75 font-body text-xs mt-0.5">{img.cat}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {activeLightboxImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-foreground/85 backdrop-blur-md flex items-center justify-center p-4"
              onClick={closeLightbox}
            >
              <div className="max-w-5xl w-full relative" onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  onClick={showPrev}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-[2] w-10 h-10 rounded-full bg-bakery-cream/90 text-foreground border border-bakery-gold/20 flex items-center justify-center hover:bg-bakery-cream transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-[2] w-10 h-10 rounded-full bg-bakery-cream/90 text-foreground border border-bakery-gold/20 flex items-center justify-center hover:bg-bakery-cream transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight size={18} />
                </button>
                <motion.img
                  initial={{ scale: 0.7, opacity: 0, y: 30 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.7, opacity: 0, y: 30 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  src={activeLightboxImage.src}
                  alt={activeLightboxImage.alt}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -80) showNext();
                    if (info.offset.x > 80) showPrev();
                  }}
                  className="max-w-full max-h-[78vh] mx-auto rounded-3xl object-contain luxury-shadow"
                />
                <div className="mt-4 text-center">
                  <p className="text-bakery-cream font-body text-sm font-medium">{activeLightboxImage.alt}</p>
                  <p className="text-bakery-cream/70 font-body text-xs mt-1">{activeLightboxImage.cat}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Gallery;
