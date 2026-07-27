const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/user.model')

const SECRET = process.env.JWT_SECRET

const register = async (req, res) => {
  try {
    const { email, password } = req.body

    const existe = await User.findOne({ email })
    if (existe) return res.status(400).json({ error: 'El email ya está registrado' })

    const hash = await bcrypt.hash(password, 10)

    const user = new User({ email, password: hash })
    await user.save()

   const token = jwt.sign(
      { id: user._id, email: user.email },
      SECRET,
      { expiresIn: '2h' }
    )

    res.json({ token })

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) return res.status(401).json({ error: 'Email o contraseña incorrectos' })

    const valida = await bcrypt.compare(password, user.password)
    if (!valida) return res.status(401).json({ error: 'Email o contraseña incorrectos' })

    const token = jwt.sign(
      { id: user._id, email: user.email },
      SECRET,
      { expiresIn: '2h' }
    )

    res.json({ token })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const verify = (req, res) => {
  res.json({ mensaje: 'Token válido', user: req.user })
}

module.exports = { register, login, verify }