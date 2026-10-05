export const noEncontrado = (req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    metodo: req.method,
    ruta: req.originalUrl,
  });
};

export const manejarErrores = (err, req, res, next) => {
  console.error(err);

  if (err.name === 'ValidationError') {
    const primerError = Object.values(err.errors)[0];
    return res.status(400).json({ error: primerError?.message || 'Datos no válidos' });
  }

  if (err.code === 11000) {
    const campo = Object.keys(err.keyValue || err.keyPattern || {})[0] || 'campo';
    return res.status(409).json({ error: `El valor del campo '${campo}' ya está registrado` });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'Identificador no válido' });
  }

  if (err.type === 'entity.too.large') {
    return res.status(413).json({ error: 'La imagen es demasiado grande' });
  }

  const estado = err.status || err.statusCode || 500;
  res.status(estado).json({ error: err.message || 'Error interno del servidor' });
};
