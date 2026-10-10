export class AppError extends Error {
  constructor(code, message, status = 400) {
    super(message);
    this.code = code;
    this.status = status;
  }
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  const status = err.status || err.statusCode || 500;
  const code = err.code || (status === 500 ? 'INTERNAL_ERROR' : 'ERROR');
  const message =
    status === 500 && process.env.NODE_ENV === 'production'
      ? 'Terjadi kesalahan pada server.'
      : err.message || 'Terjadi kesalahan.';

  if (status >= 500) {
    console.error('[error]', err);
  }

  res.status(status).json({ error: { code, message } });
}

export default errorHandler;
