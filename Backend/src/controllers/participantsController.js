import { z } from 'zod';
import { query } from '../config/db.js';
import { generateUniqueToken } from '../services/tokenService.js';

export const createParticipantSchema = z.object({
  nickname: z.string().trim().min(1).max(60).optional(),
  track: z.coerce.number().int().min(0).max(2).optional(),
  classCode: z.string().trim().min(1).max(40).optional(),
});

export const tokenParamSchema = z.object({
  token: z.string().trim().regex(/^TKP-[A-Z0-9]{8}$/, 'Format token tidak valid'),
});

export async function createParticipant(req, res, next) {
  try {
    const { nickname, track, classCode } = req.body;

    let validClassCode = null;
    if (classCode) {
      const { rows } = await query(
        'SELECT code FROM class_codes WHERE code = $1 AND active = TRUE LIMIT 1',
        [classCode],
      );
      if (rows.length > 0) validClassCode = rows[0].code;
    }

    const token = await generateUniqueToken();

    const { rows } = await query(
      `INSERT INTO participants (token, nickname, track, class_code)
       VALUES ($1, $2, $3, $4)
       RETURNING id, token, nickname, track, class_code, created_at`,
      [token, nickname ?? null, track ?? 1, validClassCode],
    );

    const participant = rows[0];

    await query(
      'INSERT INTO progress (participant_id) VALUES ($1) ON CONFLICT (participant_id) DO NOTHING',
      [participant.id],
    );

    res.status(201).json({
      token: participant.token,
      participant: {
        id: participant.id,
        nickname: participant.nickname,
        track: participant.track,
        classCode: participant.class_code,
        createdAt: participant.created_at,
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function getParticipant(req, res, next) {
  try {
    const { token } = req.params;
    const { rows } = await query(
      `SELECT id, token, nickname, track, class_code, created_at
       FROM participants WHERE token = $1 LIMIT 1`,
      [token],
    );

    if (rows.length === 0) {
      return res.status(404).json({
        error: { code: 'NOT_FOUND', message: 'Peserta tidak ditemukan.' },
      });
    }

    const p = rows[0];
    res.json({
      participant: {
        id: p.id,
        token: p.token,
        nickname: p.nickname,
        track: p.track,
        classCode: p.class_code,
        createdAt: p.created_at,
      },
    });
  } catch (err) {
    next(err);
  }
}

export default { createParticipant, getParticipant };
