import { About } from "@/components/About";
import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function AboutPage() {
  return (
    <main 
      className="flex flex-col min-h-screen"
      style={{
        backgroundImage: "url('/backgrounds/about-bg.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    >
      <SEO 
        title="MAHDIEH FAKHAR - About"
        description="Learn about Mahdieh Fakhar, a Data Science and Big Data Specialist."
      />
      <Header />
      <div className="flex-grow">
        <About />
      </div>
      <Footer />
    </main>
  );
}