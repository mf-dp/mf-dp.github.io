import React from 'react';
import backgroundImage from '../assets/ai-background.png';

export function Background() {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full overflow-hidden">
      <img 
        src={backgroundImage} 
        alt="Background" 
        className="h-full w-full object-cover"
        style={{ opacity: 0.8 }}
      />
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>
    </div>
  );
}

export default Background;