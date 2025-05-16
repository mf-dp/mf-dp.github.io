import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Articles } from "@/components/Articles";

export default function ArticlesPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <SEO 
        title="Articles - Mahdieh Fakhar"
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