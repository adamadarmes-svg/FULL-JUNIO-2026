import 'dotenv/config';
import dns from 'dns';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRoutes from './routes/users.js';
import taskRoutes from './routes/tasks.js';

dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);

const app = express();
const PORT = process.env.PORT || 3001;

const origenesPermitidos = ['http://localhost:5173', process.env.FRONTEND_URL].filter(Boolean);

app.use(
    cors({
        origin: origenesPermitidos,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    })
);

app.use(express.json());

app.get('/api/health', (req, res) => {
    const estado = mongoose.connection.readyState === 1 ? 'conectada' : 'desconectada';
    res.json({ status: 'ok', db: estado });
});

app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({ error: err.message || 'Error interno del servidor' });
});

try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Conectado a MongoDB');
    app.listen(PORT, () => {
        console.log(`Servidor en http://localhost:${PORT}`);
    });
} catch (error) {
    console.error(' Error al conectar con MongoDB:', error.message);
    process.exit(1);
}