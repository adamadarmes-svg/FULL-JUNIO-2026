const auth = (req, res, next) => {
  const token = req.headers['authorization']

  if (!token) {
    return res.status(403).json({ error: 'Forbidden' })
  }

  next()
}

module.exports = auth