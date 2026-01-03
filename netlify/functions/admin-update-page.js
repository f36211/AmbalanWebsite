import connectDB from './utils/mongodb.js';
import { verifyAuth } from './utils/auth.js';
import Page from '../../models/pageModel.js';
import Joi from 'joi';

const pageDataSchema = Joi.object({
    slug: Joi.string().required(),
    pageData: Joi.object({
        title: Joi.string().required(),
        sections: Joi.array().items(Joi.object({
            _id: Joi.string().required(),
            type: Joi.string().required(),
            enabled: Joi.boolean().required(),
            content: Joi.object().unknown(true) // Allow any structure within content
        })),
        // Allow other fields from the model
    }).unknown(true)
});

const handler = async (event) => {
    if (event.httpMethod !== 'PUT') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        await connectDB();
        const { authorized, error: authError } = await verifyAuth(event);
        if (!authorized) {
            return { statusCode: 401, body: JSON.stringify({ message: authError }) };
        }

        const body = JSON.parse(event.body);
        const { error: validationError } = pageDataSchema.validate(body);
        if (validationError) {
            return { statusCode: 400, body: JSON.stringify({ message: `Validation error: ${validationError.details[0].message}` }) };
        }
        
        const { slug, pageData } = body;

        // Sanitize ObjectIDs before saving
        pageData.sections.forEach(section => {
            if (section.content?.image && typeof section.content.image === 'object' && section.content.image !== null) {
                section.content.image = section.content.image._id;
            }
             if (section.content?.images && Array.isArray(section.content.images)) {
                section.content.images = section.content.images.map(img => (typeof img === 'object' && img !== null) ? img._id : img);
            }
        });


        const updatedPage = await Page.findOneAndUpdate(
            { slug: slug },
            pageData, // pageData already includes fields like title, sections etc.
            { new: true, upsert: true, runValidators: true } // Upsert to create if not exists
        );

        return {
            statusCode: 200,
            body: JSON.stringify(updatedPage),
        };
    } catch (error) {
        console.error("Update Error:", error);
        return { statusCode: 500, body: JSON.stringify({ message: 'Server Error' }) };
    }
};

export { handler };
