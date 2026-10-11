import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, 'data');

// Pemetaan field sumber (frontend) -> kolom database.
// Soal pretest: id, kategori, pertanyaan, opsi, kunci, penjelasan, kasusNyata -> kasus_nyata.
// Set soal: id, nama, catatan, jalur, tipe, status, rilis -> rilis_at, tutup -> tutup_at.
// Relasi set<->kode kelas: kodeKelas -> pivot set_class_codes(set_id, code).
export const FIELD_MAP = {
  questions: {
    id: 'id',
    kategori: 'kategori',
    pertanyaan: 'pertanyaan',
    opsi: 'opsi',
    kunci: 'kunci',
    penjelasan: 'penjelasan',
    kasusNyata: 'kasus_nyata',
  },
  questionSets: {
    id: 'id',
    nama: 'nama',
    catatan: 'catatan',
    jalur: 'jalur',
    tipe: 'tipe',
    status: 'status',
    rilis: 'rilis_at',
    tutup: 'tutup_at',
  },
};

export async function loadPretestQuestions() {
  const raw = await readFile(path.join(DATA_DIR, 'pretest-questions.json'), 'utf8');
  return JSON.parse(raw);
}

export async function loadQuestionSets() {
  const raw = await readFile(path.join(DATA_DIR, 'question-sets.json'), 'utf8');
  return JSON.parse(raw);
}

// Normalisasi tanggal: '' / undefined -> null agar cocok dengan kolom DATE nullable.
export function toDateOrNull(value) {
  if (value === undefined || value === null) return null;
  const trimmed = String(value).trim();
  return trimmed === '' ? null : trimmed;
}

// Validasi ringan data seed sebelum menyentuh database.
export function validatePretestData(data) {
  const errors = [];
  if (!data || !Array.isArray(data.tracks)) {
    errors.push('tracks harus berupa array');
    return errors;
  }
  const seen = new Set();
  for (const track of data.tracks) {
    if (!Number.isInteger(track.track) || track.track < 0 || track.track > 2) {
      errors.push(`track tidak valid: ${track.track}`);
    }
    if (!Array.isArray(track.questions)) {
      errors.push(`track ${track.track}: questions harus array`);
      continue;
    }
    for (const q of track.questions) {
      if (!q.id) errors.push(`track ${track.track}: soal tanpa id`);
      if (seen.has(q.id)) errors.push(`id soal duplikat: ${q.id}`);
      seen.add(q.id);
      if (!Array.isArray(q.opsi) || q.opsi.length < 2) {
        errors.push(`soal ${q.id}: opsi minimal 2`);
      }
      if (!Number.isInteger(q.kunci) || q.kunci < 0 || q.kunci >= (q.opsi?.length ?? 0)) {
        errors.push(`soal ${q.id}: kunci di luar rentang opsi`);
      }
    }
  }
  return errors;
}

export function validateQuestionSetsData(data) {
  const errors = [];
  if (!data || !Array.isArray(data.sets)) {
    errors.push('sets harus berupa array');
    return errors;
  }
  const jalur = new Set(['anak', 'dewasa', 'lansia']);
  const tipe = new Set(['pre', 'post', 'retensi']);
  const status = new Set(['draf', 'terjadwal', 'aktif']);
  const seen = new Set();
  for (const s of data.sets) {
    if (!s.id) errors.push('set tanpa id');
    if (seen.has(s.id)) errors.push(`id set duplikat: ${s.id}`);
    seen.add(s.id);
    if (!s.nama) errors.push(`set ${s.id}: nama wajib`);
    if (!jalur.has(s.jalur)) errors.push(`set ${s.id}: jalur tidak valid`);
    if (!tipe.has(s.tipe)) errors.push(`set ${s.id}: tipe tidak valid`);
    if (!status.has(s.status)) errors.push(`set ${s.id}: status tidak valid`);
  }
  return errors;
}
