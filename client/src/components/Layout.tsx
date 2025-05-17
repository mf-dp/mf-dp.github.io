import React, { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="background-container">
      <div className="content-wrapper">
        <Header />
        <main className="content">
          {children}
        </main>
        <Footer />
      </div>
      <style jsx global>{`
        :root {
          --overlay-opacity: 0.6;
        }
        
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
        
        /* Fixed background with the AI image */
        body {
          background-image: url('/images/ai-background.png');
          background-size: cover;
          background-attachment: fixed;
          background-position: center;
          background-repeat: no-repeat;
          position: relative;
        }
        
        /* Semi-transparent overlay to improve content visibility */
        body::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, var(--overlay-opacity));
          z-index: 0;
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
        [data-theme="dark"] {
          --overlay-opacity: 0.75;
        }
        
        [data-theme="dark"] .card {
          background-color: rgba(30, 41, 59, 0.8) !important;
        }
      `}</style>
    </div>
  );
}

export default Layout;