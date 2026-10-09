const BASE_URL = import.meta.env.VITE_API_URL

export async function request(endpoint, options = {}) {
  let respuesta

  try {
    respuesta = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })
  } catch (error) {
    if (error.name === 'AbortError') throw error
    throw new Error('No se pudo conectar con el servidor', { cause: error })
  }

  let data = null

  try {
    data = await respuesta.json()
  } catch (error) {
    if (error.name === 'AbortError') throw error
  }

  if (!respuesta.ok) {
    const error = new Error(data?.error || `Error en la petición (${respuesta.status})`)
    error.status = respuesta.status
    throw error
  }

  return data
}

export function get(endpoint, signal) {
  return request(endpoint, { method: 'GET', signal })
}
