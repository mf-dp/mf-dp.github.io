import React, { ReactNode } from 'react';

interface BackgroundWrapperProps {
  children: ReactNode;
}

export function BackgroundWrapper({ children }: BackgroundWrapperProps) {
  return (
    <div className="site-wrapper">
      {children}
      <style>{`
        .site-wrapper {
          position: relative;
          min-height: 100vh;
          z-index: 1;
        }
        
        body {
          background-image: url('/background-image.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          background-attachment: fixed;
          position: relative;
        }
        
        body::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.75);
          z-index: -1;
        }
      `}</style>
    </div>
  );
}

export default BackgroundWrapper;