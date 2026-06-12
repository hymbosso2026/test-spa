/*
# Create travels table

1. New Tables
- `travels`: User travel posts
  - `id` (uuid, primary key)
  - `user_id` (uuid, foreign key to auth.users, defaults to current user)
  - `title` (text, not null)
  - `description` (text)
  - `cover_image_url` (text, optional)
  - `appreciation_count` (integer, default 0)
  - `total_appreciations` (integer, for rating calculation)
  - `created_at` (timestamp)
  - `updated_at` (timestamp)

2. Security
- Enable RLS on `travels`
- Anyone can view travels
- Only owners can insert/update/delete their travels
*/

CREATE TABLE IF NOT EXISTS travels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  cover_image_url text,
  appreciation_count integer DEFAULT 0,
  total_appreciations integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE travels ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view travels" ON travels;
CREATE POLICY "Anyone can view travels"
ON travels FOR SELECT
TO authenticated, anon
USING (true);

DROP POLICY IF EXISTS "Users can insert own travels" ON travels;
CREATE POLICY "Users can insert own travels"
ON travels FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own travels" ON travels;
CREATE POLICY "Users can update own travels"
ON travels FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own travels" ON travels;
CREATE POLICY "Users can delete own travels"
ON travels FOR DELETE
TO authenticated
USING (auth.uid() = user_id);