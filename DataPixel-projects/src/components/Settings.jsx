import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useApp } from '../i18n/AppContext'

const Settings = () => {
  const navigate = useNavigate()
  const { theme, setTheme, language, setLanguage, t, colors } = useApp()
  const [saveStatus, setSaveStatus] = useState('')

  // Estados para configuración
  const [config, setConfig] = useState({
    notificaciones: true,
    notificacionesEmail: false,
    privacidad: 'Privado',
  })

  // Función para guardar cambios
  const handleSave = () => {
    setSaveStatus('Guardando...')
    setTimeout(() => {
      localStorage.setItem('appConfig', JSON.stringify(config))
      setSaveStatus('¡Cambios guardados con éxito!')
      setTimeout(() => setSaveStatus(''), 3000)
    }, 1000)
  }

  // Función de Cerrar Sesión
  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userData')
    navigate('/')
  }

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: colors.bg,
        color: colors.text,
        transition: 'all 0.3s ease',
      }}
    >
      {/* Barra Lateral */}
      <div
        className="sidebar"
        style={{
          width: '220px',
          background: colors.sidebar,
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          transition: 'all 0.3s ease',
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
              transition: 'all 0.3s ease',
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
              transition: 'all 0.3s ease',
            }}
          >
            👤 {t('miPerfil')}
          </Link>
          {/* Configuración (ACTIVO) */}
          <Link
            to="/settings"
            style={{
              color: colors.text,
              textDecoration: 'none',
              padding: '10px',
              background: colors.border,
              borderRadius: '5px',
              transition: 'all 0.3s ease',
            }}
          >
            ⚙️ {t('configuracion')}
          </Link>
        </nav>
      </div>

      {/* Contenido Principal */}
      <div style={{ flex: 1, padding: '40px', transition: 'all 0.3s ease' }}>
        <h2
          style={{
            borderBottom: `1px solid ${colors.border}`,
            paddingBottom: '10px',
            transition: 'all 0.3s ease',
          }}
        >
          {t('configuracionSistema')}
        </h2>

        <div
          style={{
            maxWidth: '600px',
            marginTop: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          {/* Sección Apariencia */}
          <div
            style={{
              background: colors.card,
              padding: '20px',
              borderRadius: '10px',
              transition: 'all 0.3s ease',
            }}
          >
            <h3
              style={{
                marginTop: 0,
                color: colors.textDark,
                transition: 'all 0.3s ease',
              }}
            >
              🎨 {t('apariencia')}
            </h3>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '8px' }}>{t('tema')}</label>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '5px',
                  border: 'none',
                  background: colors.input,
                  color: colors.text,
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                }}
              >
                <option value="dark">{t('oscuro')}</option>
                <option value="light">{t('claro')}</option>
              </select>
            </div>
          </div>

          {/* Sección Notificaciones */}
          <div
            style={{
              background: colors.card,
              padding: '20px',
              borderRadius: '10px',
              transition: 'all 0.3s ease',
            }}
          >
            <h3
              style={{
                marginTop: 0,
                color: colors.textDark,
                transition: 'all 0.3s ease',
              }}
            >
              🔔 {t('notificaciones')}
            </h3>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '15px',
              }}
            >
              <span>{t('notificacionesEscritorio')}</span>
              <button
                onClick={() => setConfig({ ...config, notificaciones: !config.notificaciones })}
                style={{
                  padding: '8px 15px',
                  borderRadius: '20px',
                  border: 'none',
                  background: config.notificaciones ? '#48bb78' : '#e53e3e',
                  color: 'white',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease',
                }}
              >
                {config.notificaciones ? t('activadas') : t('desactivadas')}
              </button>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span>{t('notificacionesEmail')}</span>
              <button
                onClick={() =>
                  setConfig({ ...config, notificacionesEmail: !config.notificacionesEmail })
                }
                style={{
                  padding: '8px 15px',
                  borderRadius: '20px',
                  border: 'none',
                  background: config.notificacionesEmail ? '#48bb78' : '#e53e3e',
                  color: 'white',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease',
                }}
              >
                {config.notificacionesEmail ? t('activadas') : t('desactivadas')}
              </button>
            </div>
          </div>

          {/* Sección Privacidad */}
          <div
            style={{
              background: colors.card,
              padding: '20px',
              borderRadius: '10px',
              transition: 'all 0.3s ease',
            }}
          >
            <h3
              style={{
                marginTop: 0,
                color: colors.textDark,
                transition: 'all 0.3s ease',
              }}
            >
              🔒 {t('privacidad')}
            </h3>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '8px' }}>
                {t('nivelPrivacidad')}
              </label>
              <select
                value={config.privacidad}
                onChange={(e) => setConfig({ ...config, privacidad: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '5px',
                  border: 'none',
                  background: colors.input,
                  color: colors.text,
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                }}
              >
                <option value="Privado">{t('privado')}</option>
                <option value="Amigos">{t('amigos')}</option>
                <option value="Público">{t('publico')}</option>
              </select>
            </div>
          </div>

          {/* Sección Idioma */}
          <div
            style={{
              background: colors.card,
              padding: '20px',
              borderRadius: '10px',
              transition: 'all 0.3s ease',
            }}
          >
            <h3
              style={{
                marginTop: 0,
                color: colors.textDark,
                transition: 'all 0.3s ease',
              }}
            >
              🌐 {t('idioma')}
            </h3>
            <div>
              <label style={{ display: 'block', marginBottom: '8px' }}>
                {t('seleccionaIdioma')}
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '5px',
                  border: 'none',
                  background: colors.input,
                  color: colors.text,
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                }}
              >
                <option value="es">{t('español')}</option>
                <option value="en">{t('ingles')}</option>
                <option value="pt">{t('portugues')}</option>
                <option value="fr">{t('frances')}</option>
              </select>
            </div>
          </div>

          {/* Sección Información del Sistema */}
          <div
            style={{
              background: colors.card,
              padding: '20px',
              borderRadius: '10px',
              transition: 'all 0.3s ease',
            }}
          >
            <h3
              style={{
                marginTop: 0,
                color: colors.textDark,
                transition: 'all 0.3s ease',
              }}
            >
              ℹ️ {t('informacionSistema')}
            </h3>
            <div
              style={{ fontSize: '0.9rem', color: colors.textDark, transition: 'all 0.3s ease' }}
            >
              <p>
                <strong>{t('version')}:</strong> 1.0.0
              </p>
              <p>
                <strong>{t('ultimaActualizacion')}:</strong> 20 de abril de 2026
              </p>
              <p>
                <strong>{t('estado')}:</strong>{' '}
                <span style={{ color: '#48bb78' }}>✓ {t('activo')}</span>
              </p>
            </div>
          </div>

          {/* Botones de Acción */}
          <div style={{ display: 'flex', gap: '15px' }}>
            <button
              onClick={handleSave}
              style={{
                flex: 1,
                padding: '12px',
                background: '#3b82f6',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              {t('guardarCambios')}
            </button>
            <button
              onClick={handleLogout}
              style={{
                flex: 1,
                padding: '12px',
                background: '#e53e3e',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              {t('cerrarSesion')}
            </button>
          </div>

          {saveStatus && (
            <p
              style={{
                textAlign: 'center',
                color: '#48bb78',
                transition: 'all 0.3s ease',
              }}
            >
              {saveStatus}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Settings
