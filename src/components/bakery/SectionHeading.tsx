import { motion } from "framer-motion";

interface SectionHeadingProps {
  subtitle?: string;
  title: string;
  description?: string;
  centered?: boolean;
  light?: boolean;
}

const SectionHeading = ({ subtitle, title, description, centered = true, light = false }: SectionHeadingProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    className={`mb-14 lg:mb-20 ${centered ? "text-center" : ""}`}
  >
    {subtitle && (
      <motion.span
        initial={{ opacity: 0, letterSpacing: "0.1em" }}
        whileInView={{ opacity: 1, letterSpacing: "0.25em" }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
        className={`inline-block font-body text-xs uppercase mb-4 ${light ? "text-bakery-gold/80" : "gold-text font-semibold"}`}
      >
        ✦ {subtitle} ✦
      </motion.span>
    )}
    <h2 className={`text-3xl sm:text-4xl lg:text-5xl xl:text-[3.5rem] font-heading font-bold leading-tight tracking-tight ${light ? "text-bakery-cream" : "text-foreground"}`}>
      {title}
    </h2>
    {description && (
      <p className={`mt-5 font-body max-w-2xl ${centered ? "mx-auto" : ""} text-base lg:text-lg leading-relaxed font-light ${light ? "text-bakery-cream/70" : "text-muted-foreground"}`}>
        {description}
      </p>
    )}
    <div className={`mt-5 premium-divider w-20 ${centered ? "mx-auto" : ""}`} />
  </motion.div>
);

export default SectionHeading;
