import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="card-professional" style={{ maxWidth: '500px', margin: '0 auto' }}>
      <div style={{ position: 'relative', marginBottom: '40px' }}>
        <div style={{ height: '100px', background: 'linear-gradient(90deg, #3b82f6, #2d3748)', borderRadius: '8px 8px 0 0' }}></div>
        <div style={{ 
          width: '80px', height: '80px', background: '#4a5568', borderRadius: '50%', 
          border: '4px solid #1a202c', position: 'absolute', bottom: '-40px', left: '20px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem'
        }}>
          👤
        </div>
      </div>

      <div style={{ textAlign: 'left', padding: '0 20px 20px 20px' }}>
        <h2 style={{ margin: '0' }}>Yuranis Pérez</h2>
        <p style={{ color: '#3b82f6', margin: '5px 0 20px 0', fontWeight: 'bold' }}>Desarrollador Full Stack</p>
        
        <div style={{ background: '#2d3748', padding: '15px', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <p style={{ margin: 0 }}><strong>Email:</strong> kenner@sena.edu.co</p>
          <p style={{ margin: 0 }}><strong>Ubicación:</strong> Colombia, Caribe</p>
          <p style={{ margin: 0 }}><strong>Estado:</strong> Activo</p>
        </div>

        <div style={{ marginTop: '30px', display: 'flex', gap: '15px', alignItems: 'center' }}>
          <Link to="/dashboard" style={{ color: '#a0aec0', textDecoration: 'none' }}>← Volver</Link>
          <button 
            onClick={() => navigate('/')}
            style={{ marginLeft: 'auto', background: 'transparent', border: '1px solid #e53e3e', color: '#e53e3e', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' }}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;