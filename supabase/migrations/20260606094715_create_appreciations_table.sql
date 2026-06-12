/*
# Create appreciations table

1. New Tables
- `appreciations`: User appreciation/ratings for travels
  - `id` (uuid, primary key)
  - `travel_id` (uuid, foreign key to travels)
  - `user_id` (uuid, foreign key to auth.users)
  - `rating` (integer, 1-5 stars)
  - `created_at` (timestamp)
  - Unique constraint on (travel_id, user_id) to prevent duplicate appreciations

2. Security
- Enable RLS on `appreciations`
- Anyone can view appreciation counts
- Only authenticated users can insert appreciations (one per travel)
- Users can only update/delete their own appreciations
*/

CREATE TABLE IF NOT EXISTS appreciations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  travel_id uuid NOT NULL REFERENCES travels(id) ON DELETE CASCADE,
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  created_at timestamptz DEFAULT now(),
  UNIQUE(travel_id, user_id)
);

ALTER TABLE appreciations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view appreciations" ON appreciations;
CREATE POLICY "Anyone can view appreciations"
ON appreciations FOR SELECT
TO authenticated, anon
USING (true);

DROP POLICY IF EXISTS "Users can insert appreciations" ON appreciations;
CREATE POLICY "Users can insert appreciations"
ON appreciations FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own appreciations" ON appreciations;
CREATE POLICY "Users can update own appreciations"
ON appreciations FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own appreciations" ON appreciations;
CREATE POLICY "Users can delete own appreciations"
ON appreciations FOR DELETE
TO authenticated
USING (auth.uid() = user_id);