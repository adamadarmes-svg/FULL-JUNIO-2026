require("dotenv").config();
const csv = require("csv-parser");
const fs = require("fs");
const mongoose = require("mongoose");
const Tablero = require("./models/Tablero");

const results = [];

mongoose.connect(process.env.MONGO_URI).then(() => {
  fs.createReadStream("users.csv")
    .pipe(csv({ separator: ";" }))
    .on("data", (data) => results.push(data))
    .on("end", async () => {
      for (const userData of results) {
        const { nombre, email, edad } = userData;
        try {
          const newUser = new Tablero({ nombre, email, edad });
          await newUser.save();
          console.log(`Guardado: ${nombre}`);
        } catch (error) {
          console.error(`Error guardando ${nombre}: ${error.message}`);
        }
      }
      console.log("Migración terminada");
      mongoose.connection.close();
    });
});