export const noEncontrado = (req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    metodo: req.method,
    ruta: req.originalUrl,
  });
};

export const manejarErrores = (err, req, res, next) => {
  console.error(err);

  let status = err.status || 500;
  let mensaje = err.message || 'Error interno del servidor';

  if (err.name === 'ValidationError') {
    status = 400;
    mensaje = Object.values(err.errors)[0]?.message || 'Datos no válidos';
  } else if (err.name === 'CastError') {
    status = 400;
    mensaje = 'Identificador no válido';
  } else if (err.code === 11000) {
    status = 409;
    const campo = Object.keys(err.keyValue || {})[0] || 'desconocido';
    mensaje = `Valor duplicado en el campo: ${campo}`;
  }

  const respuesta = { error: mensaje };

  if (process.env.NODE_ENV !== 'production') {
    respuesta.stack = err.stack;
  }

  res.status(status).json(respuesta);
};
