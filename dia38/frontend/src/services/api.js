import { STORAGE_KEYS } from '../lib/constantes'

const API_URL = import.meta.env.VITE_API_URL

export async function request(endpoint, options = {}) {
  const { body, headers = {}, ...resto } = options
  const token = localStorage.getItem(STORAGE_KEYS.TOKEN)

  const config = {
    ...resto,
    headers: {
      ...(body !== undefined && { 'Content-Type': 'application/json' }),
      ...(token && { Authorization: `Bearer ${token}` }),
      ...headers,
    },
  }

  if (body !== undefined) {
    config.body = JSON.stringify(body)
  }

  let response
  try {
    response = await fetch(`${API_URL}${endpoint}`, config)
  } catch {
    throw new Error('No se pudo conectar con el servidor')
  }

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem(STORAGE_KEYS.TOKEN)
      localStorage.removeItem(STORAGE_KEYS.USUARIO)
    }
    const error = new Error(data?.error || `Error ${response.status}`)
    error.status = response.status
    throw error
  }

  return data
}

export const get = (endpoint) => request(endpoint, { method: 'GET' })

export const post = (endpoint, body) => request(endpoint, { method: 'POST', body })

export const put = (endpoint, body) => request(endpoint, { method: 'PUT', body })

export const del = (endpoint) => request(endpoint, { method: 'DELETE' })
