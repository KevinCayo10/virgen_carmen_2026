ALTER TABLE participants ADD COLUMN active BOOLEAN NOT NULL DEFAULT TRUE;

CREATE INDEX IF NOT EXISTS idx_participants_active ON participants(active);
