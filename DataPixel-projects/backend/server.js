import express from 'express'
import mysql from 'mysql2'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

// 1. Configuración de tu base de datos MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Tu usuario de MySQL
  password: '', // Tu contraseña de MySQL
  database: 'datapixel-final',
})

db.connect((err) => {
  if (err) {
    console.error('Error conectando a MySQL:', err)
  } else {
    console.log('¡Conectado a la base de datos MySQL!')
  }
})

// 2. Ruta de Login (Esta es la que llama React)
app.post('/login', (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Email y contraseña son obligatorios' })
  }

  const sql = 'SELECT * FROM usuarios WHERE email = ? AND password = ?'

  db.query(sql, [email, password], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error en el servidor' })

    if (result.length > 0) {
      const user = result[0]
      return res.json({
        nombre: user.nombre,
        email: user.email,
        rol: user.rol || 'Usuario',
      })
    }

    return res.status(401).json({ message: 'Credenciales incorrectas' })
  })
})

app.post('/register', (req, res) => {
  const { nombre, email, password, tipo } = req.body
  if (!nombre || !email || !password) {
    return res.status(400).json({ message: 'Nombre, email y contraseña son obligatorios' })
  }

  const rol = tipo || 'Cliente'
  const sql = 'INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)'

  db.query(sql, [nombre, email, password, rol], (err) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ message: 'El email ya está registrado' })
      }
      console.error('Error al registrar usuario:', err)
      return res.status(500).json({ message: 'Error al crear usuario' })
    }

    res.status(201).json({ message: 'Usuario creado correctamente' })
  })
})

app.listen(8081, () => {
  console.log('Servidor backend corriendo en http://localhost:8081')
})
