import connectDB from './utils/mongodb.js';
import Page from '../../models/pageModel.js';
import Media from '../../models/mediaModel.js'; // Needed for manual population

const handler = async (event) => {
  const { slug } = event.queryStringParameters;
  if (!slug) {
    return { statusCode: 400, body: JSON.stringify({ message: 'Slug parameter is required' }) };
  }

  try {
    await connectDB();
    const page = await Page.findOne({ slug, status: 'published' }).lean();

    if (!page) {
      return { statusCode: 404, body: JSON.stringify({ message: 'Page not found or not published' }) };
    }
    
    // Manually populate media references
    for (const section of page.sections) {
      if (section.content?.image) {
        section.content.image = await Media.findById(section.content.image).lean();
      }
      if (section.content?.images && Array.isArray(section.content.images)) {
        section.content.images = await Media.find({
          '_id': { $in: section.content.images }
        }).lean();
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify(page),
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ message: 'Server Error' }) };
  }
};

export { handler };
