import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectDB from '../../../../lib/mongodb';
import Enquiry from '../../../../models/Enquiry';
import { requireAdmin } from '../../../../lib/admin-auth';

export const runtime = 'nodejs';

export async function GET() {
  const { response } = await requireAdmin();
  if (response) return response;
  try {
    await connectDB();
    const items = await Enquiry.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json(items.map((item) => ({ ...item, _id: String(item._id) })));
  } catch {
    return NextResponse.json({ error: 'Could not load enquiries.' }, { status: 503 });
  }
}

export async function PATCH(req) {
  const { response } = await requireAdmin();
  if (response) return response;
  try {
    const { id, status } = await req.json();
    if (!mongoose.isValidObjectId(id) || !['new', 'contacted', 'closed'].includes(status)) return NextResponse.json({ error: 'Invalid enquiry update.' }, { status: 400 });
    await connectDB();
    const item = await Enquiry.findByIdAndUpdate(id, { status }, { new: true });
    if (!item) return NextResponse.json({ error: 'Enquiry not found.' }, { status: 404 });
    return NextResponse.json(item);
  } catch {
    return NextResponse.json({ error: 'Could not update enquiry.' }, { status: 400 });
  }
}
