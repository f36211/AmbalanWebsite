import React from 'react';
import { Users, Crown, Shield, Star } from 'lucide-react';
import { strukturOrganisasiData } from '../data/index.js';

const StrukturOrganisasi = ({ isVisible }) => {
  const { title, subtitle, orgChartTitle, pembina, struktur } = strukturOrganisasiData;

  const getIconComponent = (iconName) => {
    const icons = {
      Crown,
      Shield,
      Star,
      Users
    };
    return icons[iconName] || Users;
  };

  return (
    <section className="py-12 sm:py-20 bg-gradient-to-r from-amber-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div 
          id="struktur-header" 
          data-animate 
          className={`text-center mb-16 transform transition-all duration-1000 ${
            isVisible['struktur-header'] ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#5c0b08] mb-4 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#5c0b08] hover:to-[#903d04] transition-all duration-500 cursor-default">
            {title}
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-[#903d04] to-[#9c7502] mx-auto rounded-full animate-pulse"></div>
          {subtitle && <p className="text-gray-600 mt-4 text-lg">{subtitle}</p>}
        </div>

        {/* Struktur Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {struktur.map((person, index) => {
            const IconComponent = getIconComponent(person.icon);
            return (
              <div
                key={index}
                id={`struktur-${index}`}
                data-animate
                className={`transform transition-all duration-1000 delay-${index * 100} ${
                  isVisible[`struktur-${index}`] ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100 hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
                  <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${person.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-[#5c0b08] mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#5c0b08] group-hover:to-[#903d04] transition-all duration-300">
                      {person.jabatan}
                    </h3>
                    <p className="text-lg font-semibold text-[#903d04] mb-1">{person.nama}</p>
                    <p className="text-sm text-gray-600">{person.periode}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Organizational Chart */}
        <div 
          id="org-chart" 
          data-animate 
          className={`transform transition-all duration-1000 delay-500 ${
            isVisible['org-chart'] ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-orange-100">
            <h3 className="text-2xl font-bold text-[#5c0b08] mb-6 text-center flex items-center justify-center gap-3">
              <Users className="w-8 h-8 text-[#903d04]" />
              {orgChartTitle}
            </h3>
            <div className="text-center">
              <div className="inline-block bg-gradient-to-r from-amber-100 to-orange-100 rounded-lg p-4 mb-4">
                <p className="text-[#5c0b08] font-semibold">{pembina.title}</p>
                <p className="text-sm text-gray-600">{pembina.name}</p>
              </div>
              <div className="w-px h-8 bg-[#903d04] mx-auto mb-4"></div>
              <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                {struktur.filter(person => person.jabatan.includes('Pradana')).map((person, index) => (
                  <div key={index} className={`bg-gradient-to-r ${index === 0 ? 'from-blue-100 to-blue-200' : 'from-pink-100 to-pink-200'} rounded-lg p-4`}>
                    <p className="font-semibold text-[#5c0b08]">{person.jabatan}</p>
                    <p className="text-sm text-gray-600">{person.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StrukturOrganisasi;
