import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Award } from 'lucide-react';

const AchievementsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const achievements = [
    {
      id: 1,
      src: '/images/imags/0004.svg',
      alt: 'Pencapaian Ambalan',
      title: 'Pencapaian Ambalan',
      description: 'Pencapaian Ambalan'
    },
    {
      id: 2,
      src: '/images/imags/0005.svg',
      alt: 'Pencapaian Ambalan',
      title: 'Pencapaian Ambalan',
      description: 'Pencapaian Ambalan'
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % achievements.length);
    }, 8000); // Auto slide every 8 seconds

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % achievements.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + achievements.length) % achievements.length);
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

    if (isLeftSwipe) nextSlide();
    if (isRightSwipe) prevSlide();
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'Escape') return;
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen w-full bg-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center space-y-4"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-3 border-[#903d04] border-t-transparent rounded-full"
          />
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-[#903d04]" />
            <p className="text-lg text-[#5c0b08] font-semibold">Loading Achievements...</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-white flex flex-col overflow-hidden relative">
      
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-orange-100/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-amber-100/40 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-orange-100/30 rounded-full blur-lg"></div>
      </div>

      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex-shrink-0 px-6 py-6 bg-white/80 backdrop-blur-sm border-b border-orange-100"
      >
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center space-x-3">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              className="p-2 bg-gradient-to-r from-[#5c0b08] to-[#903d04] rounded-full"
            >
              <Award className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <motion.h1 
                key={currentIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="text-2xl md:text-3xl font-bold text-[#5c0b08]"
              >
                {achievements[currentIndex].title}
              </motion.h1>
              <motion.p
                key={`desc-${currentIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="text-sm text-gray-600 mt-1"
              >
                {achievements[currentIndex].description}
              </motion.p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 px-3 py-2 bg-white/60 rounded-full border border-orange-100">
              <span className="text-sm font-medium text-[#5c0b08]">{currentIndex + 1}</span>
              <div className="w-1 h-1 bg-[#903d04] rounded-full"></div>
              <span className="text-sm text-[#903d04]">{achievements.length}</span>
            </div>
            
            {/* Navigation Buttons */}
            <div className="hidden md:flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(92, 11, 8, 0.05)' }}
                whileTap={{ scale: 0.95 }}
                onClick={prevSlide}
                className="p-2 rounded-full bg-white/60 border border-orange-100 hover:border-orange-200 transition-all duration-200"
              >
                <ChevronLeft className="w-5 h-5 text-[#5c0b08]" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(92, 11, 8, 0.05)' }}
                whileTap={{ scale: 0.95 }}
                onClick={nextSlide}
                className="p-2 rounded-full bg-white/60 border border-orange-100 hover:border-orange-200 transition-all duration-200"
              >
                <ChevronRight className="w-5 h-5 text-[#5c0b08]" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main SVG Display Area */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95, x: 100 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.95, x: -100 }}
            transition={{ 
              type: "spring", 
              stiffness: 260, 
              damping: 20,
              opacity: { duration: 0.3 }
            }}
            className="absolute inset-0 flex items-center justify-center p-4 md:p-8"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <img
              src={achievements[currentIndex].src}
              alt={achievements[currentIndex].alt}
              className="w-full h-full object-contain"
              draggable={false}
              onError={(e) => {
                // Fallback if SVG fails to load
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            
            {/* Fallback content */}
            <div className="hidden w-full h-full flex-col items-center justify-center text-[#5c0b08] p-8">
              <Award className="w-24 h-24 mb-6 text-[#903d04]" />
              <h3 className="text-2xl font-bold mb-4">{achievements[currentIndex].title}</h3>
              <p className="text-center text-lg leading-relaxed max-w-2xl">
                {achievements[currentIndex].description}
              </p>
              <div className="mt-8 px-6 py-3 bg-gradient-to-r from-[#5c0b08] to-[#903d04] text-white rounded-full font-medium">
                Achievement #{currentIndex + 1}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Mobile Touch Areas */}
        <div className="md:hidden absolute inset-0 flex z-10">
          <button 
            onClick={prevSlide}
            className="flex-1 focus:outline-none"
            aria-label="Previous achievement"
          />
          <button 
            onClick={nextSlide}
            className="flex-1 focus:outline-none"
            aria-label="Next achievement"
          />
        </div>
      </div>

      {/* Bottom Navigation */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative z-10 flex-shrink-0 px-6 py-6 bg-white/80 backdrop-blur-sm border-t border-orange-100"
      >
        <div className="max-w-6xl mx-auto">
          {/* Progress Indicators */}
          <div className="flex justify-center space-x-4 mb-4">
            {achievements.map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => goToSlide(index)}
                className={`relative h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'w-12 bg-gradient-to-r from-[#5c0b08] to-[#903d04] shadow-lg' 
                    : 'w-2 bg-orange-200 hover:bg-orange-300'
                }`}
              >
                {index === currentIndex && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute inset-0 bg-gradient-to-r from-[#903d04] to-[#9c7502] rounded-full"
                  />
                )}
              </motion.button>
            ))}
          </div>
          
          {/* Help Text */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center"
          >
            <p className="text-xs text-gray-600">
              <span className="md:hidden">Swipe or tap sides to navigate • Auto-slide every 8s</span>
              <span className="hidden md:inline">Use arrow keys, click buttons, or wait for auto-slide • Every 8 seconds</span>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AchievementsSlider;