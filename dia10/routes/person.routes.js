const express = require('express')
const router = express.Router()
const {
  listPersons,
  getPerson,
  createPerson,
  updatePerson,
  deletePerson
} = require('../controllers/person.controller')

router.route('/')
  .get(listPersons)
  .post(createPerson)

router.route('/:id')
  .get(getPerson)
  .put(updatePerson)
  .delete(deletePerson)

module.exports = router