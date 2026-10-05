import { obtenerUsuarios, obtenerUsuarioPorUsername } from '@/models/userModel'

export async function listarUsuarios() {
  return { ok: true, data: obtenerUsuarios() }
}

export async function buscarUsuario(username) {
  if (!username || String(username).trim() === '') {
    return { ok: false, error: 'Falta el nombre de usuario' }
  }
  const usuario = obtenerUsuarioPorUsername(String(username).toLowerCase())
  if (!usuario) {
    return { ok: false, error: `No existe ningún usuario llamado @${username}` }
  }
  return { ok: true, data: usuario }
}
