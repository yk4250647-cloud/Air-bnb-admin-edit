import mongoose from 'mongoose';

const PropertySchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
  name: { type: String, required: true, trim: true },
  type: { type: String, default: 'Apartment' },
  beds: { type: String, default: '' },
  baths: { type: String, default: '' },
  guests: { type: String, default: '' },
  tag: { type: String, default: '' },
  description: { type: String, default: '' },
  highlights: { type: [String], default: [] },
  cover: { type: String, default: '' },
  gallery: { type: [String], default: [] },
  imageAssets: { type: [{ url: { type: String, required: true }, publicId: { type: String, default: '' }, width: Number, height: Number, format: String }], default: [] },
  isPublished: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.Property || mongoose.model('Property', PropertySchema);
