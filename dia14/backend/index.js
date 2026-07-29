require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://full-junio-2026-4etq.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.options("*", cors());
app.use(express.json())

const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

let conectado = false
const conectarDB = async () => {
  if (conectado) return
  await mongoose.connect(process.env.MONGO_URL)
  conectado = true
  console.log('Conectado a MongoDB')
}

app.use(async (req, res, next) => {
  try {
    await conectarDB()
    next()
  } catch (err) {
    console.error('Error MongoDB:', err)
    res.status(500).json({ error: 'Error de conexión a la base de datos' })
  }
})

const itemRoutes = require('./routes/item.routes')
const authRoutes = require('./routes/auth.routes')
const taskRoutes = require('./routes/task.routes')

app.use('/items', itemRoutes)
app.use('/auth', authRoutes)
app.use('/tasks', taskRoutes)

if (!process.env.VERCEL) {
  conectarDB()
    .then(() => app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`)))
    .catch(err => console.error('Error MongoDB:', err))
}

module.exports = app
