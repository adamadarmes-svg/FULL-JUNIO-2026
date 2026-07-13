require("dotenv").config();
const express = require("express");
const connectDB = require("./db");

const productosRoutes = require("./routes/productos");
const usuariosRoutes = require("./routes/usuarios");
const pedidosRoutes = require("./routes/pedidos");

connectDB();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ mensaje: "Bienvenido a la API de la tienda" });
});

app.use("/productos", productosRoutes);
app.use("/usuarios", usuariosRoutes);
app.use("/pedidos", pedidosRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));