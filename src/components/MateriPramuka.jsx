import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ArrowRight, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { materiPramukaData } from '../data/index.js';

const MateriPramukaPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const { materials } = materiPramukaData;

  // Detect mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mobile: 1 card per page, Desktop: 3 cards per page
  const materialsPerPage = isMobile ? 1 : 3;
  const totalPages = Math.ceil(materials.length / materialsPerPage);
  const currentMaterials = materials.slice(
    currentPage * materialsPerPage,
    (currentPage + 1) * materialsPerPage
  );

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const openModal = (material) => {
    setSelectedMaterial(material);
  };

  const closeModal = () => {
    setSelectedMaterial(null);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background SVG - Centered for better text visibility */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/imags/materi.svg" 
          alt="Background" 
          className="w-full h-full object-cover object-center"
          style={{ objectPosition: 'center center' }}
          loading="lazy"
          decoding="async"
        />
        {/* Subtle overlay for mobile text readability */}
        {isMobile && (
          <div className="absolute inset-0 bg-white/5 backdrop-blur-[0.5px]"></div>
        )}
      </div>

      {/* Content - Mobile optimized spacing */}
      <div className={`relative z-10 min-h-screen flex flex-col justify-center ${isMobile ? 'px-3 py-6' : 'px-4 py-8'}`}>
        <div className="max-w-6xl mx-auto w-full">
          {/* Materials Grid */}
          <motion.div 
            key={currentPage}
            initial={isMobile ? { opacity: 0 } : { opacity: 0, x: 100 }}
            animate={isMobile ? { opacity: 1 } : { opacity: 1, x: 0 }}
            exit={isMobile ? { opacity: 0 } : { opacity: 0, x: -100 }}
            transition={{ duration: isMobile ? 0.3 : 0.5 }}
            className={`flex justify-center ${isMobile ? 'mb-8' : 'gap-8 mb-12'}`}
          >
            {currentMaterials.map((material, index) => (
              <motion.div
                key={material.id}
                initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: isMobile ? 0.3 : 0.6, 
                  delay: isMobile ? 0 : index * 0.1
                }}
                className="group cursor-pointer"
                onClick={() => openModal(material)}
              >
                <div className={`${
                  isMobile 
                    ? 'w-80 max-w-[90vw] h-[480px]' 
                    : 'w-64 h-96'
                } bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-white/20 hover:scale-105 flex flex-col`}>
                  {/* Image Section */}
                  <div className={`relative ${isMobile ? 'h-56' : 'h-48'} overflow-hidden flex-shrink-0`}>
                    <img
                      src={material.image}
                      alt={material.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    
                    {/* Material Number */}
                    <div className="absolute top-3 left-3">
                      <div className={`${isMobile ? 'w-10 h-10' : 'w-8 h-8'} bg-gradient-to-r from-[#5c0b08] to-[#903d04] rounded-full flex items-center justify-center shadow-lg`}>
                        <span className={`text-white ${isMobile ? 'text-base' : 'text-sm'} font-bold`}>{material.id}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <div className={`${isMobile ? 'p-6' : 'p-5'} flex flex-col flex-1`}>
                    <h3 className={`${isMobile ? 'text-xl mb-4' : 'text-lg mb-3'} font-bold text-[#5c0b08] group-hover:text-[#903d04] transition-colors duration-300 leading-tight`}>
                      {material.title}
                    </h3>
                    
                    <p className={`text-gray-600 ${isMobile ? 'text-base mb-6 line-clamp-4' : 'text-sm mb-4 line-clamp-3'} flex-1`}>
                      {material.description}
                    </p>

                    {/* Action Button */}
                    <button className={`w-full flex items-center justify-center gap-2 ${isMobile ? 'px-5 py-4 text-base' : 'px-4 py-3 text-sm'} bg-gradient-to-r from-[#903d04] to-[#5c0b08] text-white rounded-xl font-medium hover:from-[#5c0b08] hover:to-[#903d04] transition-all duration-300 shadow-md hover:shadow-lg mt-auto`}>
                      <BookOpen className={`${isMobile ? 'w-5 h-5' : 'w-4 h-4'}`} />
                      Buka Materi
                      <ArrowRight className={`${isMobile ? 'w-5 h-5' : 'w-4 h-4'}`} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Navigation - Mobile optimized */}
          <div className={`flex justify-center items-center ${isMobile ? 'gap-6' : 'gap-4 sm:gap-6'}`}>
            <motion.button
              whileHover={{ scale: isMobile ? 1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={prevPage}
              className={`${
                isMobile 
                  ? 'w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-xl' 
                  : 'px-4 py-2 sm:px-5 sm:py-2.5 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-white/30 text-sm sm:text-base'
              } text-[#903d04] hover:text-white hover:bg-gradient-to-r hover:from-[#903d04] hover:to-[#5c0b08] font-medium transition-all duration-300`}
            >
              {isMobile ? <ChevronLeft className="w-6 h-6" /> : '← Prev'}
            </motion.button>
            
            <div className={`flex ${isMobile ? 'gap-3' : 'gap-1.5 sm:gap-2'}`}>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`${
                    isMobile ? 'w-4 h-4' : 'w-2.5 h-2.5 sm:w-3 sm:h-3'
                  } rounded-full transition-all duration-300 ${
                    index === currentPage
                      ? 'bg-gradient-to-r from-[#903d04] to-[#5c0b08] scale-125'
                      : 'bg-white/60 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: isMobile ? 1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextPage}
              className={`${
                isMobile 
                  ? 'w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-xl' 
                  : 'px-4 py-2 sm:px-5 sm:py-2.5 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-white/30 text-sm sm:text-base'
              } text-[#903d04] hover:text-white hover:bg-gradient-to-r hover:from-[#903d04] hover:to-[#5c0b08] font-medium transition-all duration-300`}
            >
              {isMobile ? <ChevronRight className="w-6 h-6" /> : 'Next →'}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Modal - Enhanced for mobile */}
      <AnimatePresence>
        {selectedMaterial && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-50 flex items-center justify-center ${isMobile ? 'p-3' : 'p-4'} bg-black/70 backdrop-blur-sm`}
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className={`relative bg-white rounded-3xl ${
                isMobile 
                  ? 'w-full max-w-sm max-h-[85vh]' 
                  : 'max-w-4xl max-h-[90vh]'
              } overflow-hidden shadow-2xl`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className={`absolute top-3 right-3 z-10 ${
                  isMobile ? 'w-12 h-12' : 'w-10 h-10'
                } bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 shadow-lg`}
              >
                <X className={`${isMobile ? 'w-6 h-6' : 'w-5 h-5'} text-gray-700`} />
              </button>

              {/* Modal Header */}
              <div className={`${isMobile ? 'p-5 pr-16' : 'p-6'} border-b border-gray-200`}>
                <h2 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-[#5c0b08]`}>{selectedMaterial.title}</h2>
                <p className={`text-gray-600 mt-2 ${isMobile ? 'text-sm' : 'text-base'}`}>{selectedMaterial.description}</p>
              </div>

              {/* SVG Presentation Content - Bigger on mobile for readability */}
              <div className={`${isMobile ? 'p-3' : 'p-6'} overflow-auto ${isMobile ? 'max-h-[70vh]' : 'max-h-[60vh]'}`}>
                <div className={`w-full ${
                  isMobile ? 'h-80' : 'h-96'
                } bg-gray-100 rounded-2xl flex items-center justify-center`}>
                  <img
                    src={selectedMaterial.presentationSvg}
                    alt={`${selectedMaterial.title} Presentation`}
                    className={`w-full h-full object-contain ${isMobile ? 'p-1' : 'p-2'}`}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="hidden flex-col items-center justify-center text-gray-500">
                    <BookOpen className={`${isMobile ? 'w-8 h-8' : 'w-12 h-12'} mb-2`} />
                    <p className={isMobile ? 'text-sm' : 'text-base'}>Presentasi {selectedMaterial.title}</p>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} mt-2 text-center px-4`}>{selectedMaterial.content}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MateriPramukaPage;