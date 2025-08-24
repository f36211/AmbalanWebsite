import React from 'react';

const GlobalStyles = () => {
  return (
    <style jsx global>{`
      .animate-spin-slow {
        animation: spin 8s linear infinite;
      }
      
      .animate-bounce-slow {
        animation: bounce 3s ease-in-out infinite;
      }
      
      .animate-spin-reverse {
        animation: spin 6s linear infinite reverse;
      }
      
      .duration-2000 {
        transition-duration: 2000ms;
      }
      
      .opacity-10 {
        opacity: 0.1;
      }
      
      .opacity-90 {
        opacity: 0.9;
      }
      
      @keyframes slideInDown {
        from {
          opacity: 0;
          transform: translateY(-10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @media (max-width: 640px) {
        .text-responsive {
          font-size: clamp(1rem, 4vw, 1.5rem);
        }
      }
      
      /* Custom scrollbar for mobile */
      @media (max-width: 768px) {
        ::-webkit-scrollbar {
          width: 4px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #903d04, #5c0b08);
          border-radius: 2px;
        }
      }
    `}</style>
  );
};

export default GlobalStyles;