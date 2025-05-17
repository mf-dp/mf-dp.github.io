import React, { ReactNode, useEffect } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  useEffect(() => {
    // Apply background styles directly to the document when component mounts
    document.body.style.backgroundImage = "url('/images/ai-background.png')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.position = "relative";
    
    // Create overlay for body if it doesn't exist
    const existingOverlay = document.getElementById('body-overlay');
    if (!existingOverlay) {
      const overlay = document.createElement('div');
      overlay.id = 'body-overlay';
      overlay.style.position = 'fixed';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.width = '100%';
      overlay.style.height = '100%';
      overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
      overlay.style.zIndex = '0';
      overlay.style.pointerEvents = 'none';
      document.body.appendChild(overlay);
    }
    
    // Cleanup function to remove styles when component unmounts
    return () => {
      document.body.style.backgroundImage = "";
      const overlay = document.getElementById('body-overlay');
      if (overlay) {
        document.body.removeChild(overlay);
      }
    };
  }, []);

  return (
    <div className="background-container">
      <div className="content-wrapper">
        <Header />
        <main className="content">
          {children}
        </main>
        <Footer />
      </div>
      <style>
        {`
          html, body {
            margin: 0;
            padding: 0;
            height: 100%;
            width: 100%;
          }
          
          .background-container {
            min-height: 100vh;
            width: 100%;
            position: relative;
          }
          
          .content-wrapper {
            position: relative;
            z-index: 10;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
          }
          
          .content {
            flex: 1;
          }
          
          /* Improve card appearance */
          .card {
            background-color: rgba(255, 255, 255, 0.8) !important;
            backdrop-filter: blur(5px);
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1) !important;
            transition: all 0.3s ease;
            border: 1px solid rgba(255, 255, 255, 0.2);
          }
          
          .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
          }
          
          /* Dark mode adjustments */
          [data-theme="dark"] .card {
            background-color: rgba(30, 41, 59, 0.8) !important;
          }
        `}
      </style>
    </div>
  );
}

export default Layout;