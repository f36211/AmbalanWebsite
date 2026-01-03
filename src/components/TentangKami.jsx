import React from 'react';
import { MapPin, Trophy, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const TentangKami = ({ data, isVisible }) => {
  // Fallback to empty objects if data is not available
  const { title, identitas } = data || { title: '', identitas: { alamat: {}, info: {} } };

  return (
    <section className="relative py-20 overflow-hidden bg-white">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 opacity-[0.02]" 
           style={{ 
             backgroundImage: 'radial-gradient(circle, #5c0b08 1px, transparent 1px)', 
             backgroundSize: '40px 40px' 
           }}>
      </div>

      <div className="relative max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
        {/* Minimal Header */}
        <motion.div 
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#5c0b08] mb-3">
            {title}
          </h2>
          <div className="w-16 h-0.5 bg-[#f9ba02] mx-auto"></div>
        </motion.div>

        {/* Clean Identity Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="overflow-hidden transition-shadow bg-white border border-gray-100 shadow-sm rounded-2xl hover:shadow-md"
        >
          {/* Header Section */}
          <div className="bg-gradient-to-r from-[#5c0b08] to-[#903d04] p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white/20 backdrop-blur-sm">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">{identitas.title}</h3>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 md:p-8">
            <div className="grid gap-8 md:grid-cols-2">
              {/* Left Column - Address */}
              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#5c0b08]/5 rounded-lg flex-shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5 text-[#5c0b08]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-[#5c0b08] mb-2 uppercase tracking-wide">
                      Alamat Lengkap
                    </h4>
                    <div className="space-y-1 text-sm leading-relaxed text-gray-700">
                      <p className="font-semibold">{identitas.alamat.nama}</p>
                      <p>{identitas.alamat.jalan}</p>
                      <p>{identitas.alamat.kecamatan}</p>
                      <p>{identitas.alamat.negara}</p>
                      <div className="inline-flex items-center gap-2 mt-2 px-3 py-1 bg-[#f9ba02]/10 rounded-full">
                        <span className="text-xs font-semibold text-[#5c0b08]">{identitas.alamat.gudep}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right Column - Info Cards */}
              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {/* Nama Ambalan Card */}
                <div className="p-4 border border-gray-100 rounded-xl bg-gradient-to-br from-gray-50 to-white hover:border-[#f9ba02]/30 transition-colors">
                  <h4 className="mb-2 text-xs font-bold tracking-wider text-gray-400 uppercase">
                    Nama Ambalan
                  </h4>
                  <p className="text-base font-bold text-[#5c0b08] leading-snug">
                    {identitas.info.namaAmbalan}
                  </p>
                </div>

                {/* Tingkat Card */}
                <div className="p-4 border border-gray-100 rounded-xl bg-gradient-to-br from-gray-50 to-white hover:border-[#f9ba02]/30 transition-colors">
                  <h4 className="mb-2 text-xs font-bold tracking-wider text-gray-400 uppercase">
                    Tingkat
                  </h4>
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-[#5c0b08] rounded-md">
                      <Trophy className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-base font-bold text-[#5c0b08]">
                      {identitas.info.tingkat}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TentangKami;