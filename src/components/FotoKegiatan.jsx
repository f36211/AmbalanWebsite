import React, { useState, useMemo, useEffect } from 'react';
import { Camera, Calendar, MapPin, Users } from 'lucide-react';
import { fotoKegiatanData } from '../data/index.js';

const FotoKegiatan = ({ isVisible = {} }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cardVisible, setCardVisible] = useState({});
  const { title, subtitle, categories, photos } = fotoKegiatanData;

  const filteredPhotos = useMemo(() => {
    return selectedCategory === 'all'
      ? photos
      : photos.filter(photo => photo.category === selectedCategory);
  }, [selectedCategory, photos]);

  // Trigger card animation after filter change
  useEffect(() => {
    const newVisibility = {};
    filteredPhotos.forEach((photo, index) => {
      setTimeout(() => {
        setCardVisible(prev => ({ ...prev, [photo.id]: true }));
      }, index * 100);
    });
  }, [filteredPhotos]);

  return (
    <section className="py-12 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          id="foto-header"
          data-animate
          className={`text-center mb-16 transform transition-all duration-1000 ${
            isVisible['foto-header'] ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#5c0b08] mb-4 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#5c0b08] hover:to-[#903d04] transition-all duration-500 cursor-default">
            {title}
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-[#903d04] to-[#9c7502] mx-auto rounded-full animate-pulse"></div>
          {subtitle && <p className="text-gray-600 mt-4 text-lg">{subtitle}</p>}
        </div>

        {/* Category Filter */}
        {categories?.length > 0 && (
          <div
            id="foto-filter"
            data-animate
            className={`mb-12 transform transition-all duration-1000 delay-200 ${
              isVisible['foto-filter'] ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setCardVisible({}); // reset card animations
                    setSelectedCategory(category.id);
                  }}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#903d04] ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-[#5c0b08] to-[#903d04] text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-[#5c0b08] hover:bg-gradient-to-r hover:from-[#903d04] hover:to-[#5c0b08] hover:text-white hover:scale-105'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Photo Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              style={{ transitionDelay: `${index * 100}ms` }}
              className={`transform transition-all duration-1000 ${
                cardVisible[photo.id] ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              <article className="bg-white rounded-2xl shadow-lg overflow-hidden border border-orange-100 hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
                <div className="relative overflow-hidden">
                  <img
                    src={photo.image}
                    alt={photo.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                    <Camera className="w-5 h-5 text-[#903d04]" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#5c0b08] mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#5c0b08] group-hover:to-[#903d04] transition-all duration-300">
                    {photo.title}
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#903d04]" />
                      <span>{photo.date}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#903d04]" />
                      <span>{photo.location}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#903d04]" />
                      <span>{photo.participants} peserta</span>
                    </li>
                  </ul>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FotoKegiatan;
