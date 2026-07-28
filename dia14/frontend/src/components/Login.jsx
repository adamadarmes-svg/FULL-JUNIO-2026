import { useState } from 'react'
import axios from 'axios'

const API = `${import.meta.env.VITE_API_URL}/auth`

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [mensaje, setMensaje] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${API}/login`, { email, password })
            const token = res.data.token

            localStorage.setItem('token', token)

            setMensaje('Login exitoso')
            window.location.href = '/tasks'  
        } catch (err) {
            setMensaje(err.response?.data?.error || 'Error al iniciar sesión')
        }
    }

    return (
        <div style={{
            background: '#ffffff',
            border: '1px solid #e5e5e5',
            padding: '48px 44px',
            maxWidth: '420px',
            margin: '0 auto 24px',
            boxShadow: '0 1px 4px rgba(0,0,0,0.05)'
        }}>
            <h2 style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontWeight: 400,
                fontSize: '21px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                textAlign: 'center',
                color: '#111111',
                marginBottom: '28px'
            }}>Login</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    style={{
                        padding: '10px 2px',
                        border: 'none',
                        borderBottom: '1px solid #d4d4d4',
                        background: 'transparent',
                        fontSize: '14px',
                        letterSpacing: '0.3px',
                        outline: 'none'
                    }}
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    style={{
                        padding: '10px 2px',
                        border: 'none',
                        borderBottom: '1px solid #d4d4d4',
                        background: 'transparent',
                        fontSize: '14px',
                        letterSpacing: '0.3px',
                        outline: 'none'
                    }}
                />
                <button type="submit" style={{
                    padding: '13px',
                    marginTop: '8px',
                    background: '#111111',
                    color: '#ffffff',
                    border: 'none',
                    fontSize: '13px',
                    fontWeight: 500,
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    cursor: 'pointer'
                }}>
                    Iniciar sesión
                </button>
            </form>
            {mensaje && <p style={{ marginTop: '18px', fontSize: '13px', textAlign: 'center', color: '#555555' }}>{mensaje}</p>}
        </div>
    )
}

export default Login