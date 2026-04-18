import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const RegistroForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    tipo: 'Cliente',
  })
  const navigate = useNavigate()

  const handleRegistro = (e) => {
    e.preventDefault()
    // Aquí guardarías en tu base de datos real
    alert('¡Cuenta creada con éxito!')
    navigate('/') // Vuelve al login
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
          width: '100%',
          maxWidth: '450px',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '25px' }}>Crear Cuenta</h2>

        <form
          onSubmit={handleRegistro}
          style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
        >
          <input
            placeholder="Nombre Completo"
            style={{
              padding: '12px',
              borderRadius: '8px',
              border: 'none',
              background: '#1a202c',
              color: 'white',
            }}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            style={{
              padding: '12px',
              borderRadius: '8px',
              border: 'none',
              background: '#1a202c',
              color: 'white',
            }}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            style={{
              padding: '12px',
              borderRadius: '8px',
              border: 'none',
              background: '#1a202c',
              color: 'white',
            }}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />

          <label>Tipo de Usuario</label>
          <select
            style={{
              padding: '12px',
              borderRadius: '8px',
              border: 'none',
              background: '#1a202c',
              color: 'white',
            }}
            onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
          >
            <option value="Cliente">Cliente</option>
            <option value="Admin">Administrador</option>
          </select>

          <button
            type="submit"
            style={{
              padding: '12px',
              background: '#48bb78',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginTop: '10px',
            }}
          >
            Registrarme
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', color: '#a0aec0' }}>
          ¿Ya tienes cuenta?{' '}
          <Link to="/" style={{ color: '#3b82f6', textDecoration: 'none' }}>
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  )
}

export default RegistroForm
