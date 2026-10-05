import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import conectarDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import { noEncontrado, manejarErrores } from './middlewares/errorHandler.js';

const app = express();

const origenesPermitidos = ['http://localhost:5173', process.env.FRONTEND_URL].filter(Boolean);

app.use(
  cors({
    origin: (origen, callback) => {
      if (!origen || origenesPermitidos.includes(origen) || /\.vercel\.app$/.test(origen)) {
        return callback(null, true);
      }

      const error = new Error('Origen no permitido por CORS');
      error.status = 403;
      callback(error);
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.get('/api/health', async (req, res) => {
  try {
    await conectarDB();
  } catch (error) {
    console.error(error.message);
  }

  res.json({
    status: 'ok',
    db: mongoose.connection.readyState === 1 ? 'conectada' : 'desconectada',
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/posts/:postId/comments', commentRoutes);
app.use('/api/posts', postRoutes);

app.use(noEncontrado);
app.use(manejarErrores);

export default app;
