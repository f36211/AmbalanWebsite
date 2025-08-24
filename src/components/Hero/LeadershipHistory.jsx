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

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {periods.map((period, index) => {
            const totalMembers = Object.keys(period.putri).length + Object.keys(period.putra).length;
            
            return (
              <div
                key={period.year}
                id={`period-${index}`}
                data-animate
                className={`transform transition-all duration-1000 delay-${index * 100} ${
                  isVisible[`period-${index}`] ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                } h-fit`}
              >
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  
                  {/* Header */}
                  <div className="bg-[#5c0b08] text-white px-4 py-3 text-center flex-shrink-0">
                    <h3 className="text-lg font-bold">
                      PERIODE {period.year}
                    </h3>
                    <div className="text-xs opacity-80 mt-1">
                      {totalMembers} Anggota
                    </div>
                  </div>

                  {/* Image Section */}
                  {period.image && (
                    <div className="h-48 relative bg-gray-50 flex items-center justify-center p-4 flex-shrink-0">
                      <div className="w-full h-full max-w-[200px]">
                        <img
                          src={period.image}
                          alt={`Foto Ambalan Periode ${period.year}`}
                          className="w-full h-full object-cover rounded-lg shadow-md"
                        />
                      </div>
                      <div className="absolute bottom-2 right-2 bg-[#f9ba02] text-[#5c0b08] px-2 py-1 rounded-full text-xs font-semibold">
                        Ambalan
                      </div>
                    </div>
                  )}
                  
                  {/* Content Section */}
                  <div className="p-4 flex-grow flex flex-col">
                    <div className="grid grid-cols-1 gap-6 flex-grow">
                      
                      {/* Putri */}
                      <div className="flex-1">
                        <div className="flex items-center mb-3">
                          <div className="w-3 h-3 bg-[#f9ba02] rounded-full mr-2"></div>
                          <h4 className="text-base font-bold text-[#5c0b08]">PUTRI</h4>
                          <span className="ml-auto text-xs text-gray-500">
                            {Object.keys(period.putri).length} orang
                          </span>
                        </div>
                        <div className="space-y-2">
                          {Object.entries(period.putri).map(([role, name]) => (
                            <div key={role} className="bg-gray-50 rounded-lg px-3 py-2">
                              <div className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">
                                {role.replace(/([A-Z])/g, ' $1').replace('_', ' ').trim()}
                              </div>
                              <div className="text-sm text-[#5c0b08] font-semibold">
                                {name}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Putra */}
                      <div className="flex-1">
                        <div className="flex items-center mb-3">
                          <div className="w-3 h-3 bg-[#903d04] rounded-full mr-2"></div>
                          <h4 className="text-base font-bold text-[#5c0b08]">PUTRA</h4>
                          <span className="ml-auto text-xs text-gray-500">
                            {Object.keys(period.putra).length} orang
                          </span>
                        </div>
                        <div className="space-y-2">
                          {Object.entries(period.putra).map(([role, name]) => (
                            <div key={role} className="bg-gray-50 rounded-lg px-3 py-2">
                              <div className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">
                                {role.replace(/([A-Z])/g, ' $1').replace('_', ' ').trim()}
                              </div>
                              <div className="text-sm text-[#5c0b08] font-semibold">
                                {name}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
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
