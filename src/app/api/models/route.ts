import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { toLowerKeys, toCamelKeys } from '@/lib/db-utils';

export async function GET() {
  const { data, error } = await supabase.from('models').select('*').order('createdat', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  
  // Wrap in the structure expected by iOS ModelCatalogService
  return NextResponse.json({
    version: 1,
    updatedAt: new Date().toISOString(),
    models: data ? toCamelKeys(data) : []
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { data, error } = await supabase.from('models').insert(toLowerKeys(body)).select().single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(toCamelKeys(data));
  } catch (err) {
    return NextResponse.json({ error: 'Failed to create' }, { status: 500 });
  }
}
