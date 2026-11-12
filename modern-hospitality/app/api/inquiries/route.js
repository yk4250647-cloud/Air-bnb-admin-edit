import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import Enquiry from '../../../models/Enquiry';

export const runtime = 'nodejs';

export async function POST(req) {
  try {
    const data = await req.json();
    const required = ['name', 'email', 'phone'];
    if (required.some((key) => typeof data[key] !== 'string' || !data[key].trim())) {
      return NextResponse.json({ error: 'Please complete your name, email and phone number.' }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }
    if (data.arrival && data.departure && data.departure <= data.arrival) {
      return NextResponse.json({ error: 'Departure date must be after arrival date.' }, { status: 400 });
    }
    await connectDB();
    const enquiry = await Enquiry.create({
      name: data.name.trim().slice(0, 120), email: data.email.trim().toLowerCase().slice(0, 180),
      phone: data.phone.trim().slice(0, 40), property: String(data.property || '').slice(0, 120),
      arrival: String(data.arrival || '').slice(0, 20), departure: String(data.departure || '').slice(0, 20),
      guests: String(data.guests || '').slice(0, 20), message: String(data.message || '').slice(0, 3000),
    });
    return NextResponse.json({ ok: true, message: 'Thank you. Your enquiry has been saved. Our team will be in touch.', id: enquiry._id }, { status: 201 });
  } catch (error) {
    console.error('Enquiry save failed:', error);
    return NextResponse.json({ error: 'We could not save your enquiry. Please try again or contact us directly.' }, { status: 503 });
  }
}
