require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

const itemRoutes = require('./routes/item.routes')
const authRoutes = require('./routes/auth.routes')
const taskRoutes = require('./routes/task.routes')

app.use('/items', itemRoutes)
app.use('/auth', authRoutes)
app.use('/tasks', taskRoutes)

const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]); 

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Conectado a MongoDB');
    app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
  })
  .catch(err => console.error('Error MongoDB:', err));
