import React from 'react';
import { Instagram, Youtube, Music2 } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#5c0b08] to-[#903d04] text-white py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
            <img 
              src="/images/logo/L1.png" 
              alt="Logo Pramuka" 
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain hover:scale-110 hover:rotate-3 transition-all duration-300 active:scale-95"
            />
            <div className="flex gap-1 sm:gap-2">
              <img 
                src="/images/logo/L3.png" 
                alt="Logo Putra" 
                className="w-8 h-8 sm:w-10 sm:h-10 object-contain hover:scale-110 hover:rotate-6 transition-all duration-300 active:scale-95"
              />
              <img 
                src="/images/logo/L2.png" 
                alt="Logo Putri" 
                className="w-8 h-8 sm:w-10 sm:h-10 object-contain hover:scale-110 hover:-rotate-6 transition-all duration-300 active:scale-95"
              />
            </div>
            <div className="text-lg sm:text-2xl font-bold hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-white hover:to-orange-200 transition-all duration-300 cursor-default">
              AMBALAN SMAITUQ
            </div>
          </div>
          
          <p className="text-orange-200 mb-4 sm:mb-6 text-base sm:text-lg italic hover:text-white transition-colors duration-300 cursor-default px-2">
            "Satyaku Kudarmakan, Darmaku Kubaktikan"
          </p>
          
          <div className="flex justify-center gap-4 sm:gap-6 mb-6 sm:mb-8">
            <a
              href="https://instagram.com/ambalan_smaituq"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 hover:scale-110 hover:rotate-12 transition-all duration-300 group active:scale-95"
            >
              <Instagram className="w-5 h-5 sm:w-6 sm:h-6 group-hover:animate-bounce" />
            </a>
            <a
              href="https://m.youtube.com/channel/UCBF7Y71LydV27Kkt3ALJ49w"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 hover:scale-110 hover:-rotate-12 transition-all duration-300 group active:scale-95"
            >
              <Youtube className="w-5 h-5 sm:w-6 sm:h-6 group-hover:animate-bounce" />
            </a>
            <a
              href="https://vt.tiktok.com/ZSCmH6cn/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 hover:scale-110 hover:rotate-12 transition-all duration-300 group active:scale-95"
            >
              <Music2 className="w-5 h-5 sm:w-6 sm:h-6 group-hover:animate-bounce" />
            </a>
          </div>
          
          <div className="border-t border-white/20 pt-4 sm:pt-6">
            <p className="text-orange-200 hover:text-white transition-colors duration-300 cursor-default text-sm sm:text-base">
              © 2025 Ambalan SMAITUQ.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;