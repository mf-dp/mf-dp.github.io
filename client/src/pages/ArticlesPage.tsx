import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Articles } from "@/components/Articles";

export default function ArticlesPage() {
  return (
    <main 
      className="flex flex-col min-h-screen"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1920&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        backgroundBlendMode: "overlay",
        backgroundColor: "rgba(255, 255, 255, 0.92)"
      }}
    >
      <SEO 
        title="MAHDIEH FAKHAR - Articles"
        description="Academic and research articles published by Mahdieh Fakhar in the field of data science and bibliometrics."
      />
      <Header />
      <div className="flex-grow">
        <Articles />
      </div>
      <Footer />
    </main>
  );
}