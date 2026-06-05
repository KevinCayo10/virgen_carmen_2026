-- Create participants table
CREATE TABLE IF NOT EXISTS participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  registration_number TEXT UNIQUE NOT NULL,
  group_name TEXT NOT NULL,
  representative_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  category TEXT NOT NULL CHECK (category IN ('danza_ninos', 'danza_general')),
  participants_count INTEGER NOT NULL CHECK (participants_count >= 12 AND participants_count <= 20),
  music_name TEXT NOT NULL,
  has_float BOOLEAN NOT NULL DEFAULT FALSE,
  observations TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_participants_status ON participants(status);
CREATE INDEX IF NOT EXISTS idx_participants_category ON participants(category);
CREATE INDEX IF NOT EXISTS idx_participants_registration_number ON participants(registration_number);
CREATE INDEX IF NOT EXISTS idx_participants_created_at ON participants(created_at DESC);

-- Function to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
CREATE TRIGGER update_participants_updated_at
  BEFORE UPDATE ON participants
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE participants ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert (public registration)
CREATE POLICY "Anyone can insert participants"
  ON participants
  FOR INSERT
  WITH CHECK (true);

-- Policy: Only authenticated users can select
CREATE POLICY "Authenticated users can view participants"
  ON participants
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Policy: Only authenticated users can update
CREATE POLICY "Authenticated users can update participants"
  ON participants
  FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Policy: Only authenticated users can delete
CREATE POLICY "Authenticated users can delete participants"
  ON participants
  FOR DELETE
  USING (auth.role() = 'authenticated');
