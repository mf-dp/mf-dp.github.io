import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="background-container">
      {children}
      <style>{`
        .background-container {
          min-height: 100vh;
        }
        
        body {
          background-image: url('/images/background.jpg');
          background-size: cover;
          background-attachment: fixed;
          background-position: center;
          position: relative;
        }
        
        body::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.75);
          z-index: -1;
        }
        
        /* Improve card appearance */
        .card {
          background-color: rgba(239, 246, 255, 0.9) !important;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1) !important;
          transition: all 0.3s ease;
        }
        
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
        }
      `}</style>
    </div>
  );
}

export default Layout;