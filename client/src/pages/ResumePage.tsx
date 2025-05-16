import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Resume } from "@/components/Resume";

export default function ResumePage() {
  return (
    <main 
      className="flex flex-col min-h-screen"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=1920&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        backgroundBlendMode: "overlay",
        backgroundColor: "rgba(255, 255, 255, 0.92)"
      }}
    >
      <SEO 
        title="MAHDIEH FAKHAR - Resume"
        description="Professional resume of Mahdieh Fakhar, highlighting education, experience, and achievements."
      />
      <Header />
      <div className="flex-grow">
        <Resume />
      </div>
      <Footer />
    </main>
  );
}