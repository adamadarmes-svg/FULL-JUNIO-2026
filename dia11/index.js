const express = require('express')
const app = express()

app.use(express.json())

const logger = require('./middlewares/logger')
const counter = require('./middlewares/counter')
const timer = require('./middlewares/timer')
const blockIp = require('./middlewares/blockIp')
const errorHandler = require('./middlewares/errorHandler')

app.use(logger)
app.use(counter)
app.use(timer)
app.use(blockIp)

const testRoutes = require('./routes/test.routes')
app.use('/api', testRoutes)

app.use(errorHandler)

app.listen(3000, () => {
  console.log('Servidor en http://localhost:3000')
})