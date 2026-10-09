import dns from 'node:dns';
import 'dotenv/config';
import app from '../src/app.js';

dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);

if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
}

export default app;
