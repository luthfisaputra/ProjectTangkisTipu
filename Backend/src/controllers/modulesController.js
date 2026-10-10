import { z } from 'zod';

const MODULES = [
  {
    id: 'pelajar-01',
    num: '01',
    jalur: 'Jalur Pelajar & Remaja',
    kategori: 'Trik Akun & Game',
    durasi: '3 Menit',
    level: 'Dasar',
    title: 'Jebakan Diamond & Akun Game Murah',
  },
];

export const moduleIdParamSchema = z.object({
  id: z.string().trim().min(1).max(60),
});

export function listModules(req, res) {
  res.json({ modules: MODULES });
}

export function getModule(req, res) {
  const { id } = req.params;
  const modul = MODULES.find((m) => m.id === id);

  if (!modul) {
    return res.status(404).json({
      error: { code: 'NOT_FOUND', message: 'Modul tidak ditemukan.' },
    });
  }

  res.json({ module: modul });
}

export default { listModules, getModule };
