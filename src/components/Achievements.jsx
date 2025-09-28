import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Calendar, Award, Star, Medal, Target } from 'lucide-react';
import { achievementsData } from '../data/achievementsData';

const AchievementBadges = () => {
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const badgeVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  const getRandomIcon = (index) => {
    const icons = [Trophy, Award, Star, Medal, Target];
    return icons[index % icons.length];
  };

  return (
    <>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 lg:gap-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {achievementsData.map((achievement, index) => {
          const IconComponent = getRandomIcon(index);
          
          return (
            <motion.div
              key={index}
              className="relative group cursor-pointer"
              variants={badgeVariants}
              whileHover={{ 
                scale: 1.05,
                y: -8,
                transition: { type: 'spring', stiffness: 400, damping: 25 }
              }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              onClick={() => setSelectedAchievement(achievement)}
            >
              {/* Main Badge Container */}
              <div className="relative">
                {/* Glow Effect */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400/20 via-orange-500/20 to-red-500/20 blur-xl"
                  animate={{
                    scale: hoveredIndex === index ? 1.2 : 0.8,
                    opacity: hoveredIndex === index ? 0.6 : 0
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Badge Background */}
                <motion.div
                  className="relative w-36 h-36 mx-auto rounded-full bg-gradient-to-br from-amber-100 via-white to-orange-50 shadow-2xl border-4 border-gradient-to-r from-yellow-400 to-orange-500"
                  style={{
                    background: `linear-gradient(135deg, 
                      rgba(251, 191, 36, 0.1) 0%, 
                      rgba(255, 255, 255, 0.9) 50%, 
                      rgba(249, 115, 22, 0.1) 100%)`
                  }}
                >
                  {/* Border Gradient Effect */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 p-1">
                    <div className="w-full h-full rounded-full bg-white" />
                  </div>

                  {/* Badge Image */}
                  <div className="absolute inset-2 rounded-full overflow-hidden">
                    <img
                      src={achievement.badgeUrl}
                      alt={achievement.title}
                      className="w-full h-full object-cover rounded-full"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'flex';
                      }}
                    />
                    {/* Fallback Icon */}
                    <div className="hidden w-full h-full items-center justify-center bg-gradient-to-br from-amber-500 to-orange-600 rounded-full">
                      <IconComponent className="w-12 h-12 text-white" />
                    </div>
                  </div>

                  {/* Shine Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{
                      x: hoveredIndex === index ? ['-100%', '200%'] : '-100%'
                    }}
                    transition={{
                      duration: 0.6,
                      ease: "easeInOut"
                    }}
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)'
                    }}
                  />
                </motion.div>

                {/* Achievement Info */}
                <motion.div
                  className="mt-6 text-center"
                  animate={{
                    y: hoveredIndex === index ? -5 : 0
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="font-bold text-lg text-gray-800 mb-2 leading-tight">
                    {achievement.title}
                  </h3>
                  <div className="flex items-center justify-center gap-1 text-amber-600 mb-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-medium">{achievement.year}</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed px-2">
                    {achievement.description?.length > 60 
                      ? `${achievement.description.substring(0, 60)}...`
                      : achievement.description
                    }
                  </p>
                </motion.div>

                {/* Floating Particles Effect */}
                {hoveredIndex === index && (
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                        initial={{ 
                          x: Math.random() * 200 - 100,
                          y: Math.random() * 200 - 100,
                          opacity: 0 
                        }}
                        animate={{ 
                          y: -200,
                          opacity: [0, 1, 0],
                          scale: [0.5, 1, 0]
                        }}
                        transition={{ 
                          duration: 2,
                          delay: i * 0.2,
                          repeat: Infinity
                        }}
                        style={{
                          left: `${20 + (i * 15)}%`,
                          top: '50%'
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Achievement Detail Modal */}
      <AnimatePresence>
        {selectedAchievement && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedAchievement(null)}
          >
            <motion.div
              className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 relative">
                  <img
                    src={selectedAchievement.badgeUrl}
                    alt={selectedAchievement.title}
                    className="w-full h-full object-cover rounded-full border-4 border-amber-400"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {selectedAchievement.title}
                </h3>
                <div className="flex items-center justify-center gap-2 text-amber-600 mb-4">
                  <Calendar className="w-5 h-5" />
                  <span className="font-medium">{selectedAchievement.year}</span>
                </div>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {selectedAchievement.description}
                </p>
                <button
                  onClick={() => setSelectedAchievement(null)}
                  className="px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-medium"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Achievements = ({ isVisible = {} }) => {
  const headerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Simple Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Trophy Icons */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-5"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5
            }}
            style={{
              left: `${15 + i * 30}%`,
              top: `${25 + i * 20}%`
            }}
          >
            <Trophy className="w-12 h-12 text-gray-300" />
          </motion.div>
        ))}
      </div>

      <div className="relative container mx-auto px-4 py-16 lg:py-24">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          variants={headerVariants}
          initial="hidden"
          animate="visible"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-800 mb-6">
            Our Achievements
          </h1>

        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {[
            { number: achievementsData?.length || '10+', label: 'Total Achievements', icon: Trophy },
            { number: '5+', label: 'Years of Excellence', icon: Calendar },
            { number: '50+', label: 'Awards Won', icon: Medal }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20"
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <stat.icon className="w-12 h-12 text-amber-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-800 mb-1">{stat.number}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Achievement Badges */}
        <AchievementBadges />
      </div>
    </div>
  );
};

export default Achievements;