import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Aquí podrías limpiar el localStorage si tuvieras tokens
    navigate('/');
  };

  return (
    <div style={{ display: 'flex', minHeight: '80vh', background: '#1a202c', borderRadius: '12px', overflow: 'hidden', border: '1px solid #2d3748' }}>
      {/* Sidebar Lateral */}
      <div style={{ width: '200px', background: '#2d3748', padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h3 style={{ color: '#3b82f6', fontSize: '1.2rem' }}>Data Pixel</h3>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'left' }}>
          <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none', padding: '8px', background: '#4a5568', borderRadius: '5px' }}>🏠 Inicio</Link>
          <Link to="/profile" style={{ color: '#a0aec0', textDecoration: 'none', padding: '8px' }}>👤 Mi Perfil</Link>
        </nav>
        <button 
          onClick={handleLogout}
          style={{ marginTop: 'auto', background: '#e53e3e', color: 'white', border: 'none', padding: '10px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Cerrar Sesión
        </button>
      </div>

      {/* Contenido Principal */}
      <div style={{ flex: 1, padding: '30px', textAlign: 'left' }}>
        <header style={{ marginBottom: '30px', borderBottom: '1px solid #2d3748', paddingBottom: '10px' }}>
          <h2 style={{ margin: 0 }}>Panel de Control</h2>
          <p style={{ color: '#a0aec0', margin: '5px 0 0 0' }}>Bienvenido de nuevo al sistema de gestión.</p>
        </header>

        {/* Tarjetas de Estadísticas */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          <div style={{ background: '#2d3748', padding: '20px', borderRadius: '10px', borderLeft: '4px solid #3b82f6' }}>
            <span style={{ color: '#a0aec0', fontSize: '0.9rem' }}>Proyectos Activos</span>
            <h3 style={{ fontSize: '2rem', margin: '10px 0' }}>08</h3>
          </div>
          <div style={{ background: '#2d3748', padding: '20px', borderRadius: '10px', borderLeft: '4px solid #48bb78' }}>
            <span style={{ color: '#a0aec0', fontSize: '0.9rem' }}>Usuarios Registrados</span>
            <h3 style={{ fontSize: '2rem', margin: '10px 0' }}>24</h3>
          </div>
          <div style={{ background: '#2d3748', padding: '20px', borderRadius: '10px', borderLeft: '4px solid #ed8936' }}>
            <span style={{ color: '#a0aec0', fontSize: '0.9rem' }}>Alertas de Sistema</span>
            <h3 style={{ fontSize: '2rem', margin: '10px 0' }}>02</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;