import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const API = `${import.meta.env.VITE_API_URL}/tasks`

function Tasks() {
  const [tasks, setTasks] = useState([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const navigate = useNavigate()

  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!token) { navigate('/'); return }
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const res = await axios.get(API, { headers: { Authorization: `Bearer ${token}` } })
      setTasks(res.data)
    } catch {
      navigate('/')
    }
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    if (!name.trim()) return
    await axios.post(API, { name, description }, { headers: { Authorization: `Bearer ${token}` } })
    setName('')
    setDescription('')
    fetchTasks()
  }

  const handleToggle = async (task) => {
    await axios.put(`${API}/${task._id}`, { status: !task.status }, { headers: { Authorization: `Bearer ${token}` } })
    fetchTasks()
  }

  const handleDelete = async (id) => {
    await axios.delete(`${API}/${id}`, { headers: { Authorization: `Bearer ${token}` } })
    fetchTasks()
  }

  const card = { background: '#ffffff', border: '1px solid #e5e5e5', padding: '44px 40px', marginBottom: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }
  const title = {
    fontFamily: 'Georgia, "Times New Roman", serif',
    fontWeight: 400,
    fontSize: '21px',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    textAlign: 'center',
    color: '#111111',
    marginBottom: '28px'
  }
  const input = {
    padding: '10px 2px',
    border: 'none',
    borderBottom: '1px solid #d4d4d4',
    background: 'transparent',
    fontSize: '14px',
    letterSpacing: '0.3px',
    outline: 'none'
  }

  return (
    <div style={{ maxWidth: '600px', margin: '48px auto', padding: '0 16px' }}>

      {/* Formulario */}
      <div style={card}>
        <h2 style={title}>Add Task</h2>
        <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Task Name"
            style={input}
          />
          <input
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Task Description"
            style={input}
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
            Add Task
          </button>
        </form>
      </div>

      {/* Lista */}
      <div style={card}>
        <h2 style={title}>List Task</h2>
        {tasks.length === 0 && <p style={{ textAlign: 'center', fontSize: '13px', letterSpacing: '0.5px', color: '#999999' }}>No hay tareas aún</p>}
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {tasks.map(task => (
            <li key={task._id} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '16px 4px',
              borderBottom: '1px solid #eeeeee'
            }}>
              <span style={{
                textDecoration: task.status ? 'line-through' : 'none',
                color: task.status ? '#999999' : '#111111',
                fontSize: '14px',
                letterSpacing: '0.2px'
              }}>
                {task.name}
                {task.description && <small style={{ display: 'block', color: '#999999', fontWeight: 'normal', letterSpacing: '0.2px' }}>{task.description}</small>}
              </span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => handleToggle(task)} style={{
                  padding: '6px 12px',
                  background: task.status ? '#111111' : '#ffffff',
                  color: task.status ? '#ffffff' : '#111111',
                  border: '1px solid #111111',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}>
                  {task.status ? '↩' : '✓'}
                </button>
                <button onClick={() => handleDelete(task._id)} style={{
                  padding: '6px 12px',
                  background: '#ffffff',
                  color: '#999999',
                  border: '1px solid #d4d4d4',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}>
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Tasks