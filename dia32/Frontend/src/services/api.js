const API_URL = import.meta.env.VITE_API_URL;

async function request(endpoint, options = {}) {
  const { signal, body, headers, ...rest } = options;

  const config = {
    ...rest,
    headers: { ...headers },
    signal,
  };

  if (body !== undefined) {
    config.headers['Content-Type'] = 'application/json';
    config.body = typeof body === 'string' ? body : JSON.stringify(body);
  }

  let response;
  try {
    response = await fetch(API_URL + endpoint, config);
  } catch (error) {
    if (error.name === 'AbortError') {
      throw error;
    }
    throw new Error('No se pudo conectar con el servidor');
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || 'Error inesperado');
  }

  return data;
}

export async function getHealth() {
  return request('/health');
}

export async function registrarUsuario(email, password, confirmPassword) {
  return request('/users/registro', {
    method: 'POST',
    body: { email, password, confirmPassword },
  });
}

export async function loginUsuario(email, password) {
  return request('/users/login', {
    method: 'POST',
    body: { email, password },
  });
}

export async function getTasks(userId, signal) {
  return request(`/tasks?userId=${encodeURIComponent(userId)}`, { signal });
}

export async function getTask(id, signal) {
  return request(`/tasks/${id}`, { signal });
}

export async function createTask({ titulo, descripcion, userId }) {
  return request('/tasks', {
    method: 'POST',
    body: { titulo, descripcion, userId },
  });
}

export async function updateTask(id, { titulo, descripcion }) {
  return request(`/tasks/${id}`, {
    method: 'PUT',
    body: { titulo, descripcion },
  });
}

export async function toggleTask(id) {
  return request(`/tasks/${id}/toggle`, { method: 'PATCH' });
}

export async function deleteTask(id) {
  return request(`/tasks/${id}`, { method: 'DELETE' });
}
