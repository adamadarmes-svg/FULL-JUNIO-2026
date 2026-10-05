const getBaseUrl = () => {
  if (typeof window !== 'undefined') return ''
  return process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
}

export async function fetchRepo(endpoint, options = {}) {
  let res

  try {
    res = await fetch(`${getBaseUrl()}${endpoint}`, {
      cache: 'no-store',
      ...options,
      headers: { 'Content-Type': 'application/json', ...options.headers },
    })
  } catch {
    throw new Error('No se pudo conectar con el servidor')
  }

  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    throw new Error(data.error || 'Error inesperado')
  }

  return data
}

export const getItems = () => fetchRepo('/api/items')

export const postItem = (datos) =>
  fetchRepo('/api/items', { method: 'POST', body: JSON.stringify(datos) })

export const putItem = (id, datos) =>
  fetchRepo(`/api/items/${id}`, { method: 'PUT', body: JSON.stringify(datos) })

export const deleteItem = (id) =>
  fetchRepo(`/api/items/${id}`, { method: 'DELETE' })