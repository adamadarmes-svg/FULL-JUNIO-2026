import conectarDB from '../config/db.js';
import Product from '../models/Product.js';

export const listarProductos = async (req, res, next) => {
  try {
    await conectarDB();
    const productos = await Product.find().sort({ orden: 1 });
    res.json({ productos, total: productos.length });
  } catch (error) {
    next(error);
  }
};

export const obtenerProducto = async (req, res, next) => {
  try {
    await conectarDB();
    const producto = await Product.findOne({ slug: req.params.slug.toLowerCase() });

    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json({ producto });
  } catch (error) {
    next(error);
  }
};
