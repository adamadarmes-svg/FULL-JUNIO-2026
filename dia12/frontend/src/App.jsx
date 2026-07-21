import { useEffect, useState } from 'react'
import axios from 'axios'

const API = 'http://localhost:5000/items'

function App() {
  const [items, setItems] = useState([])
  const [title, setTitle] = useState('')

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    const res = await axios.get(API)
    setItems(res.data)
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    if (!title.trim()) return
    await axios.post(API, { title })
    setTitle('')
    fetchItems()
  }

  const handleToggle = async (item) => {
    await axios.put(`${API}/${item._id}`, { completed: !item.completed })
    fetchItems()
  }

  const handleDelete = async (id) => {
    await axios.delete(`${API}/${id}`)
    fetchItems()
  }

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h1>Lista de Tareas</h1>

      {/* Formulario para crear */}
      <form onSubmit={handleCreate} style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}  
          placeholder="Nueva tarea..."
          style={{ flex: 1, padding: '8px' }}
        />
        <button type="submit" style={{ padding: '8px 16px' }}>Agregar</button>
      </form>

      {/* Lista de tareas */}
      {items.length === 0 && <p>No hay tareas aún.</p>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {items.map(item => (
          <li key={item._id} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px',
            marginBottom: '8px',
            background: '#f5f5f5',
            borderRadius: '6px'
          }}>
            <span
              onClick={() => handleToggle(item)}
              style={{
                cursor: 'pointer',
                textDecoration: item.completed ? 'line-through' : 'none',
                color: item.completed ? '#999' : '#000'
              }}
            >
              {item.title}
            </span>
            <button
              onClick={() => handleDelete(item._id)}
              style={{ background: 'red', color: 'white', border: 'none', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer' }}
            >
              Borrar
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
