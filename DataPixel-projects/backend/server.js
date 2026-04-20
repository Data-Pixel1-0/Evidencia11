import express from 'express'
import mysql from 'mysql2'
import cors from 'cors'
import jwt from 'jsonwebtoken'

const app = express()
app.use(cors())
app.use(express.json())

const SECRET_KEY = 'tu_clave_secreta_aqui' // Cambia esto por una clave segura

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
      const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' })
      return res.json({
        token,
        user: {
          nombre: user.nombre,
          email: user.email,
          rol: user.rol || 'Usuario',
        }
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

// Middleware para verificar token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) return res.status(401).json({ message: 'Token requerido' })

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token inválido' })
    req.user = user
    next()
  })
}

// Ruta para obtener perfil del usuario
app.get('/profile', authenticateToken, (req, res) => {
  const sql = 'SELECT nombre, email, rol FROM usuarios WHERE id = ?'

  db.query(sql, [req.user.id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error en el servidor' })

    if (result.length > 0) {
      const user = result[0]
      return res.json({
        nombre: user.nombre,
        email: user.email,
        rol: user.rol || 'Usuario',
        ubicacion: 'Colombia, Caribe',
        estado: 'Activo',
      })
    }

    return res.status(404).json({ message: 'Usuario no encontrado' })
  })
})

app.get('/api/productos', (req, res) => {
  const sql = 'SELECT * FROM productos LIMIT 20'

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error al obtener productos:', err)
      return res.status(500).json({ message: 'Error al obtener productos' })
    }

    res.json(result)
  })
})

// Endpoint para inicializar la tabla de productos con datos de prueba
app.post('/api/inicializar-productos', (req, res) => {
  // Primero crear la tabla si no existe
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS productos (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nombre VARCHAR(100) NOT NULL,
      cantidad INT NOT NULL,
      precio DECIMAL(10, 2),
      descripcion TEXT,
      fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `

  db.query(createTableSQL, (err) => {
    if (err) {
      console.error('Error creando tabla:', err)
      return res.status(500).json({ message: 'Error creando tabla' })
    }

    // Verificar si la tabla está vacía
    const checkSQL = 'SELECT COUNT(*) as count FROM productos'
    db.query(checkSQL, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error verificando datos' })
      }

      if (result[0].count > 0) {
        return res.json({ message: 'La tabla ya contiene datos' })
      }

      // Insertar datos de prueba
      const insertSQL = `
        INSERT INTO productos (nombre, cantidad, precio, descripcion) VALUES
        ('Laptop Dell XPS 13', 15, 1200.00, 'Laptop ultraportátil de alto rendimiento'),
        ('Mouse Logitech MX', 45, 99.99, 'Mouse inalámbrico ergonómico'),
        ('Teclado Mecánico RGB', 32, 179.50, 'Teclado mecánico con iluminación RGB'),
        ('Monitor LG 27 pulgadas', 8, 299.99, 'Monitor 4K de alta resolución'),
        ('Cable HDMI 2.1', 120, 15.99, 'Cable HDMI de última generación'),
        ('Hub USB-C 7 puertos', 24, 89.99, 'Expande la conectividad de tu dispositivo'),
        ('Webcam Logitech C920', 18, 79.99, 'Webcam Full HD para videollamadas'),
        ('Auriculares Sony WH1000XM5', 11, 399.99, 'Auriculares con cancelación de ruido'),
        ('Soporte para Laptop', 56, 29.99, 'Soporte ajustable de aluminio'),
        ('Adaptador de corriente USB-C', 85, 45.00, 'Cargador rápido 65W')
      `

      db.query(insertSQL, (err) => {
        if (err) {
          console.error('Error insertando datos:', err)
          return res.status(500).json({ message: 'Error insertando datos' })
        }

        res.json({ message: 'Productos inicializados correctamente' })
      })
    })
  })
})

// POST: Crear nuevo producto
app.post('/api/productos', (req, res) => {
  const { nombre, cantidad, precio, descripcion } = req.body

  if (!nombre || cantidad === undefined) {
    return res.status(400).json({ message: 'Nombre y cantidad son obligatorios' })
  }

  const sql = 'INSERT INTO productos (nombre, cantidad, precio, descripcion) VALUES (?, ?, ?, ?)'
  db.query(sql, [nombre, cantidad, precio || null, descripcion || null], (err, result) => {
    if (err) {
      console.error('Error al crear producto:', err)
      return res.status(500).json({ message: 'Error al crear producto' })
    }

    res.status(201).json({
      id: result.insertId,
      nombre,
      cantidad,
      precio,
      descripcion,
      message: 'Producto creado correctamente',
    })
  })
})

// PUT: Actualizar producto
app.put('/api/productos/:id', (req, res) => {
  const { id } = req.params
  const { nombre, cantidad, precio, descripcion } = req.body

  if (!nombre || cantidad === undefined) {
    return res.status(400).json({ message: 'Nombre y cantidad son obligatorios' })
  }

  const sql = 'UPDATE productos SET nombre = ?, cantidad = ?, precio = ?, descripcion = ? WHERE id = ?'
  db.query(sql, [nombre, cantidad, precio || null, descripcion || null, id], (err, result) => {
    if (err) {
      console.error('Error al actualizar producto:', err)
      return res.status(500).json({ message: 'Error al actualizar producto' })
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' })
    }

    res.json({ message: 'Producto actualizado correctamente' })
  })
})

// DELETE: Eliminar producto
app.delete('/api/productos/:id', (req, res) => {
  const { id } = req.params

  const sql = 'DELETE FROM productos WHERE id = ?'
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar producto:', err)
      return res.status(500).json({ message: 'Error al eliminar producto' })
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' })
    }

    res.json({ message: 'Producto eliminado correctamente' })
  })
})

app.listen(8081, () => {
  console.log('Servidor backend corriendo en http://localhost:8081')
})
