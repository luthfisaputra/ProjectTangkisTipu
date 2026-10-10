import { z } from 'zod';
import { query } from '../config/db.js';

export const validateClassCodeSchema = z.object({
  code: z.string().trim().min(1).max(40),
});

export async function validateClassCode(req, res, next) {
  try {
    const { code } = req.body;
    const { rows } = await query(
      'SELECT code, label FROM class_codes WHERE code = $1 AND active = TRUE LIMIT 1',
      [code],
    );

    if (rows.length === 0) {
      return res.json({ valid: false });
    }

    res.json({ valid: true, code: rows[0].code, label: rows[0].label });
  } catch (err) {
    next(err);
  }
}

export default { validateClassCode };
