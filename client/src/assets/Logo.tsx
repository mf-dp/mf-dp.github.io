import React from "react";

export const Logo = ({ className = "w-6 h-6" }: { className?: string }) => {
  return (
    <svg className={className} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="256" cy="256" r="256" fill="url(#paint0_linear)" />
      <path
        d="M384 256C384 326.692 326.692 384 256 384C185.308 384 128 326.692 128 256C128 185.308 185.308 128 256 128C326.692 128 384 185.308 384 256Z"
        stroke="white"
        strokeWidth="24"
      />
      <path
        d="M318.336 214.656L256 277.023L193.664 214.656"
        stroke="white"
        strokeWidth="24"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="0"
          y1="0"
          x2="512"
          y2="512"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3B82F6" />
          <stop offset="1" stopColor="#2563EB" />
        </linearGradient>
      </defs>
    </svg>
  );
};
