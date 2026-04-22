import React, { useState, useEffect } from 'react' // Añadido useEffect
import { Link } from 'react-router-dom'
import { useApp } from '../i18n/AppContext'
import axios from 'axios' // Asegúrate de tener axios instalado

const Profile = () => {
  const { theme, language, t, colors } = useApp()

  // Estado para los datos del usuario
  const [user, setUser] = useState({
    nombre: 'Cargando...',
    rol: 'Consultando...',
    email: '',
    ubicacion: 'Colombia, Caribe',
    estado: 'Activo',
  })

  // EFECTO PARA CONECTAR CON LA BASE DE DATOS
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Intentamos traer al usuario con ID 1 (el admin que creamos en HeidiSQL)
        const response = await axios.get('http://localhost:8081/api/usuarios/1')

        if (response.data) {
          setUser({
            nombre: response.data.nombre,
            email: response.data.email,
            rol: response.data.rol || 'Administrador',
            ubicacion: response.data.ubicacion || 'Colombia, Caribe',
            estado: response.data.estado || 'Activo',
          })
        }
      } catch (error) {
        console.error('Error conectando a la BD, usando localStorage:', error)

        // Si falla la conexión, intentamos usar el localStorage que ya tenías
        const storedData = localStorage.getItem('userData')
        if (storedData) {
          const parsedData = JSON.parse(storedData)
          setUser({
            nombre: parsedData.nombre || parsedData.user || parsedData.usuario || 'Usuario Admin',
            email: parsedData.email || 'admin@datapixel.com',
            rol: parsedData.rol || 'Administrador de Sistema',
            ubicacion: 'Colombia, Caribe',
            estado: 'Activo',
          })
        }
      }
    }

    fetchUserData()
  }, [])

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: colors.bg,
        transition: 'background-color 0.3s ease, color 0.3s ease',
      }}
    >
      {/* Sidebar Lateral Original */}
      <div
        style={{
          width: '220px',
          background: colors.sidebar,
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          transition: 'background-color 0.3s ease',
        }}
      >
        <h3 style={{ color: '#3b82f6', fontSize: '1.2rem', textAlign: 'center' }}>Data Pixel</h3>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'left' }}>
          <Link
            to="/dashboard"
            style={{
              color: colors.text,
              textDecoration: 'none',
              padding: '10px',
              transition: 'color 0.3s ease',
            }}
          >
            🏠 {t('inicio')}
          </Link>
          <Link
            to="/profile"
            style={{
              color: colors.text,
              textDecoration: 'none',
              padding: '10px',
              background: colors.border,
              borderRadius: '5px',
              transition: 'background-color 0.3s ease, color 0.3s ease',
            }}
          >
            👤 {t('miPerfil')}
          </Link>
          <Link
            to="/settings"
            style={{
              color: colors.text,
              textDecoration: 'none',
              padding: '10px',
              transition: 'color 0.3s ease',
            }}
          >
            ⚙️ {t('configuracion')}
          </Link>
        </nav>
      </div>

      {/* Contenido del Perfil */}
      <div
        style={{
          flex: 1,
          padding: '40px',
          textAlign: 'left',
          transition: 'background-color 0.3s ease, color 0.3s ease',
        }}
      >
        <header
          style={{
            marginBottom: '30px',
            borderBottom: `1px solid ${colors.border}`,
            paddingBottom: '10px',
            transition: 'border-color 0.3s ease',
          }}
        >
          <h2 style={{ color: colors.text, transition: 'color 0.3s ease' }}>{t('miPerfil')}</h2>
          <p style={{ color: colors.textDark, transition: 'color 0.3s ease' }}>
            {t('informacionPersonal')}
          </p>
        </header>

        <div
          className="profile-card"
          style={{
            background: colors.card,
            borderRadius: '15px',
            overflow: 'hidden',
            maxWidth: '600px',
            border: `1px solid ${colors.border}`,
            transition: 'background-color 0.3s ease, border-color 0.3s ease',
          }}
        >
          {/* Banner decorativo */}
          <div
            style={{
              height: '100px',
              background: 'linear-gradient(90deg, #3b82f6, ' + colors.sidebar + ')',
              transition: 'background 0.3s ease',
            }}
          ></div>

          <div style={{ padding: '20px', position: 'relative' }}>
            {/* Círculo del Avatar */}
            <div
              style={{
                width: '100px',
                height: '100px',
                background: colors.border,
                borderRadius: '50%',
                border: `5px solid ${colors.card}`,
                position: 'absolute',
                top: '-50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2.5rem',
                transition: 'background-color 0.3s ease, border-color 0.3s ease',
              }}
            >
              👤
            </div>

            <div style={{ marginTop: '50px', color: colors.text, transition: 'color 0.3s ease' }}>
              <h3
                style={{
                  fontSize: '1.8rem',
                  margin: '0',
                  color: colors.text,
                  transition: 'color 0.3s ease',
                }}
              >
                {user.nombre}
              </h3>
              <p style={{ color: '#3b82f6', fontWeight: 'bold', marginBottom: '20px' }}>
                {user.rol}
              </p>

              <div
                style={{
                  display: 'grid',
                  gap: '10px',
                  background: colors.bg,
                  padding: '15px',
                  borderRadius: '8px',
                  transition: 'background-color 0.3s ease',
                }}
              >
                <p style={{ margin: 0, color: colors.text, transition: 'color 0.3s ease' }}>
                  <strong>Email:</strong> {user.email}
                </p>
                <p style={{ margin: 0, color: colors.text, transition: 'color 0.3s ease' }}>
                  <strong>{t('ubicacion')}:</strong> {user.ubicacion}
                </p>
                <p style={{ margin: 0, color: colors.text, transition: 'color 0.3s ease' }}>
                  <strong>{t('estado')}:</strong>{' '}
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
