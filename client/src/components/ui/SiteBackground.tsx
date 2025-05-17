import React from 'react';

export function SiteBackground() {
  return (
    <div className="fixed inset-0 z-[-10] w-full h-full">
      <img 
        src="/images/site-background.png"
        alt="Site Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-[1px]" />
    </div>
  );
}

export default SiteBackground;