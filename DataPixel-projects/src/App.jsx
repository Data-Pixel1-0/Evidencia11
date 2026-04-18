import React from 'react'
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import RegistroForm from './components/RegistroForm'
import Dashboard from './components/Dashboard'
import Profile from './components/Profile'
import './App.css'

function App() {
  return (
    <div className="main-container">
      <h1 className="title-datapixel">Data Pixel</h1>

      <Routes>
        {/* Redirección automática si entran a /login por error */}
        <Route path="/login" element={<Navigate to="/" replace />} />

        {/* VISTA PRINCIPAL (LOGIN) */}
        <Route
          path="/"
          element={
            <div className="auth-wrapper">
              <div className="card-professional">
                <LoginForm />
              </div>
              <div className="register-section" style={{ marginTop: '20px' }}>
                <p style={{ color: '#a0aec0' }}>¿No tienes cuenta todavía?</p>
                <Link to="/registro" className="btn-register-link">
                  REGISTRARSE AQUÍ
                </Link>
              </div>
            </div>
          }
        />

        {/* VISTA DE REGISTRO */}
        <Route path="/registro" element={<RegistroForm />} />

        {/* RUTAS PARA RAMA-YURANIS */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  )
}

export default App
