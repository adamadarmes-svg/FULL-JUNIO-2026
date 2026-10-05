import conectarDB from '../config/db.js';
import User from '../models/User.js';
import { generarToken } from '../utils/jwt.js';

export const registro = async (req, res, next) => {
  try {
    const { nombre, email, password } = req.body;

    await conectarDB();

    const existe = await User.findOne({ email });

    if (existe) {
      return res.status(409).json({ error: 'Ese email ya está registrado' });
    }

    const usuario = await User.create({ nombre, email, password });
    const token = generarToken(usuario);

    res.status(201).json({ usuario: usuario.toJSON(), token });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    await conectarDB();

    const usuario = await User.findOne({ email }).select('+password');

    if (!usuario || !(await usuario.compararPassword(password))) {
      return res.status(401).json({ error: 'Email o contraseña incorrectos' });
    }

    const token = generarToken(usuario);

    res.status(200).json({ usuario: usuario.toJSON(), token });
  } catch (error) {
    next(error);
  }
};

export const perfil = (req, res) => {
  res.status(200).json({ usuario: req.usuario });
};
