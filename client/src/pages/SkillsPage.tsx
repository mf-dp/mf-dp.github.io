import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Skills } from "@/components/Skills";

export default function SkillsPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <SEO 
        title="Skills - Mahdieh Fakhar"
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