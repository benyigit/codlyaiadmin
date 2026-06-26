import { NextResponse } from 'next/server';
import { getData } from '@/lib/data-store';

export async function GET() {
  const tips = await getData('tips.json');
  const news = await getData('news.json');
  const banners = await getData('banners.json');
  const categories = await getData('categories.json');
  
  return NextResponse.json({
    tips,
    news,
    banners,
    categories
  });
}
