import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Star } from 'lucide-react';
import { usePageData } from '../hooks/usePageData';

const Achievements = () => {
  const { pageData, loading, error } = usePageData('home');
  
  // Extract achievements content from the larger page data structure
  const achievementsContent = pageData?.sections.find(s => s.type === 'achievements')?.content;
  const { achievements = [] } = achievementsContent || {};

  const iconMap = {
    'Juara Umum': <Trophy className="w-8 h-8 text-yellow-500" />,
    'Juara 1': <Award className="w-8 h-8 text-blue-500" />,
    'Juara 2': <Award className="w-8 h-8 text-gray-400" />,
    'Juara 3': <Award className="w-8 h-8 text-orange-500" />,
    'Lainnya': <Star className="w-8 h-8 text-green-500" />,
  };

  const getCategoryIcon = (category) => {
    return iconMap[category] || <Star className="w-8 h-8 text-green-500" />;
  };

  const categorizedAchievements = achievements.reduce((acc, achievement) => {
    const { category } = achievement;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(achievement);
    return acc;
  }, {});

  const categoryOrder = ['Juara Umum', 'Juara 1', 'Juara 2', 'Juara 3', 'Lainnya'];
  const sortedCategories = Object.keys(categorizedAchievements).sort((a, b) => {
    return categoryOrder.indexOf(a) - categoryOrder.indexOf(b);
  });
  
  const stats = [
    { number: categorizedAchievements['Juara 1']?.length || 0, label: 'Juara 1', icon: Trophy },
    { number: categorizedAchievements['Juara 2']?.length || 0, label: 'Juara 2', icon: Award },
    { number: categorizedAchievements['Juara 3']?.length || 0, label: 'Juara 3', icon: Star },
    { number: achievements?.length || '10+', label: 'Total Achievements', icon: Trophy },
  ];

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading Achievements...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen">Error loading data.</div>;
  }

  return (
    <div className="min-h-screen py-10 bg-gradient-to-br from-amber-50 via-white to-orange-50 sm:py-16">
      <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h1 className="mb-3 text-4xl font-bold text-transparent md:text-5xl bg-clip-text bg-gradient-to-r from-[#5c0b08] to-[#9c7502]">
            Our Achievements
          </h1>
          <p className="max-w-2xl mx-auto text-base text-gray-600">
            A testament to our dedication, skill, and teamwork.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 gap-4 mb-16 md:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <div key={index} className="p-4 text-center bg-white border border-gray-100 shadow-sm rounded-xl">
              <stat.icon className="w-8 h-8 mx-auto mb-2 text-[#903d04]" />
              <p className="text-2xl font-bold text-[#5c0b08]">{stat.number}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Achievements Grid */}
        <div className="space-y-12">
          {sortedCategories.map((category, catIndex) => (
            <motion.div 
              key={category}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + catIndex * 0.1 }}
            >
              <div className="flex items-center gap-4 mb-6">
                {getCategoryIcon(category)}
                <h2 className="text-2xl font-bold text-gray-800">{category}</h2>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {categorizedAchievements[category].map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                    className="p-6 transition-all duration-300 bg-white border border-gray-100 shadow-sm rounded-xl hover:shadow-lg hover:border-[#f9ba02]/50"
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <div className="p-2 rounded-full bg-[#5c0b08]/10">
                        <Trophy className="w-5 h-5 text-[#5c0b08]" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{achievement.event}</p>
                        <p className="text-sm text-gray-500">{achievement.year}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Achievements;
