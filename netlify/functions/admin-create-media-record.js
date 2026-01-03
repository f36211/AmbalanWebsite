import connectDB from './utils/mongodb.js';
import { verifyAuth } from './utils/auth.js';
import Media from '../../models/mediaModel.js';

const handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        await connectDB();
        const { authorized, error } = await verifyAuth(event);
        if (!authorized) {
            return { statusCode: 401, body: JSON.stringify({ message: error }) };
        }

        const { public_id, secure_url, original_filename, format, bytes, width, height, altText } = JSON.parse(event.body);

        if(!public_id || !secure_url){
            return { statusCode: 400, body: JSON.stringify({ message: 'Cloudinary response data is required' }) };
        }

        const newMedia = await Media.create({
            filename: original_filename,
            altText: altText || original_filename,
            source: 'upload',
            url: secure_url,
            providerPublicId: public_id,
            fileType: `image/${format}`,
            fileSize: bytes,
            dimensions: { width, height },
        });

        return {
            statusCode: 201,
            body: JSON.stringify(newMedia),
        };
    } catch (error) {
        // Handle potential duplicate providerPublicId
        if(error.code === 11000){
            return { statusCode: 409, body: JSON.stringify({ message: 'This media asset has already been saved.' }) };
        }
        console.error("Media Record Error:", error);
        return { statusCode: 500, body: JSON.stringify({ message: 'Server Error' }) };
    }
};

export { handler };
