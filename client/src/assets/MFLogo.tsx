import React from "react";

export const MFLogo = ({ className = "w-10 h-10" }: { className?: string }) => {
  return (
    <div className={className}>
      <img src="/images/logo.png" alt="MF Logo" className="w-full h-full object-contain" style={{ backgroundColor: 'transparent' }} />
    </div>
  );
};