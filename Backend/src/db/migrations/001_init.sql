-- 001_init.sql — Skema MVP TangkisTipu

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS class_codes (
  code       TEXT PRIMARY KEY,
  label      TEXT,
  active     BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS participants (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  token      TEXT NOT NULL UNIQUE,
  nickname   TEXT,
  track      INT NOT NULL DEFAULT 1 CHECK (track BETWEEN 0 AND 2),
  class_code TEXT REFERENCES class_codes(code) ON UPDATE CASCADE ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_participants_token ON participants(token);

CREATE TABLE IF NOT EXISTS progress (
  participant_id UUID PRIMARY KEY REFERENCES participants(id) ON DELETE CASCADE,
  pretest_score  INT,
  modus_dibaca   INT NOT NULL DEFAULT 0,
  skenario       INT NOT NULL DEFAULT 0,
  posttest_score INT,
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS questions (
  id          TEXT PRIMARY KEY,
  track       INT NOT NULL CHECK (track BETWEEN 0 AND 2),
  type        TEXT NOT NULL DEFAULT 'pretest',
  kategori    TEXT,
  pertanyaan  TEXT NOT NULL,
  opsi        JSONB NOT NULL DEFAULT '[]'::jsonb,
  kunci       INT NOT NULL,
  penjelasan  TEXT,
  kasus_nyata TEXT,
  active      BOOLEAN NOT NULL DEFAULT TRUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_questions_track_type ON questions(track, type);

CREATE TABLE IF NOT EXISTS test_attempts (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_id UUID NOT NULL REFERENCES participants(id) ON DELETE CASCADE,
  type           TEXT NOT NULL CHECK (type IN ('pretest', 'posttest')),
  score          INT,
  passed         BOOLEAN NOT NULL DEFAULT FALSE,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_test_attempts_participant ON test_attempts(participant_id);

CREATE TABLE IF NOT EXISTS answers (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  attempt_id      UUID NOT NULL REFERENCES test_attempts(id) ON DELETE CASCADE,
  question_id     TEXT NOT NULL REFERENCES questions(id) ON UPDATE CASCADE ON DELETE RESTRICT,
  selected_option INT NOT NULL,
  is_correct      BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE INDEX IF NOT EXISTS idx_answers_attempt ON answers(attempt_id);
