import React from 'react';
import { periods } from '../../data';

const LeadershipHistory = ({ isVisible }) => {
  return (
    <section className="py-12 sm:py-20 bg-gradient-to-r from-amber-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          id="history-title" 
          data-animate 
          className={`text-center mb-16 transform transition-all duration-1000 ${
            isVisible['history-title'] ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#5c0b08] mb-4 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#5c0b08] hover:to-[#903d04] transition-all duration-500 cursor-default px-2">
            Sejarah Kepemimpinan
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-[#903d04] to-[#9c7502] mx-auto rounded-full animate-pulse"></div>
        </div>

        <div className="space-y-16">
          {periods.map((period, index) => (
            <div
              key={period.year}
              id={`period-${index}`}
              data-animate
              className={`transform transition-all duration-1000 delay-${index * 100} ${
                isVisible[`period-${index}`] ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden border border-orange-100 hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 group">
                <div className="md:flex">
                  {/* Image Section */}
                  {period.image && (
                    <div className="md:w-1/3 h-64 md:h-auto relative overflow-hidden bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center p-4">
                      <img
                        src={period.image}
                        alt={`Foto Ambalan Periode ${period.year}`}
                        className="w-[85%] h-[85%] object-cover object-center rounded-xl shadow-lg scale-95 group-hover:scale-100 transition-all duration-700 cursor-pointer border-2 border-white/60"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-[#5c0b08]/10 to-[#903d04]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                      <div className="absolute bottom-2 right-2 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-[#5c0b08] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        📸 Ambalan
                      </div>
                    </div>
                  )}
                  
                  {/* Content Section */}
                  <div className={`${period.image ? 'md:w-2/3' : 'w-full'} p-4 sm:p-8`}>
                    <div className="text-center mb-6 sm:mb-8">
                      <div className="inline-block bg-gradient-to-r from-[#903d04] to-[#5c0b08] text-white px-4 sm:px-6 py-2 rounded-full font-bold text-base sm:text-lg group-hover:shadow-lg group-hover:scale-105 transition-all duration-300 active:scale-95">
                        ⚜️ PERIODE {period.year} ⚜️
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                      {/* Putri */}
                      <div className="space-y-4">
                        <h3 className="text-xl sm:text-2xl font-bold text-[#5c0b08] text-center mb-4 sm:mb-6 pb-2 border-b-2 border-[#f9ba02] hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#5c0b08] hover:to-[#903d04] transition-all duration-300">
                          Putri ✨
                        </h3>
                        <div className="space-y-3">
                          {Object.entries(period.putri).map(([role, name], roleIndex) => (
                            <div key={role} className={`flex justify-between items-center p-3 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg hover:from-orange-100 hover:to-amber-100 transition-all duration-300 hover:scale-105 hover:shadow-md transform`}
                                 style={{ animationDelay: `${roleIndex * 100}ms` }}>
                              <span className="font-medium text-[#903d04] capitalize text-sm sm:text-base">
                                {role.replace('_', ' ')}:
                              </span>
                              <span className="text-[#5c0b08] font-semibold hover:text-[#903d04] transition-colors duration-200 text-sm sm:text-base text-right">{name}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Putra */}
                      <div className="space-y-4">
                        <h3 className="text-xl sm:text-2xl font-bold text-[#5c0b08] text-center mb-4 sm:mb-6 pb-2 border-b-2 border-[#f9ba02] hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#5c0b08] hover:to-[#903d04] transition-all duration-300">
                          Putra ⚡
                        </h3>
                        <div className="space-y-3">
                          {Object.entries(period.putra).map(([role, name], roleIndex) => (
                            <div key={role} className={`flex justify-between items-center p-3 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg hover:from-orange-100 hover:to-amber-100 transition-all duration-300 hover:scale-105 hover:shadow-md transform`}
                                 style={{ animationDelay: `${roleIndex * 100}ms` }}>
                              <span className="font-medium text-[#903d04] capitalize text-sm sm:text-base">
                                {role.replace('_', ' ')}:
                              </span>
                              <span className="text-[#5c0b08] font-semibold hover:text-[#903d04] transition-colors duration-200 text-sm sm:text-base text-right">{name}</span>
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
