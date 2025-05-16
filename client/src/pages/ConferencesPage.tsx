import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Conferences } from "@/components/Conferences";

export default function ConferencesPage() {
  return (
    <main 
      className="flex flex-col min-h-screen"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1920&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        backgroundBlendMode: "overlay",
        backgroundColor: "rgba(255, 255, 255, 0.92)"
      }}
    >
      <SEO 
        title="MAHDIEH FAKHAR - Conferences"
        description="Academic and professional conferences attended and presented by Mahdieh Fakhar."
      />
      <Header />
      <div className="flex-grow">
        <Conferences />
      </div>
      <Footer />
    </main>
  );
}