import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Calendar, Award, Star, Medal, Target } from "lucide-react";
import { achievementsData as fallbackData } from "../data/achievementsData";
import { client, urlFor } from "../sanity/client";

const AchievementCard = ({ achievement, index, onClick }) => {
  const IconComponent = [Trophy, Award, Star, Medal, Target][index % 5];

  // Handle image URL from Sanity 'image' type or legacy 'url' type
  const imageUrl = achievement.badgeImage
    ? urlFor(achievement.badgeImage).url()
    : achievement.badgeUrl || null;

  return (
    <motion.div
      layoutId={`card-${index}`}
      onClick={() => onClick(achievement)}
      className="group relative bg-white rounded-2xl p-6 shadow-md hover:shadow-xl border border-orange-100 transition-all duration-300 cursor-pointer overflow-hidden"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      {/* Decorative gradient blob */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-amber-50 to-orange-100 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500" />

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Icon/Image Container */}
        <div className="w-20 h-20 mb-4 rounded-full bg-gradient-to-br from-amber-50 via-white to-orange-50 shadow-inner flex items-center justify-center border border-orange-100 group-hover:border-orange-200 transition-colors">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={achievement.title}
              loading="lazy"
              className="w-full h-full object-cover rounded-full p-1"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          ) : (
            <IconComponent className="w-8 h-8 text-[#903d04]" />
          )}
        </div>

        <h3 className="font-bold text-lg text-[#5c0b08] mb-2 line-clamp-2 group-hover:text-[#903d04] transition-colors">
          {achievement.title}
        </h3>

        <div className="flex items-center gap-2 text-sm font-medium text-amber-700/80 mb-3">
          <Calendar className="w-4 h-4" />
          <span>{achievement.year}</span>
        </div>

        <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
          {achievement.description}
        </p>
      </div>
    </motion.div>
  );
};

const AchievementModal = ({ achievement, onClose }) => {
  if (!achievement) return null;

  const imageUrl = achievement.badgeImage
    ? urlFor(achievement.badgeImage).url()
    : achievement.badgeUrl || null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[10000] p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        layoutId={`card-${achievement.index}`}
        className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
      >
        {/* Background Pattern */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-[#5c0b08] to-[#903d04] opacity-10" />

        <div className="relative z-10 flex flex-col items-center text-center mt-4">
          <div className="w-32 h-32 mb-6 rounded-full bg-white p-2 shadow-xl border-4 border-orange-50">
            <img
              src={
                imageUrl || "https://via.placeholder.com/150?text=Achievement"
              }
              alt={achievement.title}
              loading="lazy"
              className="w-full h-full object-cover rounded-full"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/150?text=Achievement";
              }}
            />
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-[#5c0b08] mb-3">
            {achievement.title}
          </h2>

          <div className="flex items-center gap-2 text-amber-700 font-semibold mb-6 bg-amber-50 px-4 py-1.5 rounded-full">
            <Calendar className="w-5 h-5" />
            <span>{achievement.year}</span>
          </div>

          <p className="text-gray-600 leading-relaxed text-lg mb-8">
            {achievement.description}
          </p>

          <button
            onClick={onClose}
            className="px-8 py-3 bg-gradient-to-r from-[#5c0b08] to-[#903d04] text-white rounded-xl hover:shadow-lg hover:shadow-orange-900/20 transition-all duration-300 font-semibold w-full sm:w-auto transform hover:-translate-y-0.5"
          >
            Tutup
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Achievements = ({ isVisible = {} }) => {
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [achievements, setAchievements] = useState(fallbackData);

  useEffect(() => {
    // Fetch from Sanity or fallback
    const getAchievements = async () => {
      try {
        const query = `*[_type == "achievement"] | order(year desc)`;
        // If client is configured (has token/ID), this works. Else returns fallback.
        if (client) {
          const data = await client.fetch(query);
          if (data && data.length > 0) {
            // Add index property to match local data shape if needed for layout keys
            setAchievements(data.map((item, idx) => ({ ...item, index: idx })));
          }
        }
      } catch (error) {
        console.error("Failed to fetch achievements:", error);
      }
    };

    getAchievements();
  }, []);

  return (
    <section className="min-h-screen bg-white py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Matching TentangKami styling */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#5c0b08] mb-4"
          >
            Prestasi Kami
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 bg-gradient-to-r from-[#903d04] to-[#9c7502] mx-auto rounded-full"
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {achievements.map((achievement, index) => (
              <AchievementCard
                key={achievement._id || index}
                index={index}
                achievement={achievement}
                onClick={setSelectedAchievement}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedAchievement && (
          <AchievementModal
            achievement={selectedAchievement}
            onClose={() => setSelectedAchievement(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Achievements;
