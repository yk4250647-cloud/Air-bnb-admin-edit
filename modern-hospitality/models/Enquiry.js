import mongoose from 'mongoose';

const EnquirySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  phone: { type: String, required: true, trim: true },
  property: { type: String, default: '' },
  arrival: { type: String, default: '' },
  departure: { type: String, default: '' },
  guests: { type: String, default: '' },
  message: { type: String, default: '' },
  status: { type: String, enum: ['new', 'contacted', 'closed'], default: 'new' },
  source: { type: String, default: 'website' },
}, { timestamps: true });

export default mongoose.models.Enquiry || mongoose.model('Enquiry', EnquirySchema);
