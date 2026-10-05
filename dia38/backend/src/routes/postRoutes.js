import { Router } from 'express';
import { body } from 'express-validator';
import {
  listarPosts,
  obtenerPost,
  crearPost,
  actualizarPost,
  eliminarPost,
} from '../controllers/postController.js';
import { proteger } from '../middlewares/auth.js';
import { validar } from '../middlewares/validate.js';

const router = Router();

const validarTitulo = body('titulo')
  .trim()
  .isLength({ min: 3, max: 120 })
  .withMessage('El título debe tener entre 3 y 120 caracteres');

const validarContenido = body('contenido')
  .trim()
  .isLength({ min: 10, max: 5000 })
  .withMessage('El contenido debe tener entre 10 y 5000 caracteres');

router.get('/', listarPosts);
router.get('/:id', obtenerPost);

router.post(
  '/',
  proteger,
  [
    validarTitulo,
    validarContenido,
    body('imagen').notEmpty().withMessage('La imagen es obligatoria'),
  ],
  validar,
  crearPost
);

router.put(
  '/:id',
  proteger,
  [
    validarTitulo,
    validarContenido,
    body('imagen').optional().notEmpty().withMessage('La imagen no puede estar vacía'),
  ],
  validar,
  actualizarPost
);

router.delete('/:id', proteger, eliminarPost);

export default router;
