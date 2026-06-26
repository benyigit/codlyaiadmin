import { NextResponse } from 'next/server';
import { getData, saveData } from '@/lib/data-store';

export async function GET() {
  const data = await getData('banners.json');
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const newItem = await req.json();
  const data = await getData('banners.json');
  const item = {
    ...newItem,
    id: newItem.id || Math.random().toString(36).substring(7),
    createdAt: newItem.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  data.push(item);
  await saveData('banners.json', data);
  return NextResponse.json(item, { status: 201 });
}
