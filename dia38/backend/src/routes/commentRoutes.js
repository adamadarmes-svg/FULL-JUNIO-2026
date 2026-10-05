import express from 'express';
import { body } from 'express-validator';
import {
  listarComentarios,
  crearComentario,
  actualizarComentario,
  eliminarComentario,
} from '../controllers/commentController.js';
import { proteger } from '../middlewares/auth.js';
import { validar } from '../middlewares/validate.js';

const router = express.Router({ mergeParams: true });

const validarContenido = body('contenido')
  .trim()
  .isLength({ min: 1, max: 500 })
  .withMessage('El comentario debe tener entre 1 y 500 caracteres');

router.get('/', listarComentarios);
router.post('/', proteger, validarContenido, validar, crearComentario);
router.put('/:comentarioId', proteger, validarContenido, validar, actualizarComentario);
router.delete('/:comentarioId', proteger, eliminarComentario);

export default router;
