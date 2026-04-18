import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Importamos el navegador

const LoginForm = () => {
  // Manejo de estado para el formulario [cite: 83, 89]
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setCredentials({ ...credentials, [name]: value })
  } // <-- Faltaba esta llave

  const handleSubmit = (e) => {
    e.preventDefault()

    setError('')
    setSuccess('')
    setLoading(true)

    if (!credentials.email || !credentials.password) {
      setError('Todos los campos son obligatorios')//aqui valida que los campos no esten vacios
      setLoading(false)
      return
    }

    // Simulación de login
    setTimeout(() => {
      if (credentials.email === 'admin@test.com' && credentials.password === '1234') {//estas son las credenciales
        setSuccess('Login exitoso ')
      } else {
        setError('Credenciales incorrectas ')
      }
      setLoading(false)
    }, 2000) 
  }

  return (
    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <div style={{ textAlign: 'left' }}>
        <label>Correo electrónico:</label>
        <input
          type="email"
          placeholder="ejemplo@correo.com"
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div style={{ textAlign: 'left' }}>
        <label>Contraseña:</label>
        <input
          type="password"
          placeholder="********"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <button type="submit" disabled={loading}>
        {loading ? 'Cargando...' : 'Ingresar'}
      </button>//
    </form>
  );
};

export default LoginForm;