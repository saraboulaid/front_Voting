import React from 'react';

function HelpIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
     style={{color:'rgb(207, 200, 207)',fontSize:'18px'}} 
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="14" />
      <line x1="12" y1="10" x2="12" y2="8" />
    </svg>
  );
}

export default HelpIcon;
