const express = require('express')
const app = express()

app.use(express.json())

const personRoutes = require('./routes/person.routes')
const classroomRoutes = require('./routes/classroom.routes')

app.use('/persons', personRoutes)
app.use('/classrooms', classroomRoutes)

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000')
})