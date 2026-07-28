import { useEffect, useState } from 'react'
import axios from 'axios'

const API = `${import.meta.env.VITE_API_URL}/auth`

function Status({ refresh }) {
    const [estado, setEstado] = useState(null) 

    useEffect(() => {
        checkToken()
    }, [refresh]) 

    const checkToken = async () => {
        const token = localStorage.getItem('token')

        if (!token) {
            setEstado({ logueado: false })
            return
        }

        try {
            const res = await axios.get(`${API}/verify`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setEstado({ logueado: true, user: res.data.user })
        } catch {
            setEstado({ logueado: false })
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        window.location.href = '/'
    }

    if (estado === null) return (
        <p style={{
            textAlign: 'center',
            fontSize: '13px',
            letterSpacing: '0.5px',
            color: '#999999',
            marginBottom: '24px'
        }}>Comprobando sesión...</p>
    )

    return (
        <div style={{
            background: '#ffffff',
            border: '1px solid #e5e5e5',
            padding: '28px 44px',
            maxWidth: '420px',
            margin: '0 auto 24px',
            boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
            textAlign: 'center'
        }}>
            {estado.logueado ? (
                <>
                    <p style={{
                        fontSize: '13px',
                        letterSpacing: '0.5px',
                        color: '#111111',
                        marginBottom: '16px'
                    }}>
                        Estás logueado como <strong>{estado.user.email}</strong>
                    </p>
                    <button onClick={handleLogout} style={{
                        padding: '10px 20px',
                        background: '#ffffff',
                        color: '#111111',
                        border: '1px solid #111111',
                        fontSize: '12px',
                        fontWeight: 500,
                        letterSpacing: '1.5px',
                        textTransform: 'uppercase',
                        cursor: 'pointer'
                    }}>
                        Cerrar sesión
                    </button>
                </>
            ) : (
                <p style={{
                    fontSize: '13px',
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                    color: '#999999'
                }}>No estás logueado</p>
            )}
        </div>
    )
}

export default Status