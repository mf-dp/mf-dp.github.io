import React from "react";

export const MFLogo = ({ className = "w-10 h-10" }: { className?: string }) => {
  return (
    <img 
      src="/src/assets/MFLogo.png" 
      alt="MAHDIEH FAKHAR Logo" 
      className={className} 
    />
  );
};
