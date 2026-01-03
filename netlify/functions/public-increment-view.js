// netlify/functions/public-increment-view.js
import connectDB from './utils/mongodb.js';
import Page from '../../models/pageModel.js';

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { slug } = JSON.parse(event.body);
    if (!slug) {
      return { statusCode: 400, body: JSON.stringify({ message: 'Slug is required.' }) };
    }

    await connectDB();

    // Use findOneAndUpdate with the $inc operator to atomically increment the views field.
    // This is efficient and safe for concurrent requests.
    // We don't need to return the updated document, just confirm it happened.
    await Page.findOneAndUpdate({ slug }, { $inc: { views: 1 } });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'View count updated.' }),
    };
  } catch (error) {
    console.error('Error incrementing view count:', error);
    // Return a generic error to the client
    return { statusCode: 500, body: JSON.stringify({ message: 'Server error.' }) };
  }
};
