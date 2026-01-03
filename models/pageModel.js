import mongoose from 'mongoose';
const { Schema } = mongoose;

const sectionSchema = new Schema({
  // Using default Mongoose ObjectId for _id
  type: {
    type: String,
    required: true,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
  content: {
    type: Schema.Types.Mixed,
    default: {},
  },
}, { _id: true });


const pageSchema = new Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
  },
  metaDescription: {
    type: String,
  },
  status: {
    type: String,
    enum: ['published', 'draft'],
    default: 'draft',
  },
  sections: [sectionSchema],
  publishedAt: {
    type: Date,
  }
}, { timestamps: true });

export default mongoose.models.Page || mongoose.model('Page', pageSchema);
