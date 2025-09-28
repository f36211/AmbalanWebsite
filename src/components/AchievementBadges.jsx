import React from 'react';
import { motion } from 'framer-motion';
import { achievementsData } from '../data/achievementsData';

const AchievementBadges = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
      {achievementsData.map((achievement, index) => (
        <motion.div
          key={index}
          className="relative group"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <img
            src={achievement.badgeUrl}
            alt={achievement.title}
            className="w-32 h-32 mx-auto rounded-full shadow-lg"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/70 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="text-center text-white p-4">
              <h3 className="font-bold text-lg">{achievement.title}</h3>
              <p className="text-sm">{achievement.year}</p>
              <p className="text-xs mt-2">{achievement.description}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default AchievementBadges;
