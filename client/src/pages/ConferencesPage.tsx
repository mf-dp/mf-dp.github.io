import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Conferences } from "@/components/Conferences";

export default function ConferencesPage() {
  return (
    <main 
      className="flex flex-col min-h-screen"
      style={{
        backgroundImage: "url('/images/backgrounds/conferences-bg.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat"
      }}
    >
      <SEO 
        title="MAHDIEH FAKHAR - Conferences"
        description="Academic and professional conferences attended and presented by Mahdieh Fakhar."
        keywords="conferences, academic conferences, technology conferences, data science conferences, professional events"
        ogImage="/images/conferences/Conference/2019.11.20-21.jpg"
      />
      <Header />
      <div className="flex-grow">
        <Conferences />
      </div>
      <Footer />
    </main>
  );
}