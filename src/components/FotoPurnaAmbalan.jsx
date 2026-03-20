import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Calendar, Users, Award } from "lucide-react";
import { fotoPurnaAmbalanData as fallbackData } from "../data/index.js";
import { client, urlFor } from "../sanity/client";

const FotoPurnaAmbalan = ({ isVisible }) => {
  const [data, setData] = useState(fallbackData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = `*[_type == "purnaAmbalan"] | order(year desc)`;
        if (client) {
          const result = await client.fetch(query);
          if (result && result.length > 0) {
            // Sanity data mapping to match local structure if needed
            // Assuming Sanity schema matches component usage:
            // result is an array of objects with title, year, date, graduates, image, achievements
            setData({
              ...fallbackData,
              purnaData: result,
            });
          }
        }
      } catch (error) {
        console.error("Failed to fetch Purna Ambalan data:", error);
      }
    };
    fetchData();
  }, []);

  const { title, subtitle, purnaData } = data;

  return (
    <section className="py-12 sm:py-20 bg-gradient-to-r from-amber-50 to-orange-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#5c0b08] mb-4"
          >
            {title}
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 bg-gradient-to-r from-[#903d04] to-[#9c7502] mx-auto rounded-full"
          />
          {subtitle && (
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-gray-600 mt-4 text-lg"
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        {/* Purna Cards */}
        <div className="space-y-12">
          {purnaData &&
            purnaData.map((purna, index) => (
              <motion.div
                key={purna._id || purna.id || index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden border border-orange-100 hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="md:flex">
                  {/* Image Section */}
                  <div className="md:w-1/2 h-64 md:h-auto relative overflow-hidden min-h-[300px]">
                    <img
                      src={
                        purna.image && purna.image.asset
                          ? urlFor(purna.image).url()
                          : purna.image || "/images/placeholder.jpg"
                      }
                      alt={purna.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/10 opacity-60"></div>
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                      <span className="font-bold text-[#5c0b08]">
                        {purna.year}
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#903d04] to-[#5c0b08] rounded-full flex items-center justify-center shrink-0 shadow-md">
                        <GraduationCap className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-[#5c0b08]">
                        {purna.title}
                      </h3>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3 text-gray-600 bg-orange-50/50 p-2 rounded-lg">
                        <Calendar className="w-5 h-5 text-[#903d04]" />
                        <span>{purna.date}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-600 bg-orange-50/50 p-2 rounded-lg">
                        <Users className="w-5 h-5 text-[#903d04]" />
                        <span>{purna.graduates} lulusan</span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-[#5c0b08] mb-3 flex items-center gap-2">
                        <Award className="w-5 h-5 text-[#903d04]" />
                        Prestasi Angkatan
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {purna.achievements &&
                          purna.achievements.map((achievement, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-white border border-orange-100 rounded-full text-sm text-gray-700 shadow-sm"
                            >
                              {achievement}
                            </span>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default FotoPurnaAmbalan;
