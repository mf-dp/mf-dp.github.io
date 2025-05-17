import React from 'react';

export function Background() {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-[-2]">
      <img 
        src="/background.png" 
        alt="Background"
        className="w-full h-full object-cover"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black/70 z-[-1]"></div>
    </div>
  );
}

export default Background;