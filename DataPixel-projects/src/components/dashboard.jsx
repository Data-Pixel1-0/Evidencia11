import React from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div
      className="dashboard-container"
      style={{
        display: 'flex',
        minHeight: '80vh',
        background: '#1a202c',
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid #2d3748',
      }}
    >
      {/* Barra Lateral Común */}
      <div
        className="sidebar"
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
          <Link
            to="/dashboard"
            style={{
              color: 'white',
              textDecoration: 'none',
              padding: '10px',
              background: '#4a5568',
              borderRadius: '5px',
            }}
          >
            🏠 Inicio
          </Link>
          <Link to="/profile" style={{ color: 'white', textDecoration: 'none', padding: '10px' }}>
            👤 Mi Perfil
          </Link>
          <Link to="/settings" style={{ color: 'white', textDecoration: 'none', padding: '10px' }}>
            ⚙️ Configuración
          </Link>
        </nav>
      </div>

      {/* Contenido Principal */}
      <div style={{ flex: 1, padding: '30px', textAlign: 'left' }}>
        <header
          style={{ marginBottom: '30px', borderBottom: '1px solid #2d3748', paddingBottom: '10px' }}
        >
          <h2>Panel de Control</h2>
          <p style={{ color: '#a0aec0' }}>Resumen de operaciones Tecnoglass</p>
        </header>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div
            style={{
              background: '#2d3748',
              padding: '20px',
              borderRadius: '10px',
              borderLeft: '4px solid #3b82f6',
            }}
          >
            <span>Proyectos</span>
            <h3 style={{ fontSize: '2rem' }}>08</h3>
          </div>
          <div
            style={{
              background: '#2d3748',
              padding: '20px',
              borderRadius: '10px',
              borderLeft: '4px solid #48bb78',
            }}
          >
            <span>Usuarios</span>
            <h3 style={{ fontSize: '2rem' }}>24</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
