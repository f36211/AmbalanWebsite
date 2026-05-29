import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

const SeragamPramuka = () => {
  const images = [
    {
      src: '/images/imags/pramuka.webp',
      alt: 'Seragam Pramuka Lengkap',
      title: 'Seragam Pramuka',
      description: 'Seragam harian pramuka penegak terdiri dari kemeja lengan pendek cokelat muda, celana/rok cokelat tua, hasduk, dan topi baret. Atribut dipasang sesuai ketentuan Kwarnas.',
    },
    {
      src: '/images/imags/ambalan.webp',
      alt: 'Seragam Ambalan',
      title: 'Seragam Ambalan',
      description: 'Seragam khas Ambalan SMAIT Ummul Quro dilengkapi identitas ambalan, badge sangga, dan tanda pengenal gugus depan. Digunakan pada kegiatan resmi ambalan.',
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Touch handling
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50 && currentIndex < images.length - 1) nextSlide();
    if (distance < -50 && currentIndex > 0) prevSlide();
    setTouchStart(0);
    setTouchEnd(0);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft' && currentIndex > 0) prevSlide();
      if (e.key === 'ArrowRight' && currentIndex < images.length - 1) nextSlide();
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentIndex, nextSlide, prevSlide, images.length]);

  const current = images[currentIndex];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      
      {/* Header bar */}
      <div className="flex-shrink-0 px-4 sm:px-6 py-4 border-b border-gray-100">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/materi-pramuka"
              className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </Link>
            <div>
              <motion.h1 
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-lg sm:text-xl font-bold text-gray-900"
              >
                {current.title}
              </motion.h1>
            </div>
          </div>
          
          <span className="text-sm text-gray-500 font-mono">
            {currentIndex + 1} / {images.length}
          </span>
        </div>
      </div>

      {/* Main content — image + description */}
      <div className="flex-1 flex flex-col lg:flex-row">
        
        {/* Image area */}
        <div className="flex-1 relative bg-gray-50 flex items-center justify-center min-h-[300px] lg:min-h-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ type: "spring", stiffness: 300, damping: 30, opacity: { duration: 0.15 } }}
              className="absolute inset-0 flex items-center justify-center p-4 sm:p-8"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <img
                src={current.src}
                alt={current.alt}
                className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
                draggable={false}
              />
            </motion.div>
          </AnimatePresence>

          {/* Desktop navigation buttons */}
          {currentIndex > 0 && (
            <button
              onClick={prevSlide}
              className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
          )}
          {currentIndex < images.length - 1 && (
            <button
              onClick={nextSlide}
              className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          )}
        </div>

        {/* Info panel — description + context */}
        <div className="lg:w-[360px] flex-shrink-0 border-t lg:border-t-0 lg:border-l border-gray-100 bg-white">
          <div className="p-5 sm:p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Info className="w-4 h-4 text-[#903d04]" />
                  <h2 className="text-sm font-bold text-[#903d04] uppercase tracking-wider">
                    Keterangan
                  </h2>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed mb-6">
                  {current.description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Slide selector */}
            <div className="space-y-2">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-full text-left px-4 py-3 rounded-xl border transition-all flex items-center gap-3 ${
                    index === currentIndex
                      ? 'bg-orange-50 border-orange-200 text-[#5c0b08]'
                      : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                    index === currentIndex
                      ? 'bg-[#5c0b08] text-white'
                      : 'bg-gray-100 text-gray-500'
                  }`}>
                    {index + 1}
                  </div>
                  <span className="text-sm font-semibold">{img.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile bottom nav */}
      <div className="lg:hidden flex-shrink-0 px-6 py-3 border-t border-gray-100 flex justify-center gap-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-200 ${
              index === currentIndex 
                ? 'bg-[#903d04] w-8' 
                : 'bg-gray-300 w-2 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default SeragamPramuka;