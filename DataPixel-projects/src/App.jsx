import React from 'react'
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import RegistroForm from './components/RegistroForm'
import Dashboard from './components/Dashboard'
import Profile from './components/Profile'
import Settings from './components/Settings'
import './App.css'

function App() {
  return (
    <div className="main-container">
      <h1 className="title-datapixel">Data Pixel</h1>

      <Routes>
        <Route path="/login" element={<Navigate to="/" replace />} />

        <Route
          path="/"
          element={
            <div className="auth-wrapper">
              <div className="card-professional">
                <LoginForm />
              </div>
              <div style={{ marginTop: '20px' }}>
                <p style={{ color: '#a0aec0' }}>¿No tienes cuenta?</p>
                <Link to="/registro" className="btn-register-link">
                  REGISTRARSE AQUÍ
                </Link>
              </div>
            </div>
          }
        />

        <Route path="/registro" element={<RegistroForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  )
}

export default App
