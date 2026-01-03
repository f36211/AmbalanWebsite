import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';

// --- Minimalist Icons ---
const Icons = {
  Male: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4"/>
      <path d="M20 21a8 8 0 1 0-16 0"/>
    </svg>
  ),
  Female: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4"/>
      <path d="M20 21a8 8 0 1 0-16 0"/>
    </svg>
  ),
  Chevron: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9l6 6 6-6"/>
    </svg>
  )
};

const LeadershipHistory = ({ data }) => {
  const [expandedCards, setExpandedCards] = useState({});
  const containerRef = useRef(null);

  const { periods = [] } = data || {};
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const timelineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const toggleExpanded = (year) => {
    setExpandedCards(prev => ({ ...prev, [year]: !prev[year] }));
  };

  return (
    <section className="relative py-20 overflow-hidden bg-white">
      <div className="relative max-w-5xl px-4 mx-auto sm:px-6 lg:px-8" ref={containerRef}>
        {/* Minimalist Header */}
        <motion.div 
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#5c0b08] mb-3">
            Sejarah Kepemimpinan
          </h2>
          <div className="w-16 h-0.5 bg-[#f9ba02] mx-auto"></div>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative pl-8 md:pl-10">
          {/* Minimal Timeline Line */}
          <div className="absolute top-0 bottom-0 left-[15px] md:left-[19px] w-px bg-gray-200">
            <motion.div 
              className="w-full bg-[#5c0b08] origin-top"
              style={{ height: timelineHeight }}
            />
          </div>

          <div className="space-y-12">
            {periods.map((period, index) => (
              <TimelineCard
                key={period.year}
                period={period}
                index={index}
                isExpanded={!!expandedCards[period.year]}
                onToggleExpanded={() => toggleExpanded(period.year)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const TimelineCard = ({ period, index, isExpanded, onToggleExpanded }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });
  
  const totalMembers = Object.keys(period.putri).length + Object.keys(period.putra).length;

  return (
    <div ref={cardRef} className="relative">
      {/* Minimal Timeline Dot */}
      <div className="absolute left-[-19px] md:left-[-23px] top-6 z-10">
        <motion.div 
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
          className="w-2 h-2 bg-[#5c0b08] rounded-full ring-4 ring-white"
        />
      </div>

      {/* Compact Card */}
      <motion.div
        initial={{ x: 30, opacity: 0 }}
        animate={isInView ? { x: 0, opacity: 1 } : { x: 30, opacity: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="relative transition-all duration-300 bg-white border border-gray-100 shadow-sm rounded-xl hover:shadow-md"
      >
        <div className="flex flex-col md:flex-row">
          {/* Compact Image */}
          <div className="relative w-full h-32 overflow-hidden md:w-48 md:h-auto shrink-0 md:rounded-l-xl rounded-t-xl md:rounded-tr-none">
            {period.image ? (
              <>
                <img
                  src={period.image}
                  alt={`Periode ${period.year}`}
                  className="absolute inset-0 object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                  onError={(e) => { 
                    e.target.onerror = null; 
                    e.target.src='https://placehold.co/600x400/eee/999?text=Dokumentasi'; 
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/40 to-transparent" />
              </>
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-gray-50">
                <span className="text-xs text-gray-400">No Image</span>
              </div>
            )}
            
            {/* Year Badge */}
            <div className="absolute bottom-2 left-2 md:bottom-auto md:top-2 md:left-2">
              <span className="inline-flex px-2 py-1 text-xs font-bold text-white bg-[#5c0b08]/90 backdrop-blur-sm rounded-md">
                {period.year}
              </span>
            </div>
          </div>

          {/* Compact Content */}
          <div className="flex-1 p-4 md:p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-lg font-bold text-[#5c0b08] mb-1">Kepengurusan</h3>
                <p className="text-xs text-gray-500">Periode {period.year}</p>
              </div>
            </div>

            {/* Compact Stats */}
            <div className="flex flex-wrap gap-2 mb-4">
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#5c0b08]/5 rounded-md text-xs">
                <Icons.Male />
                <span className="font-semibold text-gray-700">{Object.keys(period.putra).length} Putra</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#f9ba02]/10 rounded-md text-xs">
                <Icons.Female />
                <span className="font-semibold text-gray-700">{Object.keys(period.putri).length} Putri</span>
              </div>
              <div className="px-2.5 py-1 bg-gray-50 rounded-md text-xs font-semibold text-gray-600">
                {totalMembers} Total
              </div>
            </div>

            {/* Minimal Preview */}
            {!isExpanded && (
              <div className="flex flex-col gap-3 pb-3 mb-3 border-b border-gray-100 sm:flex-row">
                <div className="flex-1">
                  <p className="text-xs text-gray-400 mb-0.5">Pradana Putra</p>
                  <p className="text-sm font-semibold text-gray-800">{period.putra.pradana}</p>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-400 mb-0.5">Pradana Putri</p>
                  <p className="text-sm font-semibold text-gray-800">{period.putri.pradana}</p>
                </div>
              </div>
            )}

            {/* Minimal Toggle */}
            <button
              onClick={onToggleExpanded}
              className="flex items-center gap-2 text-sm font-medium text-[#5c0b08] hover:text-[#903d04] transition-colors"
            >
              <span>{isExpanded ? "Tutup" : "Lihat Semua"}</span>
              <Icons.Chevron className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
            </button>
          </div>
        </div>

        {/* Compact Expanded */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-4 pt-0 pb-4 border-t border-gray-100 md:px-5 md:pb-5">
                <div className="grid gap-4 mt-4 md:gap-6 md:grid-cols-2">
                  {/* Putra */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-1.5 bg-[#5c0b08] rounded-md text-white">
                        <Icons.Male />
                      </div>
                      <h4 className="text-sm font-bold text-gray-800">Putra</h4>
                    </div>
                    <div className="space-y-2">
                      {Object.entries(period.putra).map(([role, name], i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.03 }}
                          className="flex items-center justify-between p-2 text-xs transition-colors rounded-lg bg-gray-50 hover:bg-gray-100"
                        >
                          <span className="font-medium text-gray-600 capitalize">
                            {role.replace(/_/g, ' ').replace(/kadiv/gi, 'Kadiv')}
                          </span>
                          <span className="font-semibold text-gray-800">{name}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Putri */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-1.5 bg-[#f9ba02] rounded-md text-white">
                        <Icons.Female />
                      </div>
                      <h4 className="text-sm font-bold text-gray-800">Putri</h4>
                    </div>
                    <div className="space-y-2">
                      {Object.entries(period.putri).map(([role, name], i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.03 }}
                          className="flex items-center justify-between p-2 text-xs transition-colors rounded-lg bg-gray-50 hover:bg-gray-100"
                        >
                          <span className="font-medium text-gray-600 capitalize">
                            {role.replace(/_/g, ' ').replace(/kadiv/gi, 'Kadiv')}
                          </span>
                          <span className="font-semibold text-gray-800">{name}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default LeadershipHistory;