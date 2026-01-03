import connectDB from './utils/mongodb.js';
import { verifyAuth } from './utils/auth.js';
import Page from '../../models/pageModel.js';
import Media from '../../models/mediaModel.js';

const handler = async (event) => {
  try {
    await connectDB();
    const { authorized, error } = await verifyAuth(event);
    if (!authorized) {
      return { statusCode: 401, body: JSON.stringify({ message: error }) };
    }

    const { slug } = event.queryStringParameters;
    if (!slug) {
      return { statusCode: 400, body: JSON.stringify({ message: 'Slug parameter is required' }) };
    }
    
    // Find page regardless of status for admin
    const page = await Page.findOne({ slug }).lean();

    if (!page) {
      return { statusCode: 404, body: JSON.stringify({ message: 'Page not found' }) };
    }

    // Manual population logic (same as public function)
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
