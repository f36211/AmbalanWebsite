import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// --- Configuration ---
// TO USER: Create a project at sanity.io/manage
// Add your project ID and dataset name here or in .env
export const config = {
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'your-project-id', // Replace with your project ID
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2023-10-01', // Use current date
  useCdn: true, // true = fast, cheap (cached); false = fresh datansure fresh data
};

// --- Client ---
// Only initialize if projectId is present
export const client = config.projectId !== 'your-project-id' 
  ? createClient(config) 
  : null;

// --- Image Builder ---
const builder = client ? imageUrlBuilder(client) : null;

export const urlFor = (source) => {
  if (!builder || !source) return '';
  return builder.image(source);
};

// --- Fetch Helper with Fallback ---
// This function tries to fetch from Sanity. 
// If it fails (e.g., waiting for setup), it returns the fallback data.
export const fetchContent = async (query, fallbackData, params = {}) => {
  if (!client) {
    console.warn("Sanity client not configured. Using local fallback data.");
    return fallbackData;
  }
  try {
    const data = await client.fetch(query, params);
    return data && data.length > 0 ? data : fallbackData;
  } catch (error) {
    console.error("Error fetching from Sanity:", error);
    return fallbackData; // Graceful fallback
  }
};
