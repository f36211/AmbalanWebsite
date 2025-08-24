import React from 'react';
import { periods } from '../../data';

const LeadershipHistory = ({ isVisible }) => {
  return (
    <section className="py-12 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          id="history-title" 
          data-animate 
          className={`text-center mb-16 transform transition-all duration-1000 ${
            isVisible['history-title'] ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#5c0b08] mb-4">
            Sejarah Kepemimpinan
          </h2>
          <div className="w-24 h-1 bg-[#f9ba02] mx-auto rounded-full"></div>
        </div>

        <div className="space-y-12">
          {periods.map((period, index) => (
            <div
              key={period.year}
              id={`period-${index}`}
              data-animate
              className={`transform transition-all duration-1000 delay-${index * 100} ${
                isVisible[`period-${index}`] ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                
                {/* Header */}
                <div className="bg-[#5c0b08] text-white px-6 py-4 text-center">
                  <h3 className="text-xl font-bold">
                    PERIODE {period.year}
                  </h3>
                </div>

                <div className="flex flex-col lg:flex-row">
                  
                  {/* Image Section */}
                  {period.image && (
                    <div className="lg:w-1/3 h-64 lg:h-80 relative bg-gray-50 flex items-center justify-center p-6">
                      <div className="w-full h-full max-w-xs">
                        <img
                          src={period.image}
                          alt={`Foto Ambalan Periode ${period.year}`}
                          className="w-full h-full object-cover rounded-lg shadow-md"
                        />
                      </div>
                      <div className="absolute bottom-3 right-3 bg-[#f9ba02] text-[#5c0b08] px-3 py-1 rounded-full text-xs font-semibold">
                        Ambalan
                      </div>
                    </div>
                  )}
                  
                  {/* Content Section */}
                  <div className={`${period.image ? 'lg:w-2/3' : 'w-full'} p-6`}>
                    <div className="grid md:grid-cols-2 gap-8">
                      
                      {/* Putri */}
                      <div>
                        <div className="flex items-center mb-4">
                          <div className="w-4 h-4 bg-[#f9ba02] rounded-full mr-3"></div>
                          <h4 className="text-lg font-bold text-[#5c0b08]">PUTRI</h4>
                        </div>
                        <div className="space-y-3">
                          {Object.entries(period.putri).map(([role, name]) => (
                            <div key={role} className="flex justify-between items-start py-2 border-b border-gray-100 last:border-b-0">
                              <span className="text-sm font-medium text-gray-600 uppercase tracking-wide flex-shrink-0 w-20 sm:w-24">
                                {role.replace(/([A-Z])/g, ' $1').replace('_', ' ').trim()}
                              </span>
                              <span className="text-sm text-[#5c0b08] font-semibold text-right ml-4">
                                {name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Putra */}
                      <div>
                        <div className="flex items-center mb-4">
                          <div className="w-4 h-4 bg-[#903d04] rounded-full mr-3"></div>
                          <h4 className="text-lg font-bold text-[#5c0b08]">PUTRA</h4>
                        </div>
                        <div className="space-y-3">
                          {Object.entries(period.putra).map(([role, name]) => (
                            <div key={role} className="flex justify-between items-start py-2 border-b border-gray-100 last:border-b-0">
                              <span className="text-sm font-medium text-gray-600 uppercase tracking-wide flex-shrink-0 w-20 sm:w-24">
                                {role.replace(/([A-Z])/g, ' $1').replace('_', ' ').trim()}
                              </span>
                              <span className="text-sm text-[#5c0b08] font-semibold text-right ml-4">
                                {name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeadershipHistory;
