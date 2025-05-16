import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: "url('/backgrounds/home-bg.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    >
      <SEO 
        title="MAHDIEH FAKHAR - Page Not Found"
        description="The requested page was not found on Mahdieh Fakhar's website."
      />
      <Header />
      
      <div className="flex-grow flex items-center justify-center">
        <Card className="w-full max-w-md mx-4 shadow-lg border-0">
          <CardContent className="pt-6 pb-6">
            <div className="flex flex-col items-center text-center">
              <AlertCircle className="h-16 w-16 text-blue-500 mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-2">404 Page Not Found</h1>
              <p className="mt-2 text-gray-600 mb-6">
                The page you're looking for doesn't exist or has been moved.
              </p>
              <Link href="/">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Return to Home Page
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
}
