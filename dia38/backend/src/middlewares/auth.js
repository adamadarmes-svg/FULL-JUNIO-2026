import conectarDB from '../config/db.js';
import User from '../models/User.js';
import { verificarToken } from '../utils/jwt.js';

const extraerToken = (req) => {
  const cabecera = req.headers.authorization;
  if (!cabecera || !cabecera.startsWith('Bearer ')) return null;
  const token = cabecera.split(' ')[1];
  return token || null;
};

export const proteger = async (req, res, next) => {
  try {
    const token = extraerToken(req);

    if (!token) {
      return res.status(401).json({ error: 'No autorizado. Inicia sesión para continuar' });
    }

    const payload = verificarToken(token);

    if (!payload) {
      return res.status(401).json({ error: 'Sesión expirada o token inválido' });
    }

    await conectarDB();
    const usuario = await User.findById(payload.id);

    if (!usuario) {
      return res.status(401).json({ error: 'El usuario de esta sesión ya no existe' });
    }

    req.usuario = usuario;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const opcional = async (req, res, next) => {
  req.usuario = null;

  try {
    const token = extraerToken(req);
    const payload = token ? verificarToken(token) : null;

    if (payload) {
      await conectarDB();
      req.usuario = (await User.findById(payload.id)) || null;
    }
  } catch {
    req.usuario = null;
  }

  next();
};

export const soloAdmin = (req, res, next) => {
  if (!req.usuario || req.usuario.rol !== 'admin') {
    return res.status(403).json({ error: 'Acceso restringido a administradores' });
  }

  next();
};
