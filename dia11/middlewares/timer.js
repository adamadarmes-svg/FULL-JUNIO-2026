const timer = (req, res, next) => {
  const start = Date.now()

  res.on('finish', () => {
    const duration = Date.now() - start
    console.log(`${req.method} ${req.url} tardó ${duration}ms`)
  })

  next()
}

module.exports = timer