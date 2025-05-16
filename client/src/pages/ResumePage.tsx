import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Resume } from "@/components/Resume";

export default function ResumePage() {
  return (
    <main 
      className="flex flex-col min-h-screen"
      style={{
        backgroundImage: "url('/backgrounds/resume-bg.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
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