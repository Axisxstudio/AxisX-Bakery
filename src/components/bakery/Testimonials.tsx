import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeftRight, Filter, Quote, Star, X } from "lucide-react";
import SectionHeading from "./SectionHeading";

const testimonials = [
  { name: "Priya Sharma", role: "Birthday Celebration", rating: 5, text: "The custom birthday cake was absolutely stunning! Everyone at the party couldn't stop raving about how beautiful and delicious it was. Truly the best bakery in town." },
  { name: "Rahul Mehta", role: "Regular Customer", rating: 5, text: "Their sourdough bread is a game-changer. We order every weekend without fail. The quality is incredibly consistent and the flavor is outstanding." },
  { name: "Anita Desai", role: "Wedding Order", rating: 5, text: "AxisX Bakery made our wedding cake dreams come true. The three-tier masterpiece was not only gorgeous but tasted heavenly. Thank you for making our day special!" },
  { name: "Vikram Singh", role: "Corporate Event", rating: 5, text: "We ordered assorted pastries for our office event and they were a huge hit. Professional service, on-time delivery, and incredible taste." },
  { name: "Sneha Patel", role: "Anniversary Cake", rating: 5, text: "Quick response on WhatsApp, beautiful design, and amazing taste. My go-to bakery for every celebration. The red velvet is to die for!" },
];

const Testimonials = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [selectedRating, setSelectedRating] = useState<number | "all">("all");
  const [showAllReviewsModal, setShowAllReviewsModal] = useState(false);
  const [activeReview, setActiveReview] = useState<(typeof testimonials)[number] | null>(null);

  const allFilteredTestimonials = useMemo(() => {
    const byRating = selectedRating === "all"
      ? testimonials
      : testimonials.filter((review) => review.rating === selectedRating);

    return isReversed ? [...byRating].reverse() : byRating;
  }, [isReversed, selectedRating]);

  const filteredTestimonials = useMemo(
    () => allFilteredTestimonials.slice(0, 4),
    [allFilteredTestimonials],
  );

  const scrollingTestimonials = useMemo(
    () => (filteredTestimonials.length > 0 ? [...filteredTestimonials, ...filteredTestimonials] : []),
    [filteredTestimonials],
  );

  return (
    <section id="testimonials" className="section-padding section-theme-testimonials relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_20%_80%,hsl(var(--bakery-gold)/0.05),transparent)]" />

      <div className="max-w-7xl mx-auto relative">
        <SectionHeading subtitle="Testimonials" title="What Our Customers Say" description="Real stories from families who trust us with their celebrations." />

        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <button
            type="button"
            onClick={() => setIsReversed((prev) => !prev)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-bakery-gold/20 text-sm font-body text-foreground/80 hover:text-accent hover:border-bakery-gold/40 transition-colors"
          >
            <ArrowLeftRight size={16} />
            Swap Direction
          </button>

          <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-bakery-gold/20">
            <Filter size={16} className="text-accent" />
            <label htmlFor="rating-filter" className="sr-only">
              Filter reviews by rating
            </label>
            <select
              id="rating-filter"
              value={selectedRating}
              onChange={(event) =>
                setSelectedRating(event.target.value === "all" ? "all" : Number(event.target.value))
              }
              className="bg-transparent text-sm font-body text-foreground/80 focus:outline-none"
            >
              <option value="all">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>
        </div>

        <div className="overflow-hidden pb-2">
          <motion.div
            className="flex items-stretch gap-6 w-max"
            animate={{ x: isReversed ? ["-50%", "0%"] : ["0%", "-50%"] }}
            transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
          >
            {scrollingTestimonials.map((t, i) => (
              <motion.button
                type="button"
                key={`${t.name}-${i}`}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
                onClick={() => setActiveReview(t)}
                className="card-luxury p-7 lg:p-9 rounded-3xl relative text-left w-[300px] sm:w-[340px] lg:w-[360px] shrink-0 cursor-pointer"
              >
                <Quote size={32} className="text-bakery-gold/15 absolute top-6 right-6" />
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={15} className="fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-foreground/75 font-body text-sm leading-relaxed mb-7 italic font-light line-clamp-4">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-5 border-t border-bakery-gold/10">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-bakery-gold/30 to-bakery-gold/10 flex items-center justify-center text-accent font-heading font-bold text-sm">
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="font-body font-semibold text-sm text-foreground">{t.name}</p>
                    <p className="text-muted-foreground text-xs font-light">{t.role}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </div>

        {filteredTestimonials.length === 0 && (
          <p className="text-center text-sm text-muted-foreground mt-6">No reviews found for this rating.</p>
        )}

        <div className="flex flex-wrap justify-center gap-3 mt-8">
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-5 py-3 rounded-xl border border-bakery-gold/30 text-sm font-body text-foreground/80 hover:text-accent hover:border-bakery-gold/60 transition-colors"
          >
            Add Feedback
          </a>
          <button
            type="button"
            onClick={() => setShowAllReviewsModal(true)}
            className="inline-flex items-center justify-center px-5 py-3 rounded-xl btn-premium text-primary-foreground text-sm font-body"
          >
            View All Feedback
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showAllReviewsModal && (
          <motion.div
            className="fixed inset-0 z-[70] bg-black/40 p-4 sm:p-6 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAllReviewsModal(false)}
          >
            <div className="absolute inset-0 backdrop-blur-md" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              onClick={(event) => event.stopPropagation()}
              className="card-luxury rounded-3xl p-6 sm:p-8 w-full max-w-5xl max-h-[85vh] overflow-y-auto relative z-[1]"
            >
              <button
                type="button"
                onClick={() => setShowAllReviewsModal(false)}
                className="absolute top-4 right-4 text-foreground/70 hover:text-accent transition-colors"
                aria-label="Close all feedback popup"
              >
                <X size={18} />
              </button>

              <h3 className="font-heading text-2xl text-foreground mb-6">All Feedback</h3>

              {allFilteredTestimonials.length === 0 ? (
                <p className="text-sm text-muted-foreground">No feedback found for this rating.</p>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {allFilteredTestimonials.map((review) => (
                    <button
                      key={`${review.name}-${review.role}`}
                      type="button"
                      onClick={() => {
                        setShowAllReviewsModal(false);
                        setActiveReview(review);
                      }}
                      className="text-left rounded-2xl border border-bakery-gold/15 p-5 bg-background/40 hover:border-bakery-gold/40 transition-colors"
                    >
                      <div className="flex gap-1 mb-3">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star key={i} size={14} className="fill-accent text-accent" />
                        ))}
                      </div>
                      <p className="text-sm text-foreground/75 italic line-clamp-3 mb-4">"{review.text}"</p>
                      <p className="text-sm font-semibold text-foreground">{review.name}</p>
                      <p className="text-xs text-muted-foreground">{review.role}</p>
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}

        {activeReview && (
          <motion.div
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm p-4 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveReview(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              onClick={(event) => event.stopPropagation()}
              className="card-luxury rounded-3xl p-7 sm:p-8 max-w-xl w-full relative"
            >
              <button
                type="button"
                onClick={() => setActiveReview(null)}
                className="absolute top-4 right-4 text-foreground/70 hover:text-accent transition-colors"
                aria-label="Close review"
              >
                <X size={18} />
              </button>
              <div className="flex gap-1 mb-4">
                {Array.from({ length: activeReview.rating }).map((_, i) => (
                  <Star key={i} size={16} className="fill-accent text-accent" />
                ))}
              </div>
              <p className="text-foreground/80 font-body text-sm sm:text-base leading-relaxed italic mb-6">
                "{activeReview.text}"
              </p>
              <div className="border-t border-bakery-gold/10 pt-4">
                <p className="font-body font-semibold text-foreground">{activeReview.name}</p>
                <p className="text-muted-foreground text-sm">{activeReview.role}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Testimonials;
