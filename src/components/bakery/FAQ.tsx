import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "Do you offer eggless or vegan options?", a: "Yes! We have a wide range of eggless cakes and pastries. Vegan options are available on request — just let us know via WhatsApp." },
  { q: "How far in advance should I order a custom cake?", a: "We recommend placing custom cake orders at least 48 hours in advance. For elaborate wedding or event cakes, 1-2 weeks notice is ideal." },
  { q: "Do you deliver?", a: "Yes, we deliver within a 15 km radius. Delivery charges apply based on distance. Same-day delivery is available for select items." },
  { q: "What payment methods do you accept?", a: "We accept cash, UPI, bank transfers, and all major credit/debit cards. Payment can be made at the time of order or delivery." },
  { q: "Can I customize flavors and designs?", a: "Absolutely! Share your vision via WhatsApp with reference images, and our team will bring it to life. We love creative challenges!" },
  { q: "Are your ingredients organic?", a: "We use organic flour and locally sourced dairy. All our ingredients are fresh, preservative-free, and of the highest quality." },
];

const FAQ = () => (
  <section id="faq" className="section-padding section-theme-faq relative overflow-hidden">
    <div className="absolute top-0 left-0 right-0 premium-divider" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--bakery-gold)/0.05),transparent)]" />

    <div className="max-w-3xl mx-auto relative">
      <SectionHeading subtitle="FAQ" title="Frequently Asked Questions" description="Everything you need to know about ordering from us." />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <AccordionItem
                value={`faq-${i}`}
                className="card-luxury rounded-2xl px-6 lg:px-8 data-[state=open]:luxury-shadow transition-all duration-500 overflow-hidden"
              >
                <AccordionTrigger className="font-heading text-base lg:text-lg font-semibold text-foreground hover:no-underline py-6 hover:text-accent transition-colors">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground font-body text-sm leading-relaxed pb-6 font-light">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </motion.div>
    </div>
  </section>
);

export default FAQ;
