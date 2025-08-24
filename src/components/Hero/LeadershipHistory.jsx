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
                    <div className="md:w-1/2 lg:w-2/5 h-80 md:h-96 relative overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center p-6">
                      <div className="relative w-full h-full max-w-sm max-h-80">
                        <img
                          src={period.image}
                          alt={`Foto Ambalan Periode ${period.year}`}
                          className="w-full h-full object-cover object-center rounded-2xl shadow-2xl scale-90 group-hover:scale-95 transition-all duration-700 cursor-pointer border-4 border-white/80 backdrop-blur-sm"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-[#5c0b08]/15 via-transparent to-[#903d04]/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                        <div className="absolute -top-3 -left-3 w-6 h-6 bg-gradient-to-br from-[#f9ba02] to-[#903d04] rounded-full shadow-lg opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute -top-3 -right-3 w-6 h-6 bg-gradient-to-br from-[#903d04] to-[#5c0b08] rounded-full shadow-lg opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-gradient-to-br from-[#5c0b08] to-[#903d04] rounded-full shadow-lg opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-gradient-to-br from-[#903d04] to-[#f9ba02] rounded-full shadow-lg opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-sm font-semibold text-[#5c0b08] shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                        📸 Periode {period.year}
                      </div>
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-[#903d04] to-[#5c0b08] text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                        ⚜️ AMBALAN
                      </div>
                    </div>
                  )}
                  
                  {/* Content Section */}
                  <div className={`${period.image ? 'md:w-1/2 lg:w-3/5' : 'w-full'} p-6 sm:p-8 lg:p-10 flex flex-col justify-center`}>
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
