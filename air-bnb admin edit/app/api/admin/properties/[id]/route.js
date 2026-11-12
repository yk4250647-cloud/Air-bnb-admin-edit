import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectDB from '../../../../../lib/mongodb';
import Property from '../../../../../models/Property';
import { requireAdmin } from '../../../../../lib/admin-auth';

export const runtime = 'nodejs';

export async function PUT(req, { params }) {
  const { response } = await requireAdmin();
  if (response) return response;
  try {
    const { id } = await params;
    if (!mongoose.isValidObjectId(id)) return NextResponse.json({ error: 'Invalid property id.' }, { status: 400 });
    const body = await req.json();
    const allowed = ['name', 'slug', 'type', 'beds', 'baths', 'guests', 'tag', 'description', 'highlights', 'cover', 'gallery', 'imageAssets', 'isPublished'];
    const update = Object.fromEntries(Object.entries(body).filter(([key]) => allowed.includes(key)));
    await connectDB();
    const property = await Property.findByIdAndUpdate(id, update, { new: true, runValidators: true });
    if (!property) return NextResponse.json({ error: 'Property not found.' }, { status: 404 });
    return NextResponse.json(property);
  } catch (error) {
    return NextResponse.json({ error: error.code === 11000 ? 'That slug is already in use.' : 'Could not update property.' }, { status: 400 });
  }
}

export async function DELETE(_req, { params }) {
  const { response } = await requireAdmin();
  if (response) return response;
  try {
    const { id } = await params;
    if (!mongoose.isValidObjectId(id)) return NextResponse.json({ error: 'Invalid property id.' }, { status: 400 });
    await connectDB();
    const deleted = await Property.findByIdAndDelete(id);
    if (!deleted) return NextResponse.json({ error: 'Property not found.' }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Could not delete property.' }, { status: 400 });
  }
}
