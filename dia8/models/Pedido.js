const mongoose = require("mongoose");

const pedidoSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
  productos: [
    {
      producto: { type: mongoose.Schema.Types.ObjectId, ref: "Producto", required: true },
      cantidad: { type: Number, required: true, min: 1 },
    },
  ],
  total: { type: Number, default: 0 },
  estado: {
    type: String,
    enum: ["pendiente", "pagado", "enviado", "cancelado"],
    default: "pendiente",
  },
}, { timestamps: true });

module.exports = mongoose.model("Pedido", pedidoSchema);