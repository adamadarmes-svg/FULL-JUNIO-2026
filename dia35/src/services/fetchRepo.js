const getBaseUrl = () => {
  if (typeof window !== 'undefined') return ''
  return process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
}

export async function fetchRepo(endpoint, options = {}) {
  const res = await fetch(`${getBaseUrl()}${endpoint}`, {
    cache: 'no-store',
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    throw new Error(data.error || 'Error al cargar los datos')
  }

  return data
}

export const getSaludo = () => fetchRepo('/api/saludo')

export const getNumero = () => fetchRepo('/api/numero')

export const getNombres = () => fetchRepo('/api/nombres')

export const postNombre = (nombre) =>
  fetchRepo('/api/nombres', {
    method: 'POST',
    body: JSON.stringify({ nombre }),
  })

export const putNombre = (id, nombre) =>
  fetchRepo(`/api/nombres/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ nombre }),
  })

export const deleteNombre = (id) =>
  fetchRepo(`/api/nombres/${id}`, {
    method: 'DELETE',
  })