import Navbar from "@/components/bakery/Navbar";
import Hero from "@/components/bakery/Hero";
import About from "@/components/bakery/About";
import Features from "@/components/bakery/Features";
import Products from "@/components/bakery/Products";
import CustomOrders from "@/components/bakery/CustomOrders";
import Promotions from "@/components/bakery/Promotions";
import Gallery from "@/components/bakery/Gallery";
import Testimonials from "@/components/bakery/Testimonials";
import FAQ from "@/components/bakery/FAQ";
import Contact from "@/components/bakery/Contact";
import Footer from "@/components/bakery/Footer";
import WhatsAppButton from "@/components/bakery/WhatsAppButton";
import ScrollToTop from "@/components/bakery/ScrollToTop";

const Index = () => (
  <>
    <Navbar />
    <Hero />
    <Products />
    <Promotions />
    <About />
    <Features />
    <CustomOrders />
    <Gallery />
    <Testimonials />
    <FAQ />
    <Contact />
    <Footer />
    <WhatsAppButton />
    <ScrollToTop />
  </>
);

export default Index;
