import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

const API_BASE = 'http://localhost:8081'

const RegistroForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    tipo: 'Cliente',
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleRegistro = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!formData.nombre || !formData.email || !formData.password) {
      setError('Todos los campos son obligatorios')
      return
    }

    setSubmitting(true)

    try {
      await axios.post(`${API_BASE}/register`, formData)
      setSuccess('Cuenta creada con éxito')
      setTimeout(() => navigate('/'), 800)
    } catch (err) {
      setError(err.response?.data?.message || 'Error al crear la cuenta')
    } finally {
      setSubmitting(false)
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
            value={formData.nombre}
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
            value={formData.email}
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
            value={formData.password}
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
            value={formData.tipo}
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
            <option value="Administrador">Administrador</option>
            <option value="Empleado">Empleado</option>
          </select>

          {error && <p style={{ color: 'red', margin: 0 }}>{error}</p>}
          {success && <p style={{ color: 'green', margin: 0 }}>{success}</p>}

          <button
            type="submit"
            disabled={submitting}
            style={{
              padding: '12px',
              background: '#48bb78',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: submitting ? 'not-allowed' : 'pointer',
              opacity: submitting ? 0.7 : 1,
              marginTop: '10px',
            }}
          >
            {submitting ? 'Registrando...' : 'Registrarme'}
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
