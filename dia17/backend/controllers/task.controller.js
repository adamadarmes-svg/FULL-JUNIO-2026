const Task = require('../models/task.model')

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id })
    res.json(tasks)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const createTask = async (req, res) => {
  try {
    const { name, description } = req.body
    const task = new Task({ name, description, user: req.user.id })
    await task.save()
    res.status(201).json(task)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    )
    if (!task) return res.status(404).json({ error: 'Tarea no encontrada' })
    res.json(task)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id })
    if (!task) return res.status(404).json({ error: 'Tarea no encontrada' })
    res.json(task)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = { getTasks, createTask, updateTask, deleteTask }