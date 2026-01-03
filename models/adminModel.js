import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'super_admin'],
    default: 'admin',
  },
  status: {
    type: String,
    enum: ['active', 'suspended'],
    default: 'active',
  },
  lastLogin: {
    type: Date,
  },
}, { timestamps: true });

// Avoid recompiling the model if it's already been compiled.
export default mongoose.models.Admin || mongoose.model('Admin', adminSchema);
