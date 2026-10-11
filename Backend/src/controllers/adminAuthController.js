import { z } from 'zod';
import { query } from '../config/db.js';
import { verifyPassword, issueToken } from '../services/adminAuthService.js';

export const loginSchema = z.object({
  username: z.string().trim().min(1).max(80),
  password: z.string().min(1).max(200),
});

export async function login(req, res, next) {
  try {
    const { username, password } = req.body;

    const { rows } = await query(
      `SELECT id, username, password_hash, role, active
       FROM admin_users WHERE username = $1 LIMIT 1`,
      [username],
    );

    const admin = rows[0];
    const valid = admin && admin.active && verifyPassword(password, admin.password_hash);

    if (!valid) {
      return res.status(401).json({
        error: { code: 'INVALID_CREDENTIALS', message: 'Username atau password salah.' },
      });
    }

    const token = issueToken(admin);
    res.json({
      token,
      admin: { id: admin.id, username: admin.username, role: admin.role },
    });
  } catch (err) {
    next(err);
  }
}

export async function me(req, res) {
  res.json({ admin: req.admin });
}

export default { login, me };
