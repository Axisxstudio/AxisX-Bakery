import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ArrowLeftRight, ChevronLeft, ChevronRight, Filter, Quote, Star, X } from "lucide-react";
import { createWhatsAppLink } from "@/lib/whatsapp";
import SectionHeading from "./SectionHeading";

const testimonials = [
  { name: "Priya Sharma", role: "Birthday Celebration", rating: 5, text: "The custom birthday cake was absolutely stunning! Everyone at the party couldn't stop raving about how beautiful and delicious it was. Truly the best bakery in town." },
  { name: "Rahul Mehta", role: "Regular Customer", rating: 5, text: "Their sourdough bread is a game-changer. We order every weekend without fail. The quality is incredibly consistent and the flavor is outstanding." },
  { name: "Anita Desai", role: "Wedding Order", rating: 5, text: "AxisX Bakery made our wedding cake dreams come true. The three-tier masterpiece was not only gorgeous but tasted heavenly. Thank you for making our day special!" },
  { name: "Vikram Singh", role: "Corporate Event", rating: 5, text: "We ordered assorted pastries for our office event and they were a huge hit. Professional service, on-time delivery, and incredible taste." },
  { name: "Sneha Patel", role: "Anniversary Cake", rating: 5, text: "Quick response on WhatsApp, beautiful design, and amazing taste. My go-to bakery for every celebration. The red velvet is to die for!" },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 120 : -120,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 120 : -120,
    opacity: 0,
  }),
};

const Testimonials = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [selectedRating, setSelectedRating] = useState<number | "all">("all");
  const [showAllReviewsModal, setShowAllReviewsModal] = useState(false);
  const [activeReview, setActiveReview] = useState<(typeof testimonials)[number] | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState(0);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackName, setFeedbackName] = useState("");
  const [feedbackRating, setFeedbackRating] = useState(5);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const allFilteredTestimonials = useMemo(() => {
    const byRating = selectedRating === "all"
      ? testimonials
      : testimonials.filter((review) => review.rating === selectedRating);

    return isReversed ? [...byRating].reverse() : byRating;
  }, [isReversed, selectedRating]);

  const len = allFilteredTestimonials.length;
  const currentReview = len > 0 ? allFilteredTestimonials[carouselIndex] : null;

  const scrollingTestimonials = useMemo(
    () => (allFilteredTestimonials.length > 0 ? [...allFilteredTestimonials, ...allFilteredTestimonials] : []),
    [allFilteredTestimonials],
  );

  useEffect(() => {
    setCarouselIndex(0);
    setSlideDirection(0);
  }, [isReversed, selectedRating]);

  useEffect(() => {
    if (carouselIndex >= len && len > 0) {
      setCarouselIndex(len - 1);
    }
  }, [carouselIndex, len]);

  const goTo = useCallback(
    (nextIndex: number, dir: number) => {
      if (len === 0) return;
      const wrapped = ((nextIndex % len) + len) % len;
      setSlideDirection(dir);
      setCarouselIndex(wrapped);
    },
    [len],
  );

  const goNext = useCallback(() => goTo(carouselIndex + 1, 1), [carouselIndex, goTo, len]);
  const goPrev = useCallback(() => goTo(carouselIndex - 1, -1), [carouselIndex, goTo, len]);

  const onDragEnd = useCallback(
    (_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (info.offset.x < -60) goTo(carouselIndex + 1, 1);
      else if (info.offset.x > 60) goTo(carouselIndex - 1, -1);
    },
    [carouselIndex, goTo],
  );

  const submitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    const name = feedbackName.trim() || "Customer";
    const message = feedbackMessage.trim();
    if (!message) return;
    const notes = [`Name: ${name}`, `Rating: ${feedbackRating}/5`, "", message].join("\n");
    const url = createWhatsAppLink({
      intent: "feedback",
      item: "Website feedback",
      section: "Testimonials",
      notes,
    });
    window.open(url, "_blank", "noopener,noreferrer");
    setShowFeedbackModal(false);
    setFeedbackName("");
    setFeedbackRating(5);
    setFeedbackMessage("");
  };

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
            Swap Order
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

        <p className="text-center text-xs text-muted-foreground mb-4 md:hidden">
          Swipe the card or use arrows to browse feedback.
        </p>

        {/* Swipeable carousel: mobile only */}
        <div className="relative max-w-xl mx-auto px-12 sm:px-14 md:hidden">
          <button
            type="button"
            onClick={goPrev}
            disabled={len <= 1}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full border border-bakery-gold/25 bg-background/80 text-foreground/80 hover:text-accent hover:border-bakery-gold/50 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            aria-label="Previous feedback"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={len <= 1}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full border border-bakery-gold/25 bg-background/80 text-foreground/80 hover:text-accent hover:border-bakery-gold/50 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            aria-label="Next feedback"
          >
            <ChevronRight size={22} />
          </button>

          <div className="overflow-hidden min-h-[320px] sm:min-h-[300px]">
            {currentReview && (
              <AnimatePresence mode="wait" custom={slideDirection} initial={false}>
                <motion.div
                  key={`${carouselIndex}-${currentReview.name}-${currentReview.role}`}
                  custom={slideDirection}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.85}
                  onDragEnd={onDragEnd}
                  className="cursor-grab active:cursor-grabbing"
                >
                  <motion.button
                    type="button"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    whileHover={{ y: -4, transition: { duration: 0.25 } }}
                    onClick={() => setActiveReview(currentReview)}
                    className="card-luxury p-7 lg:p-9 rounded-3xl relative text-left w-full cursor-pointer"
                  >
                    <Quote size={32} className="text-bakery-gold/15 absolute top-6 right-6" />
                    <div className="flex gap-1 mb-5">
                      {Array.from({ length: currentReview.rating }).map((_, j) => (
                        <Star key={j} size={15} className="fill-accent text-accent" />
                      ))}
                    </div>
                    <p className="text-foreground/75 font-body text-sm leading-relaxed mb-7 italic font-light line-clamp-6">
                      "{currentReview.text}"
                    </p>
                    <div className="flex items-center gap-3 pt-5 border-t border-bakery-gold/10">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-bakery-gold/30 to-bakery-gold/10 flex items-center justify-center text-accent font-heading font-bold text-sm">
                        {currentReview.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="font-body font-semibold text-sm text-foreground">{currentReview.name}</p>
                        <p className="text-muted-foreground text-xs font-light">{currentReview.role}</p>
                      </div>
                    </div>
                  </motion.button>
                </motion.div>
              </AnimatePresence>
            )}
          </div>

          {len > 1 && (
            <div className="flex justify-center gap-2 mt-6" role="tablist" aria-label="Feedback slides">
              {allFilteredTestimonials.map((t, i) => (
                <button
                  key={`${t.name}-${t.role}-${i}`}
                  type="button"
                  role="tab"
                  aria-selected={i === carouselIndex}
                  onClick={() => goTo(i, i > carouselIndex ? 1 : -1)}
                  className={`h-2 rounded-full transition-all ${
                    i === carouselIndex ? "w-8 bg-accent" : "w-2 bg-bakery-gold/25 hover:bg-bakery-gold/45"
                  }`}
                  aria-label={`Show feedback ${i + 1} of ${len}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Desktop: auto-scrolling strip (no swipe UI) */}
        <div className="hidden md:block overflow-hidden pb-2">
          <motion.div
            className="flex items-stretch gap-6 w-max"
            animate={{ x: isReversed ? ["-50%", "0%"] : ["0%", "-50%"] }}
            transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
          >
            {scrollingTestimonials.map((t, i) => (
              <motion.button
                type="button"
                key={`${t.name}-desktop-${i}`}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 5) * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
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
                <p className="text-foreground/75 font-body text-sm leading-relaxed mb-7 italic font-light line-clamp-4">
                  "{t.text}"
                </p>
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

        {len === 0 && (
          <p className="text-center text-sm text-muted-foreground mt-6">No reviews found for this rating.</p>
        )}

        <div className="flex flex-wrap justify-center gap-3 mt-8">
          <button
            type="button"
            onClick={() => setShowFeedbackModal(true)}
            className="inline-flex items-center justify-center px-5 py-3 rounded-xl border border-bakery-gold/30 text-sm font-body text-foreground/80 hover:text-accent hover:border-bakery-gold/60 transition-colors"
          >
            Add Feedback
          </button>
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
        {showFeedbackModal && (
          <motion.div
            className="fixed inset-0 z-[75] bg-black/45 p-4 sm:p-6 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowFeedbackModal(false)}
          >
            <div className="absolute inset-0 backdrop-blur-md" />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.2 }}
              onClick={(event) => event.stopPropagation()}
              className="card-luxury rounded-3xl p-6 sm:p-8 w-full max-w-md relative z-[1]"
            >
              <button
                type="button"
                onClick={() => setShowFeedbackModal(false)}
                className="absolute top-4 right-4 text-foreground/70 hover:text-accent transition-colors"
                aria-label="Close feedback form"
              >
                <X size={18} />
              </button>
              <h3 className="font-heading text-xl sm:text-2xl text-foreground mb-2">Share Your Feedback</h3>
              <p className="text-sm text-muted-foreground font-body mb-6">
                We read every message. Submit opens WhatsApp with your feedback prefilled.
              </p>
              <form onSubmit={submitFeedback} className="space-y-5">
                <div>
                  <label htmlFor="feedback-name" className="block text-xs font-body font-medium text-foreground/80 mb-1.5">
                    Your name
                  </label>
                  <input
                    id="feedback-name"
                    type="text"
                    value={feedbackName}
                    onChange={(e) => setFeedbackName(e.target.value)}
                    placeholder="e.g. Priya"
                    className="w-full rounded-xl border border-bakery-gold/20 bg-background/50 px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-bakery-gold/30"
                  />
                </div>
                <div>
                  <span className="block text-xs font-body font-medium text-foreground/80 mb-2">Rating</span>
                  <div className="flex gap-1" role="group" aria-label="Star rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFeedbackRating(star)}
                        className="p-1 rounded-lg hover:bg-bakery-gold/10 transition-colors"
                        aria-label={`${star} star${star === 1 ? "" : "s"}`}
                      >
                        <Star
                          size={28}
                          className={
                            star <= feedbackRating ? "fill-accent text-accent" : "text-bakery-gold/25 fill-transparent"
                          }
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label htmlFor="feedback-message" className="block text-xs font-body font-medium text-foreground/80 mb-1.5">
                    Your feedback <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    id="feedback-message"
                    required
                    rows={4}
                    value={feedbackMessage}
                    onChange={(e) => setFeedbackMessage(e.target.value)}
                    placeholder="Tell us about your experience…"
                    className="w-full rounded-xl border border-bakery-gold/20 bg-background/50 px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-bakery-gold/30 resize-y min-h-[100px]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl btn-premium text-primary-foreground text-sm font-body"
                >
                  Submit
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}

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
