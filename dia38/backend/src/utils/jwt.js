import jwt from 'jsonwebtoken';

export const generarToken = (usuario) => {
  const secreto = process.env.JWT_SECRET;

  if (!secreto) {
    throw new Error('Falta la variable de entorno JWT_SECRET');
  }

  const payload = {
    id: usuario._id?.toString() ?? usuario.id,
    email: usuario.email,
    rol: usuario.rol,
  };

  return jwt.sign(payload, secreto, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

export const verificarToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
};
