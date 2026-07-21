const path = require('path')
const { readCSV, writeCSV } = require('../helpers/csv')

const CSV_PATH = path.join(__dirname, '../data/persons.csv')

const listPersons = (req, res) => {
  let persons = readCSV(CSV_PATH)
  const { name, isTeacher } = req.query

  if (name) {
    persons = persons.filter(p => p.name.toLowerCase().includes(name.toLowerCase()))
  }
  if (isTeacher !== undefined) {
    persons = persons.filter(p => p.isTeacher === isTeacher)
  }

  res.json(persons)
}

const getPerson = (req, res) => {
  const persons = readCSV(CSV_PATH)
  const person = persons.find(p => p.id === req.params.id)
  if (!person) return res.status(404).json({ error: 'Person not found' })
  res.json(person)
}

const createPerson = (req, res) => {
  const persons = readCSV(CSV_PATH)
  const { name, surname, isTeacher, birthdate } = req.body

  const maxId = persons.reduce((max, p) => Math.max(max, Number(p.id)), 0)
  const newPerson = {
    id: String(maxId + 1),
    name,
    surname,
    isTeacher: String(isTeacher),
    birthdate
  }

  persons.push(newPerson)
  writeCSV(CSV_PATH, persons)
  res.status(201).json(newPerson)
}

const updatePerson = (req, res) => {
  const persons = readCSV(CSV_PATH)
  const index = persons.findIndex(p => p.id === req.params.id)
  if (index === -1) return res.status(404).json({ error: 'Person not found' })

  persons[index] = { ...persons[index], ...req.body, id: req.params.id }
  writeCSV(CSV_PATH, persons)
  res.json(persons[index])
}

const deletePerson = (req, res) => {
  let persons = readCSV(CSV_PATH)
  const index = persons.findIndex(p => p.id === req.params.id)
  if (index === -1) return res.status(404).json({ error: 'Person not found' })

  const deleted = persons[index]
  persons = persons.filter(p => p.id !== req.params.id)
  writeCSV(CSV_PATH, persons)
  res.json(deleted)
}

module.exports = { listPersons, getPerson, createPerson, updatePerson, deletePerson }