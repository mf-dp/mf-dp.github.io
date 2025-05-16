import React from "react";

export const MFLogo = ({ className = "w-6 h-6" }: { className?: string }) => {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="12" className="fill-primary" />
      <path 
        d="M7 7H9.5L12 13L14.5 7H17V17H15V10L12.5 16H11.5L9 10V17H7V7Z" 
        fill="white" 
      />
    </svg>
  );
};
