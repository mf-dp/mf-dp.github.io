import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Contact } from "@/components/Contact";

export default function ContactPage() {
  return (
    <main 
      className="flex flex-col min-h-screen"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1596524430615-b46475ddff6e?q=80&w=1920&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        backgroundBlendMode: "overlay",
        backgroundColor: "rgba(255, 255, 255, 0.92)"
      }}
    >
      <SEO 
        title="MAHDIEH FAKHAR - Contact"
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