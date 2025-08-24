import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { periods } from '../../data';

const LeadershipHistory = ({ isVisible }) => {
  const [expandedCards, setExpandedCards] = useState({});
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const timelineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const toggleExpanded = (year) => {
    setExpandedCards(prev => ({
      ...prev,
      [year]: !prev[year]
    }));
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-gray-50 relative overflow-hidden">
      {/* Background Pattern */}
      <motion.div 
        className="absolute inset-0 opacity-5"
        animate={{ 
          backgroundPosition: ['0px 0px', '40px 40px'],
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      >
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #5c0b08 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative" ref={containerRef}>
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-[#5c0b08] mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Sejarah Kepemimpinan
          </motion.h2>
          <motion.p 
            className="text-gray-600 mb-6 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Perjalanan kepemimpinan Ambalan dari masa ke masa dengan dedikasi dan inovasi
          </motion.p>
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-[#f9ba02] to-[#903d04] mx-auto rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          />
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 w-1 bg-gradient-to-b from-gray-200 to-gray-300 rounded-full" style={{ height: '100%' }}>
            <motion.div 
              className="w-full bg-gradient-to-b from-[#f9ba02] via-[#903d04] to-[#5c0b08] rounded-full"
              style={{ height: timelineHeight }}
              ref={timelineRef}
            />
          </div>

          <div className="space-y-8">
            {periods.map((period, index) => {
              const totalMembers = Object.keys(period.putri).length + Object.keys(period.putra).length;
              const isExpanded = expandedCards[period.year];
              
              return (
                <TimelineCard
                  key={period.year}
                  period={period}
                  index={index}
                  totalMembers={totalMembers}
                  isExpanded={isExpanded}
                  onToggleExpanded={() => toggleExpanded(period.year)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

const TimelineCard = ({ period, index, totalMembers, isExpanded, onToggleExpanded }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: false, margin: "-20% 0px" });
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);

  return (
    <motion.div
      ref={cardRef}
      className="timeline-card relative pl-20"
      style={{ y, opacity, scale }}
      initial={{ x: -100, opacity: 0 }}
      animate={isInView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.25, 0.25, 0, 1]
      }}
    >
      {/* Timeline Dot */}
      <motion.div 
        className="absolute left-6 top-6 z-10"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ 
          duration: 0.4, 
          delay: 0.3 + index * 0.1,
          type: "spring",
          stiffness: 200
        }}
      >
        <motion.div 
          className="w-6 h-6 bg-gradient-to-br from-[#f9ba02] to-[#903d04] rounded-full border-4 border-white shadow-lg flex items-center justify-center"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </motion.div>
      </motion.div>

      {/* Card */}
      <motion.div 
        className="bg-white rounded-2xl shadow-lg border border-gray-100/50 overflow-hidden backdrop-blur-sm"
        whileHover={{ 
          y: -8, 
          scale: 1.02,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" 
        }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 20 
        }}
      >
        
        {/* Main Content Row */}
        <div className="flex flex-col md:flex-row">
          
          {/* Image Section */}
          {period.image && (
            <motion.div 
              className="md:w-72 h-48 md:h-auto relative bg-gradient-to-br from-gray-50 to-gray-100 flex-shrink-0 overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <motion.img
                src={period.image}
                alt={`Ambalan Periode ${period.year}`}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              <motion.div 
                className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-[#5c0b08]"
                initial={{ y: 20, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              >
                📸 Dokumentasi
              </motion.div>
            </motion.div>
          )}
          
          {/* Content Section */}
          <div className="flex-1 p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <motion.h3 
                  className="text-2xl font-bold text-[#5c0b08] mb-1"
                  initial={{ y: 20, opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                >
                  Periode {period.year}
                </motion.h3>
                <motion.div 
                  className="flex items-center space-x-4 text-sm text-gray-600"
                  initial={{ y: 20, opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                >
                  <span className="flex items-center">
                    <div className="w-2 h-2 bg-[#f9ba02] rounded-full mr-2"></div>
                    {Object.keys(period.putri).length} Putri
                  </span>
                  <span className="flex items-center">
                    <div className="w-2 h-2 bg-[#903d04] rounded-full mr-2"></div>
                    {Object.keys(period.putra).length} Putra
                  </span>
                  <span className="text-[#5c0b08] font-semibold">
                    Total: {totalMembers} Anggota
                  </span>
                </motion.div>
              </div>
              
              <motion.button
                onClick={onToggleExpanded}
                className="flex items-center space-x-2 bg-gradient-to-r from-[#5c0b08] to-[#903d04] text-white px-4 py-2 rounded-full text-sm font-medium"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(92, 11, 8, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
                initial={{ x: 20, opacity: 0 }}
                animate={isInView ? { x: 0, opacity: 1 } : { x: 20, opacity: 0 }}
              >
                <span>{isExpanded ? 'Sembunyikan' : 'Lihat Detail'}</span>
                <motion.svg 
                  className="w-4 h-4"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </motion.button>
            </div>

            {/* Key Members Preview (Always Visible) */}
            {!isExpanded && (
              <motion.div 
                className="grid md:grid-cols-2 gap-4"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
              >
                <motion.div 
                  className="space-y-2"
                  initial={{ x: -20, opacity: 0 }}
                  animate={isInView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                >
                  <h4 className="text-sm font-bold text-[#5c0b08] flex items-center">
                    <div className="w-3 h-3 bg-[#f9ba02] rounded-full mr-2"></div>
                    Putri
                  </h4>
                  <div className="text-sm text-gray-700">
                    <span className="font-semibold text-[#5c0b08]">Pradana:</span> {period.putri.pradana}
                    {Object.keys(period.putri).length > 1 && (
                      <div className="text-xs text-gray-500 mt-1">
                        +{Object.keys(period.putri).length - 1} anggota lainnya
                      </div>
                    )}
                  </div>
                </motion.div>
                <motion.div 
                  className="space-y-2"
                  initial={{ x: 20, opacity: 0 }}
                  animate={isInView ? { x: 0, opacity: 1 } : { x: 20, opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                >
                  <h4 className="text-sm font-bold text-[#5c0b08] flex items-center">
                    <div className="w-3 h-3 bg-[#903d04] rounded-full mr-2"></div>
                    Putra
                  </h4>
                  <div className="text-sm text-gray-700">
                    <span className="font-semibold text-[#5c0b08]">Pradana:</span> {period.putra.pradana}
                    {Object.keys(period.putra).length > 1 && (
                      <div className="text-xs text-gray-500 mt-1">
                        +{Object.keys(period.putra).length - 1} anggota lainnya
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Expanded Details */}
        <motion.div
          initial={false}
          animate={{
            height: isExpanded ? "auto" : 0,
            opacity: isExpanded ? 1 : 0
          }}
          transition={{ 
            duration: 0.4,
            ease: [0.04, 0.62, 0.23, 0.98]
          }}
          className="overflow-hidden"
        >
          <div className="border-t border-gray-100 bg-gradient-to-r from-gray-50/50 to-transparent p-6">
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Putri Details */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={isExpanded ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <h4 className="text-lg font-bold text-[#5c0b08] mb-4 flex items-center">
                  <div className="w-4 h-4 bg-gradient-to-r from-[#f9ba02] to-[#903d04] rounded-full mr-3"></div>
                  Putri ({Object.keys(period.putri).length} orang)
                </h4>
                <div className="space-y-2">
                  {Object.entries(period.putri).map(([role, name], roleIndex) => (
                    <motion.div 
                      key={role} 
                      className="flex items-center justify-between py-2 px-3 bg-white/70 backdrop-blur-sm rounded-lg text-sm hover:bg-white hover:shadow-sm transition-all duration-200"
                      initial={{ x: -10, opacity: 0 }}
                      animate={isExpanded ? { x: 0, opacity: 1 } : { x: -10, opacity: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 + roleIndex * 0.05 }}
                      whileHover={{ x: 5, scale: 1.02 }}
                    >
                      <span className="text-gray-600 font-medium capitalize">
                        {role.replace(/([A-Z])/g, ' $1').replace('_', ' ').replace('kadiv', 'Kadiv ').trim()}
                      </span>
                      <span className="text-[#5c0b08] font-semibold">
                        {name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Putra Details */}
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={isExpanded ? { x: 0, opacity: 1 } : { x: 20, opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <h4 className="text-lg font-bold text-[#5c0b08] mb-4 flex items-center">
                  <div className="w-4 h-4 bg-gradient-to-r from-[#903d04] to-[#5c0b08] rounded-full mr-3"></div>
                  Putra ({Object.keys(period.putra).length} orang)
                </h4>
                <div className="space-y-2">
                  {Object.entries(period.putra).map(([role, name], roleIndex) => (
                    <motion.div 
                      key={role} 
                      className="flex items-center justify-between py-2 px-3 bg-white/70 backdrop-blur-sm rounded-lg text-sm hover:bg-white hover:shadow-sm transition-all duration-200"
                      initial={{ x: 10, opacity: 0 }}
                      animate={isExpanded ? { x: 0, opacity: 1 } : { x: 10, opacity: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 + roleIndex * 0.05 }}
                      whileHover={{ x: -5, scale: 1.02 }}
                    >
                      <span className="text-gray-600 font-medium capitalize">
                        {role.replace(/([A-Z])/g, ' $1').replace('_', ' ').replace('kadiv', 'Kadiv ').trim()}
                      </span>
                      <span className="text-[#5c0b08] font-semibold">
                        {name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default LeadershipHistory;
