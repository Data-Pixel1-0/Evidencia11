import React, { useState } from 'react'
import './App.css'
import LoginForm from './components/LoginForm'
import RegistroForm from './components/RegistroForm'

function App() {
  // Este estado controla qué vista mostrar
  const [vista, setVista] = useState('login')

  return (
    <div className="main-container">
      <h1>Data Pixel</h1>

      <div className="card-professional">
        {vista === 'login' ? (
          <>
            <LoginForm />
            <div style={{ marginTop: '20px', borderTop: '1px solid #444', paddingTop: '15px' }}>
              <p style={{ color: '#a0aec0', marginBottom: '10px', fontSize: '14px' }}>
                ¿No tienes cuenta?
              </p>
              <button
                onClick={() => setVista('registro')}
                className="btn-register-link"
                style={{
                  background: 'none',
                  border: '1px solid #3b82f6',
                  color: '#3b82f6',
                  padding: '10px',
                  cursor: 'pointer',
                  borderRadius: '5px',
                  width: '100%',
                }}
              >
                REGISTRARSE AQUÍ
              </button>
            </div>
          </>
        ) : (
          <RegistroForm volver={() => setVista('login')} />
        )}
      </div>
    </div>
  )
}

export default App
