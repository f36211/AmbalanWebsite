// scripts/seed-database.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Page from '../models/pageModel.js'; 
import { periods, heroData, tentangKamiData, stats } from '../src/data/index.js';
import { achievementsData } from '../src/data/achievementsData.js';

dotenv.config();

const seedDatabase = async () => {
  const MONGO_URI = process.env.MONGO_URI;
  if (!MONGO_URI) {
    console.error('MONGO_URI is not defined in your .env file.');
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGO_URI);
    console.log('Successfully connected to MongoDB.');

    // We will create one single page 'home' that holds all the data.
    const homePageData = {
      slug: 'home',
      title: 'Home Page',
      status: 'published',
      sections: [
        {
          type: 'hero',
          enabled: true,
          content: heroData
        },
        {
          type: 'stats',
          enabled: true,
          content: { stats }
        },
        {
          type: 'tentangKami',
          enabled: true,
          content: tentangKamiData
        },
        {
          type: 'leadershipHistory',
          enabled: true,
          content: { periods } // The data is the array itself
        },
        {
          type: 'achievements',
          enabled: true,
          content: { achievements: achievementsData } // Nest inside an 'achievements' key
        }
        // You can add more sections here for other data like fotoKegiatanData etc.
      ]
    };

    // Use findOneAndUpdate with upsert:true to either create or update the page
    const result = await Page.findOneAndUpdate(
      { slug: 'home' },
      homePageData,
      { new: true, upsert: true, runValidators: true }
    );

    console.log('Database seeded successfully!');
    console.log('Created/Updated page with slug:', result.slug);

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
};

seedDatabase();
