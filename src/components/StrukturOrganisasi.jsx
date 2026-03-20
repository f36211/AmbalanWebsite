import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Crown, Shield, Star, Award } from "lucide-react";
import { periods as fallbackPeriods } from "../data/index.js";
import { client } from "../sanity/client";

const StrukturOrganisasi = ({ isVisible }) => {
  const [latestPeriod, setLatestPeriod] = useState(
    fallbackPeriods[fallbackPeriods.length - 1],
  );

  useEffect(() => {
    const fetchLatestPeriod = async () => {
      try {
        const query = `*[_type == "leadershipHistory"] | order(year desc)[0]`;
        if (client) {
          const data = await client.fetch(query);
          if (data) {
            // Transform Sanity array format back to object format expected by component
            const putraObj = {};
            if (data.putra) {
              data.putra.forEach((p) => {
                putraObj[p.role] = p.name;
              });
            }
            const putriObj = {};
            if (data.putri) {
              data.putri.forEach((p) => {
                putriObj[p.role] = p.name;
              });
            }

            setLatestPeriod({
              year: data.year,
              putra: putraObj,
              putri: putriObj,
            });
          }
        }
      } catch (error) {
        console.error("Failed to fetch latest Leadership History:", error);
      }
    };
    fetchLatestPeriod();
  }, []);

  const { year, putra, putri } = latestPeriod;

  const generateStruktur = (data, gender) => {
    return Object.entries(data).map(([key, value]) => {
      // Helper to check role type regardless of key formatting (spaces vs underscores)
      const roleLower = key.toLowerCase();
      const isPradana = roleLower.includes("pradana");
      const isPemangku =
        roleLower.includes("pemangku") || roleLower.includes("pemangku_adat");

      return {
        icon: isPradana ? "Crown" : isPemangku ? "Shield" : "Star",
        jabatan: key.replace(/_/g, " "), // Ensure display name is clean
        nama: value,
        gender,
        isPradana,
        isPemangku,
        priority: isPradana ? 1 : isPemangku ? 2 : 3,
      };
    });
  };

  // Sort by priority and separate by gender
  const putraStructure = generateStruktur(putra, "Putra").sort(
    (a, b) => a.priority - b.priority,
  );
  const putriStructure = generateStruktur(putri, "Putri").sort(
    (a, b) => a.priority - b.priority,
  );

  const getIconComponent = (iconName) => {
    const icons = { Crown, Shield, Star, Users, Award };
    return icons[iconName] || Users;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-amber-50/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#5c0b08]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#f9ba02]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-[#5c0b08] mb-6">
            Kepemimpinan
          </h2>
          <div className="inline-flex items-center bg-[#5c0b08] text-white px-6 py-3 rounded-full text-lg font-semibold mb-6">
            <Award className="w-5 h-5 mr-2" />
            Periode {year}
          </div>
          <div className="w-32 h-1 bg-gradient-to-r from-[#5c0b08] to-[#f9ba02] mx-auto rounded-full"></div>
        </motion.div>

        {/* Pradana Section - Main Leaders */}
        <motion.div
          className="mb-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h3 className="text-3xl font-bold text-[#5c0b08] mb-2">
              Pradana Ambalan
            </h3>
            <p className="text-gray-600">Pimpinan Tertinggi Ambalan</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {[
              ...putraStructure.filter((p) => p.isPradana),
              ...putriStructure.filter((p) => p.isPradana),
            ].map((person, index) => {
              const IconComponent = getIconComponent(person.icon);

              return (
                <motion.div
                  key={`pradana-${index}`}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="relative group"
                >
                  {/* Main Card */}
                  <div className="relative bg-gradient-to-br from-[#5c0b08] to-[#903d04] rounded-3xl p-8 shadow-2xl overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-16 -translate-x-16"></div>

                    {/* Leader Logo */}
                    <motion.div
                      className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-6 mx-auto relative z-10 overflow-hidden"
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img
                        src={
                          person.gender === "Putra"
                            ? "images/logo/L2.webp"
                            : "images/logo/L3.webp"
                        }
                        alt={`Logo ${person.gender}`}
                        className="w-12 h-12 object-contain"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "block";
                        }}
                      />
                      <IconComponent className="w-10 h-10 text-white hidden" />
                    </motion.div>

                    {/* Content */}
                    <div className="text-center relative z-10">
                      <div className="mb-4">
                        <span className="inline-block bg-white/20 text-white text-sm font-semibold px-4 py-1 rounded-full mb-2">
                          {person.gender}
                        </span>
                        <h4 className="text-white/90 text-lg font-semibold uppercase tracking-widest">
                          {person.jabatan}
                        </h4>
                      </div>

                      <h3 className="text-3xl font-bold text-white mb-2 leading-tight">
                        {person.nama}
                      </h3>
                    </div>

                    {/* Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Pemangku Section */}
        {[
          ...putraStructure.filter((p) => p.isPemangku),
          ...putriStructure.filter((p) => p.isPemangku),
        ].length > 0 && (
          <motion.div
            className="mb-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="text-center mb-10">
              <h3 className="text-2xl font-bold text-[#903d04] mb-2">
                Pemangku Adat
              </h3>
              <p className="text-gray-600">Pendamping dan Penasihat</p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                ...putraStructure.filter((p) => p.isPemangku),
                ...putriStructure.filter((p) => p.isPemangku),
              ].map((person, index) => {
                const IconComponent = getIconComponent(person.icon);

                return (
                  <motion.div
                    key={`pemangku-${index}`}
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    className="group"
                  >
                    <div className="relative">
                      {/* Profile Circle */}
                      <motion.div
                        className="w-32 h-32 bg-gradient-to-br from-[#903d04] to-[#5c0b08] rounded-full mx-auto mb-6 flex items-center justify-center shadow-xl"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <IconComponent className="w-16 h-16 text-white" />
                      </motion.div>

                      {/* Content */}
                      <div className="text-center">
                        <div className="mb-3">
                          <span className="inline-block bg-[#903d04]/10 text-[#903d04] text-sm font-semibold px-3 py-1 rounded-full mb-2">
                            {person.gender}
                          </span>
                          <h4 className="text-[#903d04] text-sm font-semibold uppercase tracking-wider">
                            {person.jabatan}
                          </h4>
                        </div>

                        <h3 className="text-xl font-bold text-[#5c0b08] leading-tight">
                          {person.nama}
                        </h3>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Other Members Section */}
        {[
          ...putraStructure.filter((p) => !p.isPradana && !p.isPemangku),
          ...putriStructure.filter((p) => !p.isPradana && !p.isPemangku),
        ].length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="text-center mb-10">
              <h3 className="text-xl font-bold text-gray-700 mb-2">
                Tim Kepengurusan
              </h3>
              <p className="text-gray-600">Anggota Pengurus Ambalan</p>
            </motion.div>

            <div className="grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {[
                ...putraStructure.filter((p) => !p.isPradana && !p.isPemangku),
                ...putriStructure.filter((p) => !p.isPradana && !p.isPemangku),
              ].map((person, index) => {
                const IconComponent = getIconComponent(person.icon);

                return (
                  <motion.div
                    key={`member-${index}`}
                    variants={itemVariants}
                    whileHover={{ y: -3, scale: 1.02 }}
                    className="group"
                  >
                    <div className="text-center">
                      {/* Profile Circle */}
                      <motion.div
                        className="w-24 h-24 bg-gradient-to-br from-[#f9ba02] to-[#903d04] rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg"
                        whileHover={{ rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <IconComponent className="w-10 h-10 text-white" />
                      </motion.div>

                      {/* Content */}
                      <div>
                        <div className="mb-2">
                          <span className="inline-block bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-full mb-1">
                            {person.gender}
                          </span>
                          <h4 className="text-gray-600 text-xs font-semibold uppercase tracking-wide">
                            {person.jabatan}
                          </h4>
                        </div>

                        <h3 className="text-sm font-bold text-[#5c0b08] leading-tight">
                          {person.nama}
                        </h3>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Summary Stats */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
            <div className="grid sm:grid-cols-3 gap-8 text-center">
              <motion.div whileHover={{ scale: 1.05 }}>
                <div className="w-16 h-16 bg-[#5c0b08] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <p className="text-3xl font-bold text-[#5c0b08] mb-1">{Object.keys(putra).length + Object.keys(putri).length}</p>
                <p className="text-gray-600 font-medium">Total Pengurus</p>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }}>
                <div className="w-16 h-16 bg-[#903d04] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <p className="text-3xl font-bold text-[#903d04] mb-1">{Object.keys(putra).length}</p>
                <p className="text-gray-600 font-medium">Pengurus Putra</p>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }}>
                <div className="w-16 h-16 bg-[#f9ba02] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <p className="text-3xl font-bold text-[#f9ba02] mb-1">{Object.keys(putri).length}</p>
                <p className="text-gray-600 font-medium">Pengurus Putri</p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StrukturOrganisasi;
