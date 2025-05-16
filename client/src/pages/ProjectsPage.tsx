import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Projects } from "@/components/Projects";

export default function ProjectsPage() {
  return (
    <main 
      className="flex flex-col min-h-screen"
      style={{
        backgroundImage: "url('/backgrounds/projects-bg.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
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