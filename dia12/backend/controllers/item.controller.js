const Item = require('../models/item.model')

const getItems = async (req, res) => {
  try {
    const items = await Item.find()
    res.json(items)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const getItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)
    if (!item) return res.status(404).json({ error: 'Item no encontrado' })
    res.json(item)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const createItem = async (req, res) => {
  try {
    const item = new Item(req.body)
    const saved = await item.save()
    res.status(201).json(saved)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const updateItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!item) return res.status(404).json({ error: 'Item no encontrado' })
    res.json(item)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id)
    if (!item) return res.status(404).json({ error: 'Item no encontrado' })
    res.json(item)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = { getItems, getItem, createItem, updateItem, deleteItem }