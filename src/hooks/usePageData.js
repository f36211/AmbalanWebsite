// src/hooks/usePageData.js
import { useState, useEffect } from 'react';
import axios from 'axios';

// Import static data for development mode
import { periods, heroData, tentangKamiData, stats } from '../data/index.js';
import { achievementsData } from '../data/achievementsData.js';

const getStaticHomePageData = () => ({
  slug: 'home',
  title: 'Home Page',
  status: 'published',
  sections: [
    { type: 'hero', content: heroData },
    { type: 'stats', content: { stats } },
    { type: 'tentangKami', content: tentangKamiData },
    { type: 'leadershipHistory', content: { periods } },
    { type: 'achievements', content: { achievements: achievementsData } }
  ]
});

export const usePageData = (slug) => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // Check if we are in development mode
      if (import.meta.env.VITE_APP_DEV_MODE === 'true') {
        console.log('Running in development mode: using static data.');
        if (slug === 'home') {
          setPageData(getStaticHomePageData());
        }
        setLoading(false);
        return;
      }

      // Production mode: fetch from API
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`/api/public-get-page?slug=${slug}`);
        setPageData(response.data);
      } catch (err) {
        console.error(`Failed to fetch page data for slug: ${slug}`, err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  return { pageData, loading, error };
};
