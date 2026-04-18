import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Profile = () => {
  // Estado para los datos del usuario
  const [user, setUser] = useState({
    nombre: 'Cargando...',
    rol: 'Desarrollador Full Stack',
    email: '',
    ubicacion: 'Colombia, Caribe',
    estado: 'Activo',
  })

  useEffect(() => {
    // 1. Jalamos lo que guardó el Login en el disco del navegador
    const storedData = localStorage.getItem('userData')

    if (storedData) {
      const parsedData = JSON.parse(storedData)

      // 2. Actualizamos el estado con los datos reales
      setUser({
        ...user,
        // Buscamos el nombre de varias formas por si el Login mandó 'user' o 'nombre'
        nombre: parsedData.nombre || parsedData.user || parsedData.usuario || 'Usuario Admin',
        email: parsedData.email || 'admin@datapixel.com',
        rol: parsedData.rol || 'Administrador de Sistema',
      })
    }
  }, [])

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '80vh',
        background: '#1a202c',
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid #2d3748',
      }}
    >
      {/* Sidebar Lateral Original */}
      <div
        style={{
          width: '220px',
          background: '#2d3748',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <h3 style={{ color: '#3b82f6', fontSize: '1.2rem', textAlign: 'center' }}>Data Pixel</h3>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'left' }}>
          <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none', padding: '10px' }}>
            🏠 Inicio
          </Link>
          <Link
            to="/profile"
            style={{
              color: 'white',
              textDecoration: 'none',
              padding: '10px',
              background: '#4a5568',
              borderRadius: '5px',
            }}
          >
            👤 Mi Perfil
          </Link>
          <Link to="/settings" style={{ color: 'white', textDecoration: 'none', padding: '10px' }}>
            ⚙️ Configuración
          </Link>
        </nav>
      </div>

      {/* Contenido del Perfil */}
      <div style={{ flex: 1, padding: '30px', textAlign: 'left' }}>
        <header
          style={{ marginBottom: '30px', borderBottom: '1px solid #2d3748', paddingBottom: '10px' }}
        >
          <h2 style={{ color: 'white' }}>Perfil de Usuario</h2>
          <p style={{ color: '#a0aec0' }}>Información personal y del sistema</p>
        </header>

        <div
          className="profile-card"
          style={{
            background: '#2d3748',
            borderRadius: '15px',
            overflow: 'hidden',
            maxWidth: '600px',
            border: '1px solid #4a5568',
          }}
        >
          {/* Banner decorativo */}
          <div
            style={{ height: '100px', background: 'linear-gradient(90deg, #3b82f6, #2d3748)' }}
          ></div>

          <div style={{ padding: '20px', position: 'relative' }}>
            {/* Círculo del Avatar */}
            <div
              style={{
                width: '100px',
                height: '100px',
                background: '#4a5568',
                borderRadius: '50%',
                border: '5px solid #2d3748',
                position: 'absolute',
                top: '-50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center', // Corregido: sin paréntesis raros
                fontSize: '2.5rem',
              }}
            >
              👤
            </div>

            <div style={{ marginTop: '50px', color: 'white' }}>
              <h3 style={{ fontSize: '1.8rem', margin: '0' }}>{user.nombre}</h3>
              <p style={{ color: '#3b82f6', fontWeight: 'bold', marginBottom: '20px' }}>
                {user.rol}
              </p>

              <div
                style={{
                  display: 'grid',
                  gap: '10px',
                  background: '#1a202c',
                  padding: '15px',
                  borderRadius: '8px',
                }}
              >
                <p style={{ margin: 0 }}>
                  <strong>Email:</strong> {user.email}
                </p>
                <p style={{ margin: 0 }}>
                  <strong>Ubicación:</strong> {user.ubicacion}
                </p>
                <p style={{ margin: 0 }}>
                  <strong>Estado del Sistema:</strong>{' '}
                  <span style={{ color: '#48bb78' }}>● {user.estado}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
