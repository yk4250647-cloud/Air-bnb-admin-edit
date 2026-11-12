import connectDB from './mongodb';
import Property from '../models/Property';
import { properties as seedProperties } from '../data/properties';

export async function getPublicProperties() {
  try {
    await connectDB();
    let records = await Property.find({ isPublished: true }).sort({ createdAt: 1 }).lean();
    if (!records.length) {
      const count = await Property.countDocuments();
      if (!count) {
        await Property.insertMany(seedProperties.map((p) => ({ ...p, isPublished: true })));
        records = await Property.find({ isPublished: true }).sort({ createdAt: 1 }).lean();
      }
    }
    return records.map(({ _id, __v, createdAt, updatedAt, ...p }) => ({ ...p, gallery: Array.isArray(p.gallery) && p.gallery.length ? p.gallery : (p.cover ? [p.cover] : []) }));
  } catch (error) {
    console.error('MongoDB property read failed; using local seed data:', error.message);
    return seedProperties;
  }
}
