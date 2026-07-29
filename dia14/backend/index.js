require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://full-junio-2026-s1ev.vercel.app'
  ]
}))
app.use(express.json())

const authRoutes = require('./routes/auth.routes')
const taskRoutes = require('./routes/task.routes')
const itemRoutes = require('./routes/item.routes')

app.use('/auth', authRoutes)
app.use('/tasks', taskRoutes)
app.use('/items', itemRoutes)

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error MongoDB:', err))

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000
  app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`))
}

module.exports = app
