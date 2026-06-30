-- Run this in your Supabase SQL Editor

CREATE TABLE decks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deck_id UUID NOT NULL REFERENCES decks(id) ON DELETE CASCADE,
  front TEXT NOT NULL,
  back TEXT NOT NULL,
  difficulty TEXT DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard')),
  last_seen TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS: decks
ALTER TABLE decks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own decks"
  ON decks FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own decks"
  ON decks FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own decks"
  ON decks FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own decks"
  ON decks FOR DELETE
  USING (user_id = auth.uid());

-- RLS: cards
ALTER TABLE cards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view cards in their decks"
  ON cards FOR SELECT
  USING (deck_id IN (SELECT id FROM decks WHERE user_id = auth.uid()));

CREATE POLICY "Users can insert cards in their decks"
  ON cards FOR INSERT
  WITH CHECK (deck_id IN (SELECT id FROM decks WHERE user_id = auth.uid()));

CREATE POLICY "Users can update cards in their decks"
  ON cards FOR UPDATE
  USING (deck_id IN (SELECT id FROM decks WHERE user_id = auth.uid()));

CREATE POLICY "Users can delete cards in their decks"
  ON cards FOR DELETE
  USING (deck_id IN (SELECT id FROM decks WHERE user_id = auth.uid()));
