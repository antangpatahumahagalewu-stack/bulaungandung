-- Run this SQL in the Supabase SQL Editor:
-- https://vjawydgaaetvyanbxgpm.supabase.co → SQL Editor

CREATE TABLE IF NOT EXISTS subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  locale TEXT DEFAULT 'id'
);
