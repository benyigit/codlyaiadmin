-- Run this SQL in your Supabase SQL Editor to add localization columns to the models table

ALTER TABLE public.models ADD COLUMN IF NOT EXISTS nametr TEXT;
ALTER TABLE public.models ADD COLUMN IF NOT EXISTS namede TEXT;
ALTER TABLE public.models ADD COLUMN IF NOT EXISTS descriptiontr TEXT;
ALTER TABLE public.models ADD COLUMN IF NOT EXISTS descriptionde TEXT;
ALTER TABLE public.models ADD COLUMN IF NOT EXISTS categorytr TEXT;
ALTER TABLE public.models ADD COLUMN IF NOT EXISTS categoryde TEXT;
ALTER TABLE public.models ADD COLUMN IF NOT EXISTS tagstr JSONB DEFAULT '[]';
ALTER TABLE public.models ADD COLUMN IF NOT EXISTS tagsde JSONB DEFAULT '[]';
