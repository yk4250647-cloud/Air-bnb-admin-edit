import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { sessionCookie, verifySession } from './security';

export async function getAdminSession() {
  const cookieStore = await cookies();
  return verifySession(cookieStore.get(sessionCookie.name)?.value);
}

export async function requireAdmin() {
  const session = await getAdminSession();
  if (!session) return { session: null, response: NextResponse.json({ error: 'Unauthorized. Please sign in.' }, { status: 401 }) };
  return { session, response: null };
}
