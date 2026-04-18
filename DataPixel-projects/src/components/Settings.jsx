import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Settings = () => {
  const navigate = useNavigate()

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
      {/* Sidebar (Igual al Dashboard) */}
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
          <Link to="/profile" style={{ color: 'white', textDecoration: 'none', padding: '10px' }}>
            👤 Mi Perfil
          </Link>
          <Link
            to="/settings"
            style={{
              color: 'white',
              textDecoration: 'none',
              padding: '10px',
              background: '#4a5568',
              borderRadius: '5px',
            }}
          >
            ⚙️ Configuración
          </Link>
        </nav>
      </div>

      {/* Contenido de Configuración */}
      <div style={{ flex: 1, padding: '30px', textAlign: 'left' }}>
        <header
          style={{ marginBottom: '30px', borderBottom: '1px solid #2d3748', paddingBottom: '10px' }}
        >
          <h2>Configuración del Sistema</h2>
          <p style={{ color: '#a0aec0' }}>Personaliza tu experiencia en la plataforma</p>
        </header>

        <div style={{ maxWidth: '500px' }}>
          <div style={{ marginBottom: '25px' }}>
            <h4 style={{ color: '#3b82f6', marginBottom: '10px' }}>Preferencias de Cuenta</h4>
            <div style={{ background: '#2d3748', padding: '20px', borderRadius: '8px' }}>
              <p>
                <strong>Notificaciones:</strong> Activadas
              </p>
              <p>
                <strong>Privacidad:</strong> Solo mis compañeros
              </p>
              <p>
                <strong>Ubicación:</strong> Caribe, Colombia
              </p>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #2d3748', paddingTop: '20px' }}>
            <h4 style={{ color: '#e53e3e', marginBottom: '10px' }}>Zona de Seguridad</h4>
            <button
              onClick={() => navigate('/')}
              style={{
                background: '#e53e3e',
                color: 'white',
                border: 'none',
                padding: '12px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold',
                width: '200px',
              }}
            >
              CERRAR SESIÓN
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
