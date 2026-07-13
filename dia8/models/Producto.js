const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true },        
  descripcion: { type: String },
  precio: { type: Number, required: true, min: 0 },            
  stock: {
    type: Number,
    default: 0,
    min: 0,
    validate: {                                                
      validator: Number.isInteger,
      message: "El stock debe ser un número entero",
    },
  },
  categoria: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Producto", productoSchema);