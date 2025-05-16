import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Projects } from "@/components/Projects";

export default function ProjectsPage() {
  return (
    <main 
      className="flex flex-col min-h-screen"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=1920&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        backgroundBlendMode: "overlay",
        backgroundColor: "rgba(255, 255, 255, 0.92)"
      }}
    >
      <SEO 
        title="MAHDIEH FAKHAR - Projects"
        description="Research projects and professional work by Mahdieh Fakhar in data science and big data analysis."
      />
      <Header />
      <div className="flex-grow">
        <Projects />
      </div>
      <Footer />
    </main>
  );
}