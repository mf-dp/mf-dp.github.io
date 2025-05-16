import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Conferences } from "@/components/Conferences";

export default function ConferencesPage() {
  return (
    <main 
      className="flex flex-col min-h-screen"
      style={{
        backgroundImage: "url('/backgrounds/conferences-bg.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
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