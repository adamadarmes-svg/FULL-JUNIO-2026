import { Router } from 'express';
import User from '../models/User.js';

const router = Router();

const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post('/registro', async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body ?? {};

    if (typeof email !== 'string' || typeof password !== 'string' || !email.trim() || !password) {
      return res.status(400).json({ error: 'El email y la contraseña son obligatorios' });
    }

    const emailNormalizado = email.trim().toLowerCase();

    if (!REGEX_EMAIL.test(emailNormalizado)) {
      return res.status(400).json({ error: 'El formato del email no es válido' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Las contraseñas no coinciden' });
    }

    const existente = await User.findOne({ email: emailNormalizado });
    if (existente) {
      return res.status(409).json({ error: 'El email ya está registrado' });
    }

    const usuario = await User.create({ email: emailNormalizado, password });

    return res.status(201).json({ id: usuario.id, email: usuario.email });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const [primerError] = Object.values(error.errors);
      return res.status(400).json({ error: primerError.message });
    }

    if (error.code === 11000) {
      return res.status(409).json({ error: 'El email ya está registrado' });
    }

    console.error(error);
    return res.status(500).json({ error: 'Error del servidor' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body ?? {};

    if (typeof email !== 'string' || typeof password !== 'string' || !email.trim() || !password) {
      return res.status(400).json({ error: 'El email y la contraseña son obligatorios' });
    }

    const usuario = await User.findOne({ email: email.trim().toLowerCase() });
    const passwordCorrecto = usuario ? await usuario.compararPassword(password) : false;

    if (!passwordCorrecto) {
      return res.status(401).json({ error: 'Email o contraseña incorrectos' });
    }

    return res.status(200).json({ id: usuario.id, email: usuario.email });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error del servidor' });
  }
});

export default router;
