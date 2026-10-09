import conectarDB from '../config/db.js';
import MenuItem from '../models/MenuItem.js';

export const listarMenu = async (req, res, next) => {
  try {
    await conectarDB();
    const items = await MenuItem.find().sort({ orden: 1 });

    const principal = items.filter((item) => item.tipo === 'principal');
    const secundario = items.filter((item) => item.tipo === 'secundario');

    res.json({ principal, secundario });
  } catch (error) {
    next(error);
  }
};
