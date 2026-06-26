import { NextResponse } from 'next/server';
import { getData, saveData } from '@/lib/data-store';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const p = await params;
  const updatedFields = await req.json();
  const data = await getData('tips.json');
  const index = data.findIndex((item: any) => item.id === p.id);
  
  if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  
  data[index] = { ...data[index], ...updatedFields, updatedAt: new Date().toISOString() };
  await saveData('tips.json', data);
  
  return NextResponse.json(data[index]);
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const p = await params;
  const data = await getData('tips.json');
  const filtered = data.filter((item: any) => item.id !== p.id);
  await saveData('tips.json', filtered);
  return NextResponse.json({ success: true });
}
