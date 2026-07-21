const express = require('express')
const router = express.Router()
const {
  listClassrooms,
  getClassroom,
  createClassroom,
  updateClassroom,
  deleteClassroom,
  getClassroomExpanded,
  listClassroomsExpanded
} = require('../controllers/classroom.controller')

router.get('/expanded', listClassroomsExpanded)

router.route('/')
  .get(listClassrooms)
  .post(createClassroom)

router.get('/:id/expanded', getClassroomExpanded)

router.route('/:id')
  .get(getClassroom)
  .put(updateClassroom)
  .delete(deleteClassroom)

module.exports = router