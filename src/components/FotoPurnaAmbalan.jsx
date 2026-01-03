import React from 'react';
import { GraduationCap, Calendar, Users, Award } from 'lucide-react';
import { fotoPurnaAmbalanData } from '../data/index.js';

const FotoPurnaAmbalan = ({ isVisible }) => {
  const { title, subtitle, purnaData } = fotoPurnaAmbalanData;

  return (
    <section className="py-12 sm:py-20 bg-gradient-to-r from-amber-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div 
          id="purna-header" 
          data-animate 
          className={`text-center mb-16 transform transition-all duration-1000 ${
            isVisible['purna-header'] ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#5c0b08] mb-4 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#5c0b08] hover:to-[#903d04] transition-all duration-500 cursor-default">
            {title}
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-[#903d04] to-[#9c7502] mx-auto rounded-full animate-pulse"></div>
          {subtitle && <p className="text-gray-600 mt-4 text-lg">{subtitle}</p>}
        </div>

        {/* Purna Cards */}
        <div className="space-y-12">
          {purnaData.map((purna, index) => (
            <div
              key={purna.id}
              id={`purna-${purna.id}`}
              data-animate
              className={`transform transition-all duration-1000 delay-${index * 200} ${
                isVisible[`purna-${purna.id}`] ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-orange-100 hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 group">
                <div className="md:flex">
                  {/* Image Section */}
                  <div className="md:w-1/2 h-64 md:h-80 relative overflow-hidden">
                    <img
                      src={purna.image}
                      alt={purna.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#5c0b08]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2">
                      <span className="font-bold text-[#5c0b08]">{purna.year}</span>
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <div className="md:w-1/2 p-6 sm:p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#903d04] to-[#5c0b08] rounded-full flex items-center justify-center">
                        <GraduationCap className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-[#5c0b08] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#5c0b08] group-hover:to-[#903d04] transition-all duration-300">
                        {purna.title}
                      </h3>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div className="flex items-center gap-3 text-gray-600">
                        <Calendar className="w-5 h-5 text-[#903d04]" />
                        <span>{purna.date}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-600">
                        <Users className="w-5 h-5 text-[#903d04]" />
                        <span>{purna.graduates} lulusan</span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-[#5c0b08] mb-3 flex items-center gap-2">
                        <Award className="w-5 h-5 text-[#903d04]" />
                        Prestasi Angkatan
                      </h4>
                      <div className="space-y-2">
                        {purna.achievements.map((achievement, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-gradient-to-r from-[#903d04] to-[#5c0b08] rounded-full"></div>
                            <span className="text-gray-700">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg p-4">
                      <p className="text-[#5c0b08] font-medium italic">
                        "{purna.quote}"
                      </p>
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

export default FotoPurnaAmbalan;