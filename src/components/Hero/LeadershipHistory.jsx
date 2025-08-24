import React, { useEffect, useRef } from 'react';
import { periods } from '../../data';

const LeadershipHistory = ({ isVisible }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const scrollY = window.scrollY;
      const cards = containerRef.current.querySelectorAll('.timeline-card');
      
      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isInView) {
          const progress = Math.min(Math.max((window.innerHeight - rect.top) / window.innerHeight, 0), 1);
          const translateY = (1 - progress) * 50;
          const opacity = Math.min(progress * 1.5, 1);
          
          card.style.transform = `translateY(${translateY}px)`;
          card.style.opacity = opacity;
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="py-12 sm:py-20 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" ref={containerRef}>
        <div 
          id="history-title" 
          data-animate 
          className={`text-center mb-20 transform transition-all duration-1000 ${
            isVisible['history-title'] ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#5c0b08] mb-4">
            Sejarah Kepemimpinan
          </h2>
          <div className="w-24 h-1 bg-[#f9ba02] mx-auto rounded-full"></div>
        </div>

        {/* Timeline Line */}
        <div className="absolute left-1/2 transform -translate-x-px w-0.5 bg-gradient-to-b from-[#f9ba02] via-[#903d04] to-[#5c0b08] opacity-30" 
             style={{ height: `${periods.length * 600}px`, top: '300px' }}></div>

        <div className="relative">
          {periods.map((period, index) => {
            const totalMembers = Object.keys(period.putri).length + Object.keys(period.putra).length;
            const isEven = index % 2 === 0;
            
            return (
              <div
                key={period.year}
                className={`timeline-card relative mb-16 flex items-center ${
                  isEven ? 'justify-start' : 'justify-end'
                }`}
                style={{ opacity: 0, transform: 'translateY(50px)' }}
              >
                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                  <div className="w-4 h-4 bg-[#f9ba02] rounded-full border-4 border-white shadow-lg"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#5c0b08] rounded-full"></div>
                </div>

                {/* Card */}
                <div className={`w-full max-w-md ${isEven ? 'mr-8 pr-8' : 'ml-8 pl-8'}`}>
                  <div className={`bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden transform transition-all duration-500 hover:shadow-2xl hover:scale-105 ${
                    isEven ? 'hover:rotate-1' : 'hover:-rotate-1'
                  }`}>
                    
                    {/* Header */}
                    <div className="bg-gradient-to-r from-[#5c0b08] to-[#903d04] text-white px-4 py-3 text-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform skew-x-12 translate-x-full animate-pulse"></div>
                      <h3 className="text-lg font-bold relative z-10">
                        PERIODE {period.year}
                      </h3>
                      <div className="text-xs opacity-90 mt-1 relative z-10">
                        {totalMembers} Anggota
                      </div>
                    </div>

                    {/* Image Section */}
                    {period.image && (
                      <div className="relative bg-gray-50 overflow-hidden">
                        <img
                          src={period.image}
                          alt={`Foto Ambalan Periode ${period.year}`}
                          className="w-full h-48 object-cover transform hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute bottom-2 right-2 bg-[#f9ba02] text-[#5c0b08] px-2 py-1 rounded-full text-xs font-semibold shadow-md">
                          📸 Ambalan
                        </div>
                      </div>
                    )}
                    
                    {/* Content Section */}
                    <div className="p-4 bg-gradient-to-b from-white to-gray-50">
                      
                      {/* Putri */}
                      <div className="mb-4">
                        <div className="flex items-center mb-2">
                          <div className="w-3 h-3 bg-gradient-to-r from-[#f9ba02] to-[#903d04] rounded-full mr-2 shadow-sm"></div>
                          <h4 className="text-sm font-bold text-[#5c0b08]">PUTRI</h4>
                          <span className="ml-auto text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                            {Object.keys(period.putri).length}
                          </span>
                        </div>
                        <div className="space-y-1">
                          {Object.entries(period.putri).map(([role, name], roleIndex) => (
                            <div 
                              key={role} 
                              className="flex items-center justify-between py-1.5 px-2 bg-white/80 backdrop-blur-sm rounded-lg text-xs shadow-sm hover:bg-white hover:shadow-md transition-all duration-200"
                              style={{ animationDelay: `${roleIndex * 50}ms` }}
                            >
                              <span className="text-gray-600 font-medium uppercase tracking-wide truncate w-16 flex-shrink-0">
                                {role.replace(/([A-Z])/g, ' $1').replace('_', ' ').replace('kadiv', '').trim()}
                              </span>
                              <span className="text-[#5c0b08] font-semibold text-right leading-tight ml-2 truncate">
                                {name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Putra */}
                      <div>
                        <div className="flex items-center mb-2">
                          <div className="w-3 h-3 bg-gradient-to-r from-[#903d04] to-[#5c0b08] rounded-full mr-2 shadow-sm"></div>
                          <h4 className="text-sm font-bold text-[#5c0b08]">PUTRA</h4>
                          <span className="ml-auto text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                            {Object.keys(period.putra).length}
                          </span>
                        </div>
                        <div className="space-y-1">
                          {Object.entries(period.putra).map(([role, name], roleIndex) => (
                            <div 
                              key={role} 
                              className="flex items-center justify-between py-1.5 px-2 bg-white/80 backdrop-blur-sm rounded-lg text-xs shadow-sm hover:bg-white hover:shadow-md transition-all duration-200"
                              style={{ animationDelay: `${roleIndex * 50}ms` }}
                            >
                              <span className="text-gray-600 font-medium uppercase tracking-wide truncate w-16 flex-shrink-0">
                                {role.replace(/([A-Z])/g, ' $1').replace('_', ' ').replace('kadiv', '').trim()}
                              </span>
                              <span className="text-[#5c0b08] font-semibold text-right leading-tight ml-2 truncate">
                                {name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Year Label */}
                  <div className={`absolute top-4 ${isEven ? '-right-16' : '-left-16'} bg-[#5c0b08] text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg transform ${
                    isEven ? 'rotate-12' : '-rotate-12'
                  }`}>
                    {period.year.split('/')[0]}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LeadershipHistory;
