const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
const PORT = 5000

app.use(cors({ origin: 'http://localhost:5173' })) 
app.use(express.json())

const itemRoutes = require('./routes/item.routes')
app.use('/items', itemRoutes)

mongoose.connect('mongodb://localhost:27017/dia12')
  .then(() => {
    console.log('Conectado a MongoDB')
    app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`))
  })
  .catch(err => console.error('Error conectando MongoDB:', err))