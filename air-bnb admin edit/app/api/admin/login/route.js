import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongodb';
import Admin from '../../../../models/Admin';
import { createSession, hashPassword, sessionCookie, verifyPassword } from '../../../../lib/security';

export const runtime = 'nodejs';

export async function POST(req) {
  try {
    const { email = '', password = '' } = await req.json();
    if (typeof email !== 'string' || typeof password !== 'string' || !email.trim() || !password) {
      return NextResponse.json({ error: 'Enter your email and password.' }, { status: 400 });
    }
    await connectDB();
    const normalizedEmail = email.trim().toLowerCase();
    let admin = await Admin.findOne({ email: normalizedEmail });

    // First login bootstraps the initial admin using credentials set only in .env.local.
    if (!admin && (await Admin.countDocuments()) === 0) {
      const bootstrapEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
      const bootstrapPassword = process.env.ADMIN_PASSWORD;
      if (!bootstrapEmail || !bootstrapPassword) {
        return NextResponse.json({ error: 'Admin setup is incomplete. Add ADMIN_EMAIL and ADMIN_PASSWORD to .env.local.' }, { status: 503 });
      }
      if (normalizedEmail === bootstrapEmail && password === bootstrapPassword) {
        admin = await Admin.create({ email: bootstrapEmail, passwordHash: hashPassword(bootstrapPassword) });
      }
    }
    if (!admin || !verifyPassword(password, admin.passwordHash)) {
      return NextResponse.json({ error: 'Incorrect email or password.' }, { status: 401 });
    }
    const token = createSession(admin.email);
    const response = NextResponse.json({ ok: true, email: admin.email });
    response.cookies.set(sessionCookie.name, token, sessionCookie.options);
    return response;
  } catch (error) {
    console.error('Admin login failed:', error);
    return NextResponse.json({ error: 'Unable to sign in. Check your MongoDB connection and server configuration.' }, { status: 503 });
  }
}
