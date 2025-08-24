import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SeragamPramuka = () => {
  const images = [
    {
      src: '/images/imags/pramuka.jpg',
      alt: 'Seragam Pramuka',
      title: 'Seragam Pramuka'
    },
    {
      src: '/images/imags/ambalan.jpg',
      alt: 'Seragam Ambalan', 
      title: 'Seragam Ambalan'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Preload images
  useEffect(() => {
    const preloadImages = async () => {
      const promises = images.map(img => {
        return new Promise((resolve) => {
          const image = new Image();
          image.onload = resolve;
          image.onerror = resolve;
          image.src = img.src;
        });
      });
      
      await Promise.all(promises);
      setIsLoading(false);
    };

    preloadImages();
  }, []);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Touch handling for mobile
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentIndex < images.length - 1) nextSlide();
    if (isRightSwipe && currentIndex > 0) prevSlide();
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft' && currentIndex > 0) prevSlide();
      if (e.key === 'ArrowRight' && currentIndex < images.length - 1) nextSlide();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentIndex]);

  if (isLoading) {
    return (
      <div className="h-screen w-full bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center space-y-4"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-2 border-amber-600 border-t-transparent rounded-full"
          />
          <p className="text-sm text-gray-600 font-medium">Loading...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-white flex flex-col overflow-hidden">
      
      {/* Minimal Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-shrink-0 px-6 py-4 border-b border-gray-100"
      >
        <div className="flex items-center justify-between">
          <motion.h1 
            key={currentIndex}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-semibold text-gray-900"
          >
            {images[currentIndex].title}
          </motion.h1>
          
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>{currentIndex + 1}</span>
            <span>/</span>
            <span>{images.length}</span>
          </div>
        </div>
      </motion.div>

      {/* Main Image Area */}
      <div className="flex-1 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30,
              opacity: { duration: 0.2 }
            }}
            className="absolute inset-0 flex items-center justify-center p-6"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <motion.img
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 }}
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons - Desktop */}
        <AnimatePresence>
          {currentIndex > 0 && (
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={prevSlide}
              className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {currentIndex < images.length - 1 && (
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextSlide}
              className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Mobile Touch Areas */}
        <div className="md:hidden absolute inset-0 flex">
          <button 
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="flex-1"
          />
          <button 
            onClick={nextSlide}
            disabled={currentIndex === images.length - 1}
            className="flex-1"
          />
        </div>
      </div>

      {/* Bottom Indicators */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-shrink-0 px-6 py-4 border-t border-gray-100"
      >
        <div className="flex justify-center space-x-3">
          {images.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentIndex 
                  ? 'bg-amber-600 w-6' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
        
        {/* Subtle Help Text */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center text-xs text-gray-400 mt-3"
        >
          <span className="md:hidden">Swipe or tap to navigate</span>
          <span className="hidden md:inline">Use arrow keys or click to navigate</span>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default SeragamPramuka;