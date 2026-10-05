import { validationResult } from 'express-validator';

export const validar = (req, res, next) => {
  const resultado = validationResult(req);

  if (!resultado.isEmpty()) {
    const errores = resultado.array().map((error) => error.msg);
    return res.status(400).json({ error: errores[0], errores });
  }

  next();
};
