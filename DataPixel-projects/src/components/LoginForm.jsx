import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

const API_BASE = 'http://localhost:8081'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    setError('')
    setSuccess('')

    if (!email || !password) {
      setError('Todos los campos son obligatorios')
      return
    }

    setLoading(true)

    try {
      const response = await axios.post(`${API_BASE}/login`, { email, password })
      const { token, user } = response.data
      localStorage.setItem('token', token)
      localStorage.setItem('userData', JSON.stringify(user)) // Opcional, para datos básicos
      setSuccess('Login exitoso')
      navigate('/profile')
    } catch (err) {
      const message = err.response?.data?.message || 'Error al iniciar sesión'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        background: '#1a202c',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
      }}
    >
      <div
        style={{
          background: '#2d3748',
          padding: '40px',
          borderRadius: '15px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
          width: '100%',
          maxWidth: '400px',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Iniciar Sesión</h2>

        <form
          onSubmit={handleLogin}
          style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label>Correo electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@datapixel.com"
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: 'none',
                background: '#1a202c',
                color: 'white',
              }}
              required
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: 'none',
                background: '#1a202c',
                color: 'white',
              }}
              required
            />
          </div>

          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'green' }}>{success}</p>}

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '12px',
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginTop: '10px',
            }}
          >
            {loading ? 'Cargando...' : 'Entrar'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', color: '#a0aec0' }}>
          ¿No tienes cuenta?{' '}
          <Link to="/registro" style={{ color: '#3b82f6', textDecoration: 'none' }}>
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginForm
