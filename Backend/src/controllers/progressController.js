import { z } from 'zod';
import { query } from '../config/db.js';

export const progressTokenParamSchema = z.object({
  token: z.string().trim().regex(/^TKP-[A-Z0-9]{8}$/, 'Format token tidak valid'),
});

export const updateProgressSchema = z
  .object({
    modusDibaca: z.coerce.number().int().min(0).max(8).optional(),
    skenario: z.coerce.number().int().min(0).max(8).optional(),
  })
  .strict();

async function findParticipantId(token) {
  const { rows } = await query(
    'SELECT id FROM participants WHERE token = $1 LIMIT 1',
    [token],
  );
  return rows.length > 0 ? rows[0].id : null;
}

function formatProgress(row) {
  return {
    pretest: row.pretest_score ?? 0,
    modusDibaca: row.modus_dibaca ?? 0,
    skenario: row.skenario ?? 0,
    posttest: row.posttest_score ?? 0,
    updatedAt: row.updated_at,
  };
}

export async function getProgress(req, res, next) {
  try {
    const { token } = req.params;
    const participantId = await findParticipantId(token);

    if (!participantId) {
      return res.status(404).json({
        error: { code: 'NOT_FOUND', message: 'Peserta tidak ditemukan.' },
      });
    }

    const { rows } = await query(
      `SELECT pretest_score, modus_dibaca, skenario, posttest_score, updated_at
       FROM progress WHERE participant_id = $1 LIMIT 1`,
      [participantId],
    );

    if (rows.length === 0) {
      return res.json({
        progress: { pretest: 0, modusDibaca: 0, skenario: 0, posttest: 0, updatedAt: null },
      });
    }

    res.json({ progress: formatProgress(rows[0]) });
  } catch (err) {
    next(err);
  }
}

export async function updateProgress(req, res, next) {
  try {
    const { token } = req.params;
    const { modusDibaca, skenario } = req.body;
    const participantId = await findParticipantId(token);

    if (!participantId) {
      return res.status(404).json({
        error: { code: 'NOT_FOUND', message: 'Peserta tidak ditemukan.' },
      });
    }

    // Update parsial: hanya field yang dikirim yang diubah. Field yang tidak
    // dikirim dipertahankan (COALESCE) dan nilai lama tidak boleh turun (GREATEST).
    const { rows } = await query(
      `INSERT INTO progress (participant_id, modus_dibaca, skenario)
       VALUES ($1, COALESCE($2, 0), COALESCE($3, 0))
       ON CONFLICT (participant_id) DO UPDATE SET
         modus_dibaca = CASE
           WHEN $2 IS NULL THEN progress.modus_dibaca
           ELSE GREATEST(progress.modus_dibaca, $2)
         END,
         skenario = CASE
           WHEN $3 IS NULL THEN progress.skenario
           ELSE GREATEST(progress.skenario, $3)
         END,
         updated_at = NOW()
       RETURNING pretest_score, modus_dibaca, skenario, posttest_score, updated_at`,
      [participantId, modusDibaca ?? null, skenario ?? null],
    );

    res.json({ progress: formatProgress(rows[0]) });
  } catch (err) {
    next(err);
  }
}

export default { getProgress, updateProgress };
