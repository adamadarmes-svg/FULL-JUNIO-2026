let count = 0

const counter = (req, res, next) => {
  count++
  console.log(`Solicitudes recibidas: ${count}`)
  next()
}

module.exports = counter