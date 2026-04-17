import React from 'react'

const RegistroForm = ({ volver }) => {
  return (
    <div className="login-form">
      <h2>Crear Cuenta</h2>
      <div className="input-group">
        <label>Nombre Completo:</label>
        <input type="text" placeholder="Tu nombre" />
      </div>
      <div className="input-group">
        <label>Correo electrónico:</label>
        <input type="email" placeholder="ejemplo@correo.com" />
      </div>
      <div className="input-group">
        <label>Contraseña:</label>
        <input type="password" placeholder="********" />
      </div>

      {/* Campo de Rol solicitado */}
      <div className="input-group">
        <label>Rol del Usuario:</label>
        <select
          style={{
            width: '100%',
            padding: '10px',
            background: '#333',
            color: 'white',
            border: '1px solid #444',
            borderRadius: '4px',
          }}
        >
          <option value="admin">Administrador</option>
          <option value="operador">Operador</option>
        </select>
      </div>

      <button className="btn-primary" style={{ marginTop: '15px' }}>
        REGISTRARSE
      </button>

      <p
        onClick={volver}
        style={{ color: '#3b82f6', cursor: 'pointer', marginTop: '15px', fontSize: '14px' }}
      >
        ¿Ya tienes cuenta? Inicia sesión
      </p>
    </div>
  )
}

export default RegistroForm
