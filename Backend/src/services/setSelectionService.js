// setSelectionService.js — logika murni pemilihan set soal & validasi jadwal.
// Dipisah dari controller agar dapat diuji tanpa koneksi database.

export const TIPE_SET_KE_TES = { pre: 'pretest', post: 'posttest', retensi: 'retensi' };
export const TES_KE_TIPE_SET = { pretest: 'pre', posttest: 'post', retensi: 'retensi' };

export const JALUR_KE_TRACK = { anak: 0, dewasa: 1, lansia: 2 };
export const TRACK_KE_JALUR = { 0: 'anak', 1: 'dewasa', 2: 'lansia' };

// Batas retensi default (hari) sesuai PRD FR-14. Hanya dipakai untuk tipe retensi.
export const RETENSI_HARI = 14;

export function tipeSetDariTes(type) {
  return TES_KE_TIPE_SET[type] ?? null;
}

export function trackDariJalur(jalur) {
  return JALUR_KE_TRACK[jalur] ?? null;
}

function keTanggal(nilai) {
  if (!nilai) return null;
  if (nilai instanceof Date) return nilai;
  const d = new Date(nilai);
  return Number.isNaN(d.getTime()) ? null : d;
}

// Status jadwal set relatif terhadap `now`:
// - 'belum'  : rilis_at di masa depan
// - 'tutup'  : tutup_at sudah lewat
// - 'aktif'  : dalam rentang jadwal
export function statusJadwal(set, now = new Date()) {
  const rilis = keTanggal(set?.rilis_at ?? set?.rilis);
  const tutup = keTanggal(set?.tutup_at ?? set?.tutup);
  const ref = keTanggal(now) ?? new Date();

  if (rilis && ref < rilis) return 'belum';
  if (tutup && ref > tutup) return 'tutup';
  return 'aktif';
}

// Set boleh dipakai peserta bila statusnya 'aktif' DAN jadwalnya sedang berjalan.
export function setTersediaUntukPeserta(set, now = new Date()) {
  if (!set) return false;
  if (set.status !== 'aktif') return false;
  return statusJadwal(set, now) === 'aktif';
}

// Pilih set terbaik dari daftar kandidat untuk (jalur, tipe tes).
// Prioritas: set aktif & dalam jadwal, terbaru (created_at) menang.
export function pilihSet(kandidat, { jalur, type, now = new Date() } = {}) {
  const tipeSet = tipeSetDariTes(type);
  if (!tipeSet) return null;

  const cocok = (kandidat ?? []).filter(
    (s) => s && s.jalur === jalur && s.tipe === tipeSet && setTersediaUntukPeserta(s, now),
  );
  if (cocok.length === 0) return null;

  cocok.sort((a, b) => {
    const ta = keTanggal(a.created_at)?.getTime() ?? 0;
    const tb = keTanggal(b.created_at)?.getTime() ?? 0;
    return tb - ta;
  });
  return cocok[0];
}

// Validasi daftar jawaban: tolak duplikat questionId dan opsi di luar rentang.
export function validasiJawaban(answers, questions) {
  const soalMap = new Map((questions ?? []).map((q) => [String(q.id), q]));
  const terlihat = new Set();
  const duplikat = [];
  const tidakDikenal = [];
  const opsiTidakValid = [];

  for (const a of answers ?? []) {
    const qid = String(a.questionId);
    if (terlihat.has(qid)) {
      duplikat.push(qid);
      continue;
    }
    terlihat.add(qid);

    const soal = soalMap.get(qid);
    if (!soal) {
      tidakDikenal.push(qid);
      continue;
    }
    const jumlahOpsi = Array.isArray(soal.opsi) ? soal.opsi.length : 0;
    const pilihan = Number(a.selectedOption);
    if (!Number.isInteger(pilihan) || pilihan < 0 || (jumlahOpsi > 0 && pilihan >= jumlahOpsi)) {
      opsiTidakValid.push({ questionId: qid, selectedOption: a.selectedOption });
    }
  }

  return { duplikat, tidakDikenal, opsiTidakValid, valid: duplikat.length === 0 && tidakDikenal.length === 0 && opsiTidakValid.length === 0 };
}

// Batas post-test per set: satu submit sukses per (peserta, set).
export function bolehMulaiPosttest(attempts, setId) {
  const relevan = (attempts ?? []).filter((a) => a.set_id === setId);
  const sudahSubmit = relevan.find((a) => a.score !== null);
  if (sudahSubmit) return { boleh: false, alasan: 'SUDAH_SUBMIT', attemptId: sudahSubmit.id };
  const pending = relevan.find((a) => a.score === null);
  return { boleh: true, attemptId: pending ? pending.id : null };
}

// Aturan retensi 14 hari: peserta boleh mengulang hanya bila sudah lewat RETENSI_HARI
// sejak submit post-test terakhir. Mengembalikan { boleh, tersediaPada }.
export function cekRetensi(posttestTerakhir, now = new Date(), hari = RETENSI_HARI) {
  if (!posttestTerakhir) return { boleh: true, tersediaPada: null };
  const dasar = keTanggal(posttestTerakhir.submitted_at ?? posttestTerakhir.created_at);
  if (!dasar) return { boleh: true, tersediaPada: null };
  const tersedia = new Date(dasar.getTime() + hari * 24 * 60 * 60 * 1000);
  const ref = keTanggal(now) ?? new Date();
  return { boleh: ref >= tersedia, tersediaPada: tersedia };
}

export default {
  TIPE_SET_KE_TES,
  TES_KE_TIPE_SET,
  JALUR_KE_TRACK,
  TRACK_KE_JALUR,
  RETENSI_HARI,
  tipeSetDariTes,
  trackDariJalur,
  statusJadwal,
  setTersediaUntukPeserta,
  pilihSet,
  validasiJawaban,
  bolehMulaiPosttest,
  cekRetensi,
};
