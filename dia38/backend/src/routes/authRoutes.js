import { Router } from 'express';
import { body } from 'express-validator';
import { registro, login, perfil } from '../controllers/authController.js';
import { proteger } from '../middlewares/auth.js';
import { validar } from '../middlewares/validate.js';

const router = Router();

router.post(
  '/registro',
  [
    body('nombre')
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('El nombre debe tener entre 2 y 50 caracteres'),
    body('email').isEmail().withMessage('Introduce un email válido').normalizeEmail(),
    body('password')
      .isLength({ min: 6 })
      .withMessage('La contraseña debe tener al menos 6 caracteres'),
  ],
  validar,
  registro
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Introduce un email válido').normalizeEmail(),
    body('password').notEmpty().withMessage('La contraseña es obligatoria'),
  ],
  validar,
  login
);

router.get('/perfil', proteger, perfil);

export default router;
