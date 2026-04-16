import React, { useState } from 'react'

const RobotControl = ({ nombreRobot = 'Pixel-Bot 01', id = 'RX-2026' }) => {
  const [encendido, setEncendido] = useState(false)
  const [mensaje, setMensaje] = useState('Listo para conectar')
  const [cargando, setCargando] = useState(false)

  const manejarClick = () => {
    setCargando(true)
    setMensaje('Enviando señal al robot...')

    setTimeout(() => {
      const nuevoEstado = !encendido
      setEncendido(nuevoEstado)
      setMensaje(nuevoEstado ? 'Robot en funcionamiento' : 'Robot Apagado')
      setCargando(false)
    }, 1200)
  }

  const estilos = {
    card: {
      padding: '20px',
      borderRadius: '12px',
      border: '1px solid #e2e8f0',
      backgroundColor: '#ffffff00',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      textAlign: 'center',
      marginTop: '20px',
    },
    luz: {
      width: '15px',
      height: '15px',
      borderRadius: '50%',
      backgroundColor: encendido ? '#22c55e' : '#ef4444',
      display: 'inline-block',
      marginRight: '10px',
    },
    boton: {
      backgroundColor: encendido ? '#ef4444' : '#2563eb',
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontWeight: 'bold',
      marginTop: '15px',
      opacity: cargando ? 0.7 : 1,
    },
  }

  return (
    <div style={estilos.card}>
      <h2 style={{ margin: '0 0 10px 0' }}>{nombreRobot}</h2>
      <p style={{ color: '#64748b', fontSize: '14px' }}>ID Dispositivo: {id}</p>

      <div style={{ margin: '15px 0' }}>
        <span style={estilos.luz}></span>
        <span style={{ fontWeight: '500' }}>{mensaje}</span>
      </div>

      <button onClick={manejarClick} disabled={cargando} style={estilos.boton}>
        {cargando ? 'Procesando...' : encendido ? 'APAGAR ROBOT' : 'INICIAR ROBOT'}
      </button>
    </div>
  )
}

export default RobotControl
