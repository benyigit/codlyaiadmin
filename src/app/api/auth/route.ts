export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  const { username, password } = await req.json();
  
  const validUsername = process.env.ADMIN_USERNAME || 'codlyadmin';
  const validPassword = process.env.ADMIN_PASSWORD || 'Codly04';

  if (username === validUsername && password === validPassword) {
    const cookieStore = await cookies();
    cookieStore.set('admin_token', 'true', { httpOnly: true, secure: process.env.NODE_ENV === 'production', path: '/' });
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
}
