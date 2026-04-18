import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RegistroForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    rol: 'Cliente' // Rol por defecto
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos registrados:", formData);
    alert(`Usuario ${formData.nombre} registrado como ${formData.rol}`);
  };

  return (
    <div className="card-professional">
      <h1 className="title-datapixel">Data Pixel</h1>
      <h2 style={{ marginBottom: '10px' }}>Crear Cuenta</h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div style={{ textAlign: 'left' }}>
          <label>Nombre Completo:</label>
          <input
            type="text"
            name="nombre"
            placeholder="Tu nombre"
            className="input-field"
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ textAlign: 'left' }}>
          <label>Correo electrónico:</label>
          <input
            type="email"
            name="email"
            placeholder="ejemplo@correo.com"
            className="input-field"
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ textAlign: 'left' }}>
          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            placeholder="********"
            className="input-field"
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ textAlign: 'left' }}>
          <label>Rol del Usuario:</label>
          <select 
            name="rol" 
            className="input-field" 
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', borderRadius: '4px', background: '#2d3748', color: 'white' }}
          >
            <option value="Administrador">Administrador</option>
            <option value="Empleado">Empleado</option>
            <option value="Cliente">Cliente</option>
          </select>
        </div>

        <button type="submit" className="btn-primary" style={{ marginTop: '10px' }}>
          REGISTRARSE
        </button>
      </form>

      {/* AQUÍ ESTÁ EL ARREGLO DE LA NAVEGACIÓN */}
      <div style={{ marginTop: '20px' }}>
        <p style={{ color: '#a0aec0' }}>
          ¿Ya tienes cuenta? <Link to="/" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 'bold' }}>Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
};

export default RegistroForm;