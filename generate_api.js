const fs = require('fs');
const path = require('path');

const entities = [
  { name: 'models', file: 'models.json' },
  { name: 'news', file: 'news.json' },
  { name: 'tips', file: 'tips.json' },
  { name: 'banners', file: 'banners.json' },
  { name: 'categories', file: 'categories.json' },
];

for (const entity of entities) {
  const dir = path.join(__dirname, 'src/app/api', entity.name);
  const idDir = path.join(dir, '[id]');
  
  const routeContent = `import { NextResponse } from 'next/server';
import { getData, saveData } from '@/lib/data-store';

export async function GET() {
  const data = await getData('${entity.file}');
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const newItem = await req.json();
  const data = await getData('${entity.file}');
  const item = {
    ...newItem,
    id: newItem.id || Math.random().toString(36).substring(7),
    createdAt: newItem.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  data.push(item);
  await saveData('${entity.file}', data);
  return NextResponse.json(item, { status: 201 });
}
`;

  fs.writeFileSync(path.join(dir, 'route.ts'), routeContent, 'utf-8');

  const idRouteContent = `import { NextResponse } from 'next/server';
import { getData, saveData } from '@/lib/data-store';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const updatedFields = await req.json();
  const data = await getData('${entity.file}');
  const index = data.findIndex((item: any) => item.id === params.id);
  
  if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  
  data[index] = { ...data[index], ...updatedFields, updatedAt: new Date().toISOString() };
  await saveData('${entity.file}', data);
  
  return NextResponse.json(data[index]);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const data = await getData('${entity.file}');
  const filtered = data.filter((item: any) => item.id !== params.id);
  await saveData('${entity.file}', filtered);
  return NextResponse.json({ success: true });
}
`;

  fs.writeFileSync(path.join(idDir, 'route.ts'), idRouteContent, 'utf-8');
}
