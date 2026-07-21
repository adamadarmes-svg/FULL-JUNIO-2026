const path = require('path')
const { readCSV, writeCSV } = require('../helpers/csv')

const CLASSROOM_PATH = path.join(__dirname, '../data/classrooms.csv')
const PERSONS_PATH = path.join(__dirname, '../data/persons.csv')

const parse = (classroom) => ({
  ...classroom,
  students: classroom.students ? classroom.students.split('|') : []
})

const serialize = (classroom) => ({
  ...classroom,
  students: Array.isArray(classroom.students) ? classroom.students.join('|') : classroom.students
})

const expand = (classroom) => {
  const persons = readCSV(PERSONS_PATH)
  const teacher = persons.find(p => p.id === classroom.teacher_id) || null
  const students = classroom.students
    .map(sid => persons.find(p => p.id === sid) || null)
    .filter(Boolean)

  return { ...classroom, teacher, students }
}

const listClassrooms = (req, res) => {
  let classrooms = readCSV(CLASSROOM_PATH).map(parse)
  const { name, teacher_id } = req.query

  if (name) classrooms = classrooms.filter(c => c.name.toLowerCase().includes(name.toLowerCase()))
  if (teacher_id) classrooms = classrooms.filter(c => c.teacher_id === teacher_id)

  res.json(classrooms)
}

const getClassroom = (req, res) => {
  const classrooms = readCSV(CLASSROOM_PATH).map(parse)
  const classroom = classrooms.find(c => c.id === req.params.id)
  if (!classroom) return res.status(404).json({ error: 'Classroom not found' })
  res.json(classroom)
}

const createClassroom = (req, res) => {
  const classrooms = readCSV(CLASSROOM_PATH).map(parse)
  const { name, teacher_id, students } = req.body

  const maxId = classrooms.reduce((max, c) => Math.max(max, Number(c.id)), 0)
  const newClassroom = {
    id: String(maxId + 1),
    name,
    teacher_id,
    students: students || []
  }

  classrooms.push(newClassroom)
  writeCSV(CLASSROOM_PATH, classrooms.map(serialize))
  res.status(201).json(newClassroom)
}

const updateClassroom = (req, res) => {
  let classrooms = readCSV(CLASSROOM_PATH).map(parse)
  const index = classrooms.findIndex(c => c.id === req.params.id)
  if (index === -1) return res.status(404).json({ error: 'Classroom not found' })

  classrooms[index] = { ...classrooms[index], ...req.body, id: req.params.id }
  writeCSV(CLASSROOM_PATH, classrooms.map(serialize))
  res.json(classrooms[index])
}

const deleteClassroom = (req, res) => {
  let classrooms = readCSV(CLASSROOM_PATH).map(parse)
  const index = classrooms.findIndex(c => c.id === req.params.id)
  if (index === -1) return res.status(404).json({ error: 'Classroom not found' })

  const deleted = classrooms[index]
  classrooms = classrooms.filter(c => c.id !== req.params.id)
  writeCSV(CLASSROOM_PATH, classrooms.map(serialize))
  res.json(deleted)
}

const getClassroomExpanded = (req, res) => {
  const classrooms = readCSV(CLASSROOM_PATH).map(parse)
  const classroom = classrooms.find(c => c.id === req.params.id)
  if (!classroom) return res.status(404).json({ error: 'Classroom not found' })
  res.json(expand(classroom))
}

const listClassroomsExpanded = (req, res) => {
  let classrooms = readCSV(CLASSROOM_PATH).map(parse)
  const { name, teacher_id } = req.query

  if (name) classrooms = classrooms.filter(c => c.name.toLowerCase().includes(name.toLowerCase()))
  if (teacher_id) classrooms = classrooms.filter(c => c.teacher_id === teacher_id)

  res.json(classrooms.map(expand))
}

module.exports = {
  listClassrooms,
  getClassroom,
  createClassroom,
  updateClassroom,
  deleteClassroom,
  getClassroomExpanded,
  listClassroomsExpanded
}