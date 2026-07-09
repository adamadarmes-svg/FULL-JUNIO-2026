const mongoose = require("mongoose");

const tableroSchema = new mongoose.Schema({
  nombre: String,
  email: { type: String, unique: true, required: true },
  edad: Number,
});

const Tablero = mongoose.model("Tablero", tableroSchema);
module.exports = Tablero;
