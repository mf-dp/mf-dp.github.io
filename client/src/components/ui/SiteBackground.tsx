import React from 'react';
import backgroundImage from '@/assets/background/site-background.png';

export function SiteBackground() {
  return (
    <div 
      className="fixed inset-0 z-[-10] w-full h-full"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay for better readability */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-[1px]"
      />
    </div>
  );
}

export default SiteBackground;