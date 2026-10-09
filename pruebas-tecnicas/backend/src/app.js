import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import productRoutes from './routes/productRoutes.js';
import menuRoutes from './routes/menuRoutes.js';
import { noEncontrado, manejarErrores } from './middlewares/errorHandler.js';

const app = express();

const origenesPermitidos = ['http://localhost:5173', process.env.FRONTEND_URL].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || origenesPermitidos.includes(origin) || origin.endsWith('.vercel.app')) {
        return callback(null, true);
      }
      const error = new Error('Origen no permitido por CORS');
      error.status = 403;
      callback(error);
    },
    methods: ['GET', 'OPTIONS'],
  })
);

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    db: mongoose.connection.readyState === 1 ? 'conectada' : 'desconectada',
  });
});

app.use('/api/products', productRoutes);
app.use('/api/menu', menuRoutes);

app.use(noEncontrado);
app.use(manejarErrores);

export default app;
