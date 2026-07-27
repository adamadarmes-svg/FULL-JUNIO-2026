import { useState } from 'react'
import Register from '../components/Register'
import Login from '../components/Login'
import Status from '../components/Status'

function Home() {
  const [refresh, setRefresh] = useState(0)
  const token = localStorage.getItem('token')

  return (
    <div style={{ maxWidth: '460px', margin: '48px auto', padding: '0 16px' }}>
      {token ? <Status refresh={refresh} /> : null}
      {!token && <Register />}
      {!token && <Login />}
    </div>
  )
}

export default Home