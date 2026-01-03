import { v2 as cloudinary } from 'cloudinary';
import { verifyAuth } from './utils/auth.js';

const handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { authorized, error } = await verifyAuth(event);
        if (!authorized) {
            return { statusCode: 401, body: JSON.stringify({ message: error }) };
        }

        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });

        const { folder = 'website_assets' } = JSON.parse(event.body);
        const timestamp = Math.round((new Date).getTime()/1000);

        const signature = cloudinary.utils.api_sign_request({
            timestamp: timestamp,
            folder: folder
        }, process.env.CLOUDINARY_API_SECRET);

        return {
            statusCode: 200,
            body: JSON.stringify({
                signature,
                timestamp,
                cloudname: process.env.CLOUDINARY_CLOUD_NAME,
                apikey: process.env.CLOUDINARY_API_KEY,
                folder,
            }),
        };
    } catch (error) {
        console.error("Signature Error:", error);
        return { statusCode: 500, body: JSON.stringify({ message: 'Error creating signature' }) };
    }
};

export { handler };
