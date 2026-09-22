import { Router } from 'express';
import mongoose from 'mongoose';
import Task from '../models/Task.js';
import User from '../models/User.js';

const router = Router();

const esIdValido = (id) => typeof id === 'string' && mongoose.isValidObjectId(id);

const tituloValido = (titulo) => typeof titulo === 'string' && titulo.trim() !== '';

const descripcionValida = (descripcion) => descripcion === undefined || typeof descripcion === 'string';

const manejarError = (res, error) => {
  if (error.name === 'ValidationError') {
    const [primerError] = Object.values(error.errors);
    return res.status(400).json({ error: primerError.message });
  }

  console.error(error);
  return res.status(500).json({ error: 'Error del servidor' });
};

router.get('/', async (req, res) => {
  try {
    const { userId } = req.query;

    if (!esIdValido(userId)) {
      return res.status(400).json({ error: 'El userId es obligatorio y debe ser válido' });
    }

    const tareas = await Task.find({ userId }).sort({ createdAt: -1 });

    return res.json(tareas);
  } catch (error) {
    return manejarError(res, error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!esIdValido(id)) {
      return res.status(400).json({ error: 'El id de la tarea no es válido' });
    }

    const tarea = await Task.findById(id);

    if (!tarea) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    return res.json(tarea);
  } catch (error) {
    return manejarError(res, error);
  }
});

router.post('/', async (req, res) => {
  try {
    const { titulo, descripcion, userId } = req.body ?? {};

    if (!tituloValido(titulo)) {
      return res.status(400).json({ error: 'El título es obligatorio' });
    }

    if (!descripcionValida(descripcion)) {
      return res.status(400).json({ error: 'La descripción debe ser texto' });
    }

    if (!esIdValido(userId)) {
      return res.status(400).json({ error: 'El userId es obligatorio y debe ser válido' });
    }

    const usuarioExiste = await User.exists({ _id: userId });

    if (!usuarioExiste) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const tarea = await Task.create({ titulo, descripcion, userId });

    return res.status(201).json(tarea);
  } catch (error) {
    return manejarError(res, error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descripcion } = req.body ?? {};

    if (!esIdValido(id)) {
      return res.status(400).json({ error: 'El id de la tarea no es válido' });
    }

    if (!tituloValido(titulo)) {
      return res.status(400).json({ error: 'El título es obligatorio' });
    }

    if (!descripcionValida(descripcion)) {
      return res.status(400).json({ error: 'La descripción debe ser texto' });
    }

    const cambios = { titulo };
    if (descripcion !== undefined) {
      cambios.descripcion = descripcion;
    }

    const tarea = await Task.findByIdAndUpdate(id, cambios, { new: true, runValidators: true });

    if (!tarea) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    return res.json(tarea);
  } catch (error) {
    return manejarError(res, error);
  }
});

router.patch('/:id/toggle', async (req, res) => {
  try {
    const { id } = req.params;

    if (!esIdValido(id)) {
      return res.status(400).json({ error: 'El id de la tarea no es válido' });
    }

    const tarea = await Task.findById(id);

    if (!tarea) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    tarea.completada = !tarea.completada;
    await tarea.save();

    return res.json(tarea);
  } catch (error) {
    return manejarError(res, error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!esIdValido(id)) {
      return res.status(400).json({ error: 'El id de la tarea no es válido' });
    }

    const tarea = await Task.findByIdAndDelete(id);

    if (!tarea) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    return res.json({ mensaje: 'Tarea eliminada', id });
  } catch (error) {
    return manejarError(res, error);
  }
});

export default router;
