-- Run this SQL in your Supabase SQL Editor to drop and recreate Banners, News, and Tips tables with matching columns.

-- 1. DROP old tables (Caution: this resets old dummy data in these three tables)
DROP TABLE IF EXISTS public.banners CASCADE;
DROP TABLE IF EXISTS public.news CASCADE;
DROP TABLE IF EXISTS public.tips CASCADE;

-- 2. CREATE Banners Table
CREATE TABLE public.banners (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    subtitle TEXT NOT NULL,
    symbol TEXT NOT NULL,
    linkedmodelid TEXT,
    titletr TEXT,
    titlede TEXT,
    subtitletr TEXT,
    subtitlede TEXT,
    createdat TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updatedat TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 3. CREATE News Table
CREATE TABLE public.news (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    summary TEXT NOT NULL,
    tag TEXT NOT NULL,
    datelabel TEXT NOT NULL,
    titletr TEXT,
    titlede TEXT,
    summarytr TEXT,
    summaryde TEXT,
    tagtr TEXT,
    tagde TEXT,
    datelabeltr TEXT,
    datelabelde TEXT,
    createdat TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updatedat TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 4. CREATE Tips Table
CREATE TABLE public.tips (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    symbol TEXT NOT NULL,
    titletr TEXT,
    titlede TEXT,
    bodytr TEXT,
    bodyde TEXT,
    createdat TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updatedat TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 5. ENABLE ROW LEVEL SECURITY
ALTER TABLE public.banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tips ENABLE ROW LEVEL SECURITY;

-- 6. CREATE SELECT POLICIES
CREATE POLICY "Allow public read" ON public.banners FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON public.news FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON public.tips FOR SELECT USING (true);
