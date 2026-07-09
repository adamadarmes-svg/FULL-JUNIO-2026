const express = require("express");
const router = express.Router();
const Tablero = require("../models/Tablero");

router.post("/", async (req, res) => {
  try {
    const nuevoTablero = new Tablero(req.body);
    await nuevoTablero.save();
    res.status(201).json(nuevoTablero);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const tableros = await Tablero.find();
    res.json(tableros);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const tablero = await Tablero.findById(req.params.id);
    if (!tablero) {
      return res.status(404).json({ error: "Tablero no encontrado" });
    }
    res.json(tablero);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const tablero = await Tablero.findByIdAndUpdate(req.params.id, req.body, {
      new: true,            
      runValidators: true,  
    });
    if (!tablero) {
      return res.status(404).json({ error: "Tablero no encontrado" });
    }
    res.json(tablero);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const tablero = await Tablero.findByIdAndDelete(req.params.id);
    if (!tablero) {
      return res.status(404).json({ error: "Tablero no encontrado" });
    }
    res.json({ mensaje: "Tablero eliminado", tablero });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
