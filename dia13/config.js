const dotenv = require('dotenv')

const entorno = process.env.NODE_ENV || 'development'

dotenv.config({ path: `.env.${entorno}` })

console.log(`Cargando configuración para: ${entorno}`)

module.exports = {
  port: process.env.PORT || 3000,
  dbUrl: process.env.DB_URL,
  secretKey: process.env.SECRET_KEY,
  entorno
}