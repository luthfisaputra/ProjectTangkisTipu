import crypto from 'node:crypto';
import { query } from '../config/db.js';

const TOKEN_BYTES = 16;
const MAX_ATTEMPTS = 5;

export function generateToken() {
  return crypto.randomBytes(TOKEN_BYTES).toString('hex');
}

export async function tokenExists(token) {
  const { rows } = await query('SELECT 1 FROM participants WHERE token = $1 LIMIT 1', [token]);
  return rows.length > 0;
}

export async function generateUniqueToken() {
  for (let i = 0; i < MAX_ATTEMPTS; i += 1) {
    const token = generateToken();
    if (!(await tokenExists(token))) return token;
  }
  throw new Error('Gagal membuat token unik setelah beberapa percobaan');
}

export default { generateToken, tokenExists, generateUniqueToken };
