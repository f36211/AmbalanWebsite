import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { periods } from '../../data';

const LeadershipHistory = () => {
  const [expandedCards, setExpandedCards] = useState({});
  const containerRef = useRef(null);
  
  // Scroll progress for the entire container to animate the timeline
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Maps scroll progress (0 to 1) to timeline height (0% to 100%)
  const timelineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Toggles the expanded state for a specific card
  const toggleExpanded = (year) => {
    setExpandedCards(prev => ({
      ...prev,
      [year]: !prev[year]
    }));
  };

  return (
    // Main section with a solid background color
    <section className="py-20 bg-slate-50 relative overflow-hidden">
      {/* Optional: A subtle background pattern for texture */}
      <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #5c0b08 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative" ref={containerRef}>
        {/* Section Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#5c0b08] mb-4">
            Sejarah Kepemimpinan
          </h2>
          <div className="w-24 h-1 bg-[#5c0b08] mx-auto rounded-full"/>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Static timeline bar */}
          <div className="absolute left-8 top-0 w-1 bg-gray-200 rounded-full" style={{ height: '100%' }}>
            {/* Animated timeline progress bar */}
            <motion.div 
              className="w-full bg-[#5c0b08] rounded-full"
              style={{ height: timelineHeight }}
            />
          </div>

          <div className="space-y-16">
            {periods.map((period, index) => {
              const totalMembers = Object.keys(period.putri).length + Object.keys(period.putra).length;
              const isExpanded = !!expandedCards[period.year];
              
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
  // Checks if the card is in the viewport to trigger animations
  const isInView = useInView(cardRef, { once: false, margin: "-20% 0px" });

  return (
    <div ref={cardRef} className="timeline-card relative pl-24 pr-8">
      {/* Floating Year and Timeline Dot */}
      <motion.div 
        className="absolute left-8 top-5 z-10 flex items-center"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Floating Year Text */}
        <motion.div 
          className="absolute right-full mr-6 text-right"
          initial={{ x: 20, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : { x: 20, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h4 className="text-lg font-bold text-[#5c0b08] whitespace-nowrap">{period.year}</h4>
        </motion.div>
        
        {/* Timeline Dot */}
        <motion.div 
          className="w-6 h-6 bg-[#f9ba02] rounded-full border-4 border-slate-50 shadow-md flex items-center justify-center -translate-x-1/2"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.4, delay: 0.3, type: "spring", stiffness: 200 }}
        >
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </motion.div>
      </motion.div>

      {/* Main Card */}
      <motion.div
        className="bg-white rounded-2xl shadow-lg border border-gray-100/80 overflow-hidden"
        initial={{ x: 100, opacity: 0 }}
        animate={isInView ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
        whileHover={{ y: -5, boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.15)" }}
      >
        
        {/* Card Content Row */}
        <div className="flex flex-col md:flex-row">
          
          {/* Image Section */}
          {period.image && (
            <div className="md:w-72 h-48 md:h-auto relative flex-shrink-0 overflow-hidden">
              <motion.img
                src={period.image}
                alt={`Ambalan Periode ${period.year}`}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/cccccc/ffffff?text=Image+Error'; }}
              />
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
          )}
          
          {/* Details Section */}
          <div className="flex-1 p-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-[#5c0b08] mb-1">
                  Periode Kepengurusan
                </h3>
                <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
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
                </div>
              </div>
              
              <motion.button
                onClick={onToggleExpanded}
                className="flex-shrink-0 mt-4 sm:mt-0 flex items-center space-x-2 bg-[#5c0b08] text-white px-4 py-2 rounded-full text-sm font-medium"
                whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(92, 11, 8, 0.25)" }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span>{isExpanded ? 'Sembunyikan' : 'Lihat Detail'}</span>
                <motion.svg 
                  className="w-4 h-4"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </motion.button>
            </div>

            {/* Key Members Preview (Always Visible) */}
            {!isExpanded && (
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div className="space-y-2">
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
                </div>
                <div className="space-y-2">
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
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Expanded Details Section */}
        <motion.div
          initial={false}
          animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
          className="overflow-hidden"
        >
          <div className="border-t border-gray-100 bg-slate-50 p-6">
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Putri Details */}
              <div>
                <h4 className="text-lg font-bold text-[#5c0b08] mb-4 flex items-center">
                  <div className="w-4 h-4 bg-[#f9ba02] rounded-full mr-3"></div>
                  Putri ({Object.keys(period.putri).length} orang)
                </h4>
                <div className="space-y-2">
                  {Object.entries(period.putri).map(([role, name], roleIndex) => (
                    <motion.div 
                      key={role} 
                      className="flex items-center justify-between py-2 px-3 bg-white rounded-lg text-sm"
                      initial={{ x: -10, opacity: 0 }}
                      animate={isExpanded ? { x: 0, opacity: 1 } : { x: -10, opacity: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 + roleIndex * 0.05 }}
                    >
                      <span className="text-gray-600 font-medium capitalize">
                        {role.replace(/_/g, ' ').replace('kadiv', 'Kadiv').trim()}
                      </span>
                      <span className="text-[#5c0b08] font-semibold">{name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Putra Details */}
              <div>
                <h4 className="text-lg font-bold text-[#5c0b08] mb-4 flex items-center">
                  <div className="w-4 h-4 bg-[#903d04] rounded-full mr-3"></div>
                  Putra ({Object.keys(period.putra).length} orang)
                </h4>
                <div className="space-y-2">
                  {Object.entries(period.putra).map(([role, name], roleIndex) => (
                    <motion.div 
                      key={role} 
                      className="flex items-center justify-between py-2 px-3 bg-white rounded-lg text-sm"
                      initial={{ x: -10, opacity: 0 }}
                      animate={isExpanded ? { x: 0, opacity: 1 } : { x: -10, opacity: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 + roleIndex * 0.05 }}
                    >
                      <span className="text-gray-600 font-medium capitalize">
                        {role.replace(/_/g, ' ').replace('kadiv', 'Kadiv').trim()}
                      </span>
                      <span className="text-[#5c0b08] font-semibold">{name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

// Main App component to render the LeadershipHistory
const App = () => {
  return (
    <div className="font-sans">
      <LeadershipHistory />
    </div>
  );
};


export default App;
