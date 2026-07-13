const express = require("express");
const router = express.Router();
const Pedido = require("../models/Pedido");
const Producto = require("../models/Producto");

router.post("/", async (req, res) => {
  try {
    const { usuario, productos } = req.body;

    if (!productos || productos.length === 0) {
      return res.status(400).json({ error: "El pedido debe tener al menos un producto" });
    }

    let total = 0;

    for (const item of productos) {
      const productoBD = await Producto.findOneAndUpdate(
        { _id: item.producto, stock: { $gte: item.cantidad } },
        { $inc: { stock: -item.cantidad } },
        { new: true }
      );
      if (!productoBD) {
        return res.status(400).json({ error: `Stock insuficiente o producto no encontrado: ${item.producto}` });
      }
      total += productoBD.precio * item.cantidad;
    }

    const nuevoPedido = new Pedido({ usuario, productos, total });
    await nuevoPedido.save();
    res.status(201).json(nuevoPedido);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const pedidos = await Pedido.find()
      .populate("usuario", "nombre email")
      .populate("productos.producto", "nombre precio");
    res.status(200).json(pedidos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const pedido = await Pedido.findById(req.params.id)
      .populate("usuario", "nombre email")
      .populate("productos.producto", "nombre precio");
    if (!pedido) return res.status(404).json({ error: "Pedido no encontrado" });
    res.status(200).json(pedido);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const pedido = await Pedido.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!pedido) return res.status(404).json({ error: "Pedido no encontrado" });
    res.status(200).json(pedido);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const pedido = await Pedido.findByIdAndDelete(req.params.id);
    if (!pedido) return res.status(404).json({ error: "Pedido no encontrado" });
    res.status(200).json({ mensaje: "Pedido eliminado", pedido });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;