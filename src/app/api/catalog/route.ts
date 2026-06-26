import { NextResponse } from 'next/server';
import { getData } from '@/lib/data-store';

export async function GET() {
  const models = await getData('models.json');
  
  return NextResponse.json({
    version: 1,
    updatedAt: new Date().toISOString(),
    models
  });
}
