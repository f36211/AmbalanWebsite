import React from "react";
import { motion } from "framer-motion";
import { Key, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

const SandiPramuka = ({ isVisible }) => {
  return (
    <div className="min-h-screen relative bg-slate-50 py-[15px] px-4 sm:px-6 lg:px-8">
      {/* Background Pattern - Consistent with project style */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, #5c0b08 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      ></div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link 
            to="/materi-pramuka"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md rounded-xl border border-orange-100 text-[#903d04] font-bold text-sm hover:bg-[#903d04] hover:text-white transition-all shadow-sm group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Kembali ke Materi
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex justify-center items-center p-4 mb-8 bg-white rounded-3xl shadow-xl shadow-orange-900/5 border border-orange-100">
            <Key className="w-10 h-10 text-[#903d04]" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#5c0b08] mb-6 tracking-tight">
            Sandi Pramuka
          </h1>
          
          <div className="w-24 h-1.5 bg-gradient-to-r from-[#903d04] to-[#9c7502] mx-auto rounded-full mb-8"></div>
          
          <p className="mx-auto max-w-2xl text-lg text-gray-600 leading-relaxed">
            Halaman ini sedang dalam pengembangan. Segera hadir panduan mengenai berbagai macam sandi rahasia dalam gerakan pramuka.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-[3rem] shadow-2xl shadow-orange-900/5 p-12 sm:p-20 border border-orange-100 flex flex-col items-center justify-center min-h-[500px] text-center"
        >
          <div className="relative mb-10">
            <div className="absolute inset-0 bg-orange-200 blur-2xl opacity-20 animate-pulse"></div>
            <div className="relative w-24 h-24 rounded-full border-4 border-orange-50 border-t-[#903d04] animate-spin"></div>
          </div>
          
          <h3 className="text-2xl font-bold text-[#5c0b08] mb-4">
            Sedang Menyiapkan Konten
          </h3>
          <p className="text-gray-500 max-w-sm leading-relaxed">
            Kami sedang menyusun tabel sandi dan alat bantu dekripsi yang mudah dipelajari untukmu.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SandiPramuka;
