/*
# Create photos table

1. New Tables
- `photos`: Photos for travels
  - `id` (uuid, primary key)
  - `travel_id` (uuid, foreign key to travels)
  - `user_id` (uuid, foreign key to auth.users, for quick ownership checks)
  - `image_url` (text, not null)
  - `caption` (text)
  - `created_at` (timestamp)

2. Security
- Enable RLS on `photos`
- Anyone can view photos
- Only travel owners can insert/update/delete photos
*/

CREATE TABLE IF NOT EXISTS photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  travel_id uuid NOT NULL REFERENCES travels(id) ON DELETE CASCADE,
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  caption text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE photos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view photos" ON photos;
CREATE POLICY "Anyone can view photos"
ON photos FOR SELECT
TO authenticated, anon
USING (true);

DROP POLICY IF EXISTS "Users can insert photos on own travels" ON photos;
CREATE POLICY "Users can insert photos on own travels"
ON photos FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM travels
    WHERE travels.id = photos.travel_id
    AND travels.user_id = auth.uid()
  )
);

DROP POLICY IF EXISTS "Users can update own photos" ON photos;
CREATE POLICY "Users can update own photos"
ON photos FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own photos" ON photos;
CREATE POLICY "Users can delete own photos"
ON photos FOR DELETE
TO authenticated
USING (auth.uid() = user_id);