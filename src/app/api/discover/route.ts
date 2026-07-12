export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  const [news, tips, banners, categories] = await Promise.all([
    supabase.from('news').select('*').order('createdat', { ascending: false }),
    supabase.from('tips').select('*').order('createdat', { ascending: false }),
    supabase.from('banners').select('*').order('createdat', { ascending: false }),
    supabase.from('categories').select('*').order('displayorder', { ascending: true })
  ]);
  
  return NextResponse.json({
    news: news.data || [],
    tips: tips.data || [],
    banners: banners.data || [],
    categories: categories.data || []
  });
}
