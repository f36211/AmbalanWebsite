import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ArrowRight, X } from 'lucide-react';
import { materiPramukaData } from '../data/index.js';
// Sample data - you can import this from your index.js file


const MateriPramukaPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const { materials } = materiPramukaData;

  const materialsPerPage = 3;
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
      {/* Background SVG - Only for this page content */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/imags/materi.svg" 
          alt="Background" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content - Adjusted positioning to center cards better */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center px-4 py-8">
        <div className="max-w-6xl mx-auto w-full">
          {/* Optional Title Section - Uncomment if you want to show title */}
          {/* 
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#5c0b08] mb-4">
              {materiPramukaData.title}
            </h1>
            <p className="text-lg text-gray-700">
              {materiPramukaData.subtitle}
            </p>
          </div>
          */}

          {/* Materials Grid */}
          <motion.div 
            key={currentPage}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center gap-8 mb-12"
          >
            {currentMaterials.map((material, index) => (
              <motion.div
                key={material.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1
                }}
                className="group cursor-pointer"
                onClick={() => openModal(material)}
              >
                <div className="w-64 h-96 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-white/20 hover:scale-105 flex flex-col">
                  {/* Image Section */}
                  <div className="relative h-48 overflow-hidden flex-shrink-0">
                    <img
                      src={material.image}
                      alt={material.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    
                    {/* Material Number */}
                    <div className="absolute top-3 left-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-[#5c0b08] to-[#903d04] rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-white text-sm font-bold">{material.id}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-[#5c0b08] mb-3 group-hover:text-[#903d04] transition-colors duration-300 leading-tight">
                      {material.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
                      {material.description}
                    </p>

                    {/* Action Button */}
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#903d04] to-[#5c0b08] text-white rounded-xl font-medium hover:from-[#5c0b08] hover:to-[#903d04] transition-all duration-300 shadow-md hover:shadow-lg text-sm mt-auto">
                      <BookOpen className="w-4 h-4" />
                      Buka Materi
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 sm:gap-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={prevPage}
              className="px-4 py-2 sm:px-5 sm:py-2.5 bg-white/80 backdrop-blur-sm text-[#903d04] hover:text-white hover:bg-gradient-to-r hover:from-[#903d04] hover:to-[#5c0b08] font-medium transition-all duration-300 rounded-full shadow-lg border border-white/30 text-sm sm:text-base"
            >
              ← Prev
            </motion.button>
            
            <div className="flex gap-1.5 sm:gap-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                    index === currentPage
                      ? 'bg-gradient-to-r from-[#903d04] to-[#5c0b08] scale-125'
                      : 'bg-white/60 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextPage}
              className="px-4 py-2 sm:px-5 sm:py-2.5 bg-white/80 backdrop-blur-sm text-[#903d04] hover:text-white hover:bg-gradient-to-r hover:from-[#903d04] hover:to-[#5c0b08] font-medium transition-all duration-300 rounded-full shadow-lg border border-white/30 text-sm sm:text-base"
            >
              Next →
            </motion.button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedMaterial && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="relative bg-white rounded-3xl max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 shadow-lg"
              >
                <X className="w-5 h-5 text-gray-700" />
              </button>

              {/* Modal Header */}
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-[#5c0b08]">{selectedMaterial.title}</h2>
                <p className="text-gray-600 mt-2">{selectedMaterial.description}</p>
              </div>

              {/* SVG Presentation Content */}
              <div className="p-6 overflow-auto max-h-[60vh]">
                <div className="w-full h-96 bg-gray-100 rounded-2xl flex items-center justify-center">
                  <img
                    src={selectedMaterial.presentationSvg}
                    alt={`${selectedMaterial.title} Presentation`}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="hidden flex-col items-center justify-center text-gray-500">
                    <BookOpen className="w-12 h-12 mb-2" />
                    <p>Presentasi {selectedMaterial.title}</p>
                    <p className="text-sm mt-2 text-center px-4">{selectedMaterial.content}</p>
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