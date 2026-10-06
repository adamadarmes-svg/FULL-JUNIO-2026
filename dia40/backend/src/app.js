import express from 'express';
import cors from 'cors';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { totalUsuarios, listarUsuarios } from './models/salaModel.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const origenesPermitidos = ['http://localhost:5173', process.env.FRONTEND_URL].filter(Boolean);

const app = express();

app.use(
  cors({
    origin(origen, callback) {
      if (
        !origen ||
        origenesPermitidos.includes(origen) ||
        origen.endsWith('.vercel.app') ||
        origen.endsWith('.netlify.app')
      ) {
        callback(null, true);
        return;
      }
      callback(new Error('Origen no permitido por CORS'));
    }
  })
);

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', usuarios: totalUsuarios() });
});

app.get('/api/usuarios', (req, res) => {
  res.json(listarUsuarios());
});

export default app;
