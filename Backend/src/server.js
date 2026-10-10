import app from './app.js';
import { env } from './config/env.js';
import { testConnection } from './config/db.js';

async function start() {
  try {
    await testConnection();
    console.log('[db] koneksi PostgreSQL berhasil (SELECT 1)');
  } catch (err) {
    console.error('[db] gagal koneksi ke PostgreSQL:', err.message);
    process.exit(1);
  }

  app.listen(env.PORT, () => {
    console.log(`[server] berjalan di port ${env.PORT} (${env.NODE_ENV})`);
  });
}

start();
