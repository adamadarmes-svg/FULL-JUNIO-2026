export const LIMITES = {
  TITULO_MAX: 120,
  CONTENIDO_MAX: 5000,
  COMENTARIO_MAX: 500,
  IMAGEN_MAX_MB: 2,
};

export const esEmailValido = (email) =>
  typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

export const esImagenBase64 = (valor) =>
  typeof valor === 'string' && /^data:image\/[a-zA-Z0-9.+-]+;base64,/.test(valor);

export const tamanoBase64EnMB = (cadena) => {
  if (typeof cadena !== 'string') return 0;
  const datos = cadena.includes(',') ? cadena.split(',')[1] : cadena;
  const relleno = datos.endsWith('==') ? 2 : datos.endsWith('=') ? 1 : 0;
  const bytes = (datos.length * 3) / 4 - relleno;
  return bytes / (1024 * 1024);
};
