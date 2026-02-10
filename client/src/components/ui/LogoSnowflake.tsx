import React from 'react';

export const LogoSnowflake = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => {
  const Arm = () => (
    <>
      <path d="M256 256 L256 80" />
      <path d="M256 130 L226 160" />
      <path d="M256 130 L286 160" />
    </>
  );

  return (
    <svg 
      viewBox="0 0 512 512" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="28" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className} 
      {...props}
    >
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <g key={deg} transform={`rotate(${deg} 256 256)`}>
          <Arm />
        </g>
      ))}
    </svg>
  );
};
