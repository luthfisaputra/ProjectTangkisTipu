-- 002_answers_nullable.sql — soal tidak dijawab disimpan sebagai NULL
ALTER TABLE answers ALTER COLUMN selected_option DROP NOT NULL;
