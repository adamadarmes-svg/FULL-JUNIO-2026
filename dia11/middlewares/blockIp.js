const IP_BLOQUEADA = '192.168.1.100'

const blockIp = (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress

  if (ip === IP_BLOQUEADA) {
    return res.status(403).json({ error: 'Forbidden: IP bloqueada' })
  }

  next()
}

module.exports = blockIp