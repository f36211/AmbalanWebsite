import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  altText: {
    type: String,
    default: '',
  },
  source: {
    type: String,
    enum: ['upload', 'external'],
    required: true,
  },
  // This will be the Cloudinary secure_url
  url: {
    type: String,
    required: true,
  },
  // Cloudinary's public_id, for API-based management
  providerPublicId: {
      type: String,
      required: true,
      unique: true,
  },
  fileType: {
    type: String,
  },
  fileSize: { // in bytes
    type: Number,
  },
  dimensions: {
    width: Number,
    height: Number,
  },
}, { timestamps: true });

export default mongoose.models.Media || mongoose.model('Media', mediaSchema);
