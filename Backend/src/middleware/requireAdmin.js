import { verifyToken } from '../services/adminAuthService.js';

export function requireAdmin(req, res, next) {
  const header = req.headers.authorization || '';
  const [scheme, token] = header.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({
      error: { code: 'UNAUTHORIZED', message: 'Autentikasi admin diperlukan.' },
    });
  }

  const payload = verifyToken(token);
  if (!payload) {
    return res.status(401).json({
      error: { code: 'INVALID_TOKEN', message: 'Token admin tidak valid atau kedaluwarsa.' },
    });
  }

  req.admin = { id: payload.sub, username: payload.username, role: payload.role };
  return next();
}

export default requireAdmin;
