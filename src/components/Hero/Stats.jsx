import React from 'react';
import { Users, Award, Calendar, BookOpen } from 'lucide-react';
import { stats } from '../../data/index';

const statsIcons = [Users, Award, Calendar, BookOpen];

const Stats = ({ isVisible }) => {
  return (
    <section className="py-12 sm:py-16 bg-white relative overflow-hidden">
      {/* Background pattern for stats */}
      <div className="absolute inset-0 opacity-3">
        <div className="absolute inset-0 bg-center bg-no-repeat bg-cover" style={{
          backgroundImage: `url("images/Foto/Foto.jpeg")`
        }}>
        </div>
      </div>
      
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-[#5c0b08]/5 to-transparent rounded-br-full"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#903d04]/5 to-transparent rounded-bl-full"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#9c7502]/5 to-transparent rounded-tr-full"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-[#5c0b08]/5 to-transparent rounded-tl-full"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          id="stats-grid" 
          data-animate 
          className={`relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 transform transition-all duration-1000 ${
            isVisible['stats-grid'] ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          {stats.map((stat, index) => {
            const IconComponent = statsIcons[index];
            return (
              <div key={index} className="text-center group cursor-pointer">
                <div className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-gradient-to-r from-[#903d04] to-[#5c0b08] rounded-2xl flex items-center justify-center group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg group-hover:shadow-2xl active:scale-95`}>
                  <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-white group-hover:animate-pulse" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-[#5c0b08] mb-1 sm:mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#5c0b08] group-hover:to-[#903d04] transition-all duration-300">
                  {stat.value}
                </div>
                <div className="text-sm sm:text-base text-[#903d04] font-medium group-hover:text-[#5c0b08] transition-colors duration-300 px-2">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;