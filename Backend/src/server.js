import app from './app.js';
import { env } from './config/env.js';

app.listen(env.PORT, () => {
  console.log(`[server] berjalan di port ${env.PORT} (${env.NODE_ENV})`);
});
