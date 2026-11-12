import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongodb';
import Property from '../../../../models/Property';
import { requireAdmin } from '../../../../lib/admin-auth';
import { properties as seedProperties } from '../../../../data/properties';

export const runtime = 'nodejs';

export async function GET() {
  const { response } = await requireAdmin();
  if (response) return response;
  try {
    await connectDB();
    if ((await Property.countDocuments()) === 0) await Property.insertMany(seedProperties.map((p) => ({ ...p, isPublished: true })));
    const items = await Property.find().sort({ createdAt: 1 }).lean();
    return NextResponse.json(items.map((p) => ({ ...p, _id: String(p._id) })));
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Could not load properties.' }, { status: 503 });
  }
}

export async function POST(req) {
  const { response } = await requireAdmin();
  if (response) return response;
  try {
    const body = await req.json();
    const name = String(body.name || '').trim();
    const slug = String(body.slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')).trim();
    if (!name || !slug) return NextResponse.json({ error: 'Property name is required.' }, { status: 400 });
    await connectDB();
    const property = await Property.create({ ...body, name, slug, highlights: Array.isArray(body.highlights) ? body.highlights : [], gallery: Array.isArray(body.gallery) ? body.gallery : [], imageAssets: Array.isArray(body.imageAssets) ? body.imageAssets : [], isPublished: body.isPublished !== false });
    return NextResponse.json({ ...property.toObject(), _id: String(property._id) }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.code === 11000 ? 'A property with this slug already exists.' : 'Could not create property.' }, { status: 400 });
  }
}
