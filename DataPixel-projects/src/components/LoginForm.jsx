import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    // Simulamos la respuesta de tu base de datos
    const mockUser = {
      nombre: email.split('@')[0].toUpperCase(), // Convierte el correo en nombre
      email: email,
      rol: email.includes('admin') ? 'Administrador de Sistema' : 'Desarrollador Full Stack',
    }

    // GUARDAMOS LOS DATOS PARA EL PERFIL
    localStorage.setItem('userData', JSON.stringify(mockUser))

    // Navegamos al Perfil
    navigate('/profile')
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
      <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}></h1>

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

          <button
            type="submit"
            style={{
              padding: '12px',
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginTop: '10px',
            }}
          >
            Entrar
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
