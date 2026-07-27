import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  const token = localStorage.getItem('token')

  return (
    <nav style={{
      background: '#ffffff',
      borderBottom: '1px solid #e5e7eb',
      padding: '14px 30px',
      display: 'flex',
      gap: '24px',
      alignItems: 'center'
    }}>
      <Link to="/" style={{ color: '#1f2937', textDecoration: 'none', fontWeight: 'bold' }}>Inicio</Link>
      {token && <Link to="/tasks" style={{ color: '#1f2937', textDecoration: 'none', fontWeight: 'bold' }}>Tasks</Link>}
      {token && (
        <button onClick={handleLogout} style={{
          marginLeft: 'auto', background: 'transparent',
          color: '#1f2937', border: '1px solid #d1d5db',
          padding: '6px 14px', borderRadius: '6px', cursor: 'pointer'
        }}>
          Logout
        </button>
      )}
    </nav>
  )
}

export default Navbar