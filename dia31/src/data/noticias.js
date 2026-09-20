export const noticias = [
  {
    id: 1,
    titulo: 'El telescopio James Webb halla una galaxia muy antigua',
    resumen: 'La luz de esta galaxia viajó más de 13.000 millones de años.',
    contenido: 'El telescopio espacial James Webb ha observado una galaxia formada apenas unos cientos de millones de años después del Big Bang. Su brillo y tamaño sorprenden a los astrónomos, que esperaban galaxias más pequeñas en esa época.',
    categoria: 'Astrofísica',
    fecha: '2026-09-02',
  },
  {
    id: 2,
    titulo: 'Logran entrelazar dos átomos a 30 kilómetros',
    resumen: 'Un nuevo récord para la comunicación cuántica por fibra óptica.',
    contenido: 'Un equipo de investigadores consiguió mantener el entrelazamiento entre dos átomos separados por 30 kilómetros de fibra óptica. Es un paso importante hacia una futura red cuántica capaz de transmitir información de forma segura.',
    categoria: 'Física cuántica',
    fecha: '2026-09-08',
  },
  {
    id: 3,
    titulo: 'Detectan una fusión de agujeros negros',
    resumen: 'Las ondas gravitacionales confirman uno de los eventos más potentes.',
    contenido: 'Los detectores de ondas gravitacionales registraron la colisión de dos agujeros negros a miles de millones de años luz. El choque liberó más energía que todas las estrellas del universo observable durante una fracción de segundo.',
    categoria: 'Cosmología',
    fecha: '2026-09-12',
  },
  {
    id: 4,
    titulo: 'Nuevo récord en computación cuántica',
    resumen: 'Un procesador supera los 1.000 cúbits con menos errores.',
    contenido: 'Un nuevo procesador cuántico logra operar con más de mil cúbits reduciendo de forma notable la tasa de errores. Los expertos creen que este avance acerca las aplicaciones prácticas, como simular moléculas para desarrollar nuevos medicamentos.',
    categoria: 'Computación cuántica',
    fecha: '2026-09-16',
  },
  {
    id: 5,
    titulo: 'Un exoplaneta con vapor de agua en su atmósfera',
    resumen: 'Orbita una estrella enana roja a unos 40 años luz de la Tierra.',
    contenido: 'Astrónomos han detectado vapor de agua en la atmósfera de un exoplaneta rocoso cercano. Aún es pronto para hablar de vida, pero el hallazgo lo convierte en un objetivo prioritario para futuras observaciones.',
    categoria: 'Exoplanetas',
    fecha: '2026-09-19',
  },
]

export const buscarNoticia = (id) => {
  return noticias.find(n => n.id === Number(id))
}
