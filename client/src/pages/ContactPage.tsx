import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Contact } from "@/components/Contact";

export default function ContactPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <SEO 
        title="Contact - Mahdieh Fakhar"
        description="Get in touch with Mahdieh Fakhar for collaboration, speaking engagements, or research opportunities."
      />
      <Header />
      <div className="flex-grow">
        <Contact />
      </div>
      <Footer />
    </main>
  );
}