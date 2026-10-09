import { Router } from 'express';
import { listarProductos, obtenerProducto } from '../controllers/productController.js';

const router = Router();

router.get('/', listarProductos);
router.get('/:slug', obtenerProducto);

export default router;
