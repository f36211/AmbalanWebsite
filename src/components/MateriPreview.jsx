import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  BookOpen, 
  History, 
  Anchor, 
  Map as MapIcon, 
  ArrowRight 
} from "lucide-react";

const MateriPreview = ({ isVisible }) => {
  const previewTopics = [
    {
      title: "Sejarah Pramuka",
      path: "/sejarah-pramuka",
      icon: History,
      description: "Pelajari sejarah dan perkembangan gerakan pramuka dari masa ke masa."
    },
    {
      title: "Simpul & Ikatan",
      path: "/simpul-ikatan",
      icon: Anchor,
      description: "Kuasai teknik dasar simpul dan ikatan untuk kegiatan pionering."
    },
    {
      title: "Peta & Navigasi",
      path: "/peta",
      icon: MapIcon,
      description: "Belajar navigasi darat, membaca peta, dan orientasi medan."
    }
  ];

  return (
    <section className="py-20 sm:py-24 relative overflow-hidden bg-slate-50">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none" 
        style={{ backgroundImage: "radial-gradient(circle at 2px 2px, #5c0b08 1px, transparent 0)", backgroundSize: "32px 32px" }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div 
          id="materi-preview-header"
          data-animate
          className={`text-center mb-14 transition-all duration-700 transform ${
            isVisible["materi-preview-header"] ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-orange-50 border border-orange-100 mb-5">
            <BookOpen className="w-3.5 h-3.5 text-[#903d04]" />
            <span className="text-xs font-semibold tracking-wide text-[#903d04] uppercase">Edukasi Pramuka</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#5c0b08] mb-4">
            Materi Pembelajaran
          </h2>
          <p className="text-base text-gray-600 max-w-xl mx-auto">
            Akses berbagai materi kepramukaan yang dirancang untuk membantu proses belajar anggota pramuka.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 mb-12">
          {previewTopics.map((topic, index) => {
            const Icon = topic.icon;
            const cardId = `materi-card-${index}`;
            return (
              <div
                key={topic.title}
                id={cardId}
                data-animate
                className={`transition-all duration-700 transform ${
                  isVisible[cardId] ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <Link to={topic.path} className="group block h-full">
                  <div className="h-full p-6 sm:p-7 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-orange-200 transition-all duration-300 flex flex-col">
                    <div className="w-12 h-12 rounded-lg bg-orange-50 flex items-center justify-center mb-5 group-hover:bg-[#5c0b08] transition-colors duration-300">
                      <Icon className="w-6 h-6 text-[#903d04] group-hover:text-white transition-colors duration-300" />
                    </div>
                    
                    <h3 className="text-lg font-bold text-[#5c0b08] mb-2 group-hover:text-[#903d04] transition-colors">
                      {topic.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed flex-1 mb-5">
                      {topic.description}
                    </p>
                    
                    <div className="flex items-center text-sm text-[#903d04] font-semibold gap-2 group-hover:gap-3 transition-all duration-300">
                      Pelajari <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Link to="/materi-pramuka">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3.5 bg-[#5c0b08] text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300 inline-flex items-center gap-2.5 text-sm"
            >
              <BookOpen className="w-4 h-4" />
              Lihat Semua Materi
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MateriPreview;
