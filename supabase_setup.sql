-- Create tables for Codly AI Admin Panel

-- Models Table
CREATE TABLE public.models (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    provider TEXT NOT NULL,
    description TEXT,
    category TEXT,
    tags JSONB DEFAULT '[]',
    huggingFaceRepo TEXT,
    fileName TEXT,
    fileSizeGB NUMERIC,
    quantization TEXT,
    recommendedDevices JSONB DEFAULT '[]',
    minimumRAM INTEGER,
    isFeatured BOOLEAN DEFAULT false,
    isPopular BOOLEAN DEFAULT false,
    license TEXT,
    downloadURL TEXT,
    iconURL TEXT,
    bannerURL TEXT,
    screenshots JSONB DEFAULT '[]',
    createdAt TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updatedAt TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- News Table
CREATE TABLE public.news (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT,
    tags JSONB DEFAULT '[]',
    coverImageURL TEXT,
    createdAt TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updatedAt TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Tips Table
CREATE TABLE public.tips (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT,
    iconName TEXT,
    actionURL TEXT,
    createdAt TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updatedAt TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Banners Table
CREATE TABLE public.banners (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    subtitle TEXT NOT NULL,
    imageURL TEXT NOT NULL,
    actionURL TEXT,
    backgroundColor TEXT,
    textColor TEXT,
    createdAt TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updatedAt TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Categories Table
CREATE TABLE public.categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    iconName TEXT,
    displayOrder INTEGER DEFAULT 0,
    createdAt TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updatedAt TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable Row Level Security (RLS) but allow all for authenticated requests
-- Since we are using service_role key on the server, RLS is bypassed anyway,
-- but it's good practice to enable it if we ever use anon keys.
ALTER TABLE public.models ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tips ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read" ON public.models FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON public.news FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON public.tips FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON public.banners FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON public.categories FOR SELECT USING (true);
