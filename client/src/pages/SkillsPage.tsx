import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Skills } from "@/components/Skills";

export default function SkillsPage() {
  return (
    <main 
      className="flex flex-col min-h-screen"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=1920&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        backgroundBlendMode: "overlay",
        backgroundColor: "rgba(255, 255, 255, 0.92)"
      }}
    >
      <SEO 
        title="MAHDIEH FAKHAR - Skills"
        description="Explore the technical and professional skills of Mahdieh Fakhar in data science and big data."
      />
      <Header />
      <div className="flex-grow">
        <Skills />
      </div>
      <Footer />
    </main>
  );
}