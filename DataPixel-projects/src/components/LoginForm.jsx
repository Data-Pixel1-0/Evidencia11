import React, { useState } from 'react';

const LoginForm = () => {
  // Manejo de estado para el formulario [cite: 83, 89]
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value }); 
  }; // <-- Faltaba esta llave

  const handleSubmit = (e) => {
    e.preventDefault(); 
    
    if (!credentials.email || !credentials.password) {
      setError('Todos los campos son obligatorios');
      return;
    }
    console.log("Iniciando sesión con:", credentials);
  }; 

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Correo electrónico:</label>
      <input 
        type="email" 
        name="email" 
        id="email" 
        onChange={handleChange} 
      />
      
      <label htmlFor="password">Contraseña:</label>
      <input 
        type="password" 
        name="password" 
        id="password" 
        onChange={handleChange} 
      />

      {error && <p style={{color: 'red'}}>{error}</p>}
      <button type="submit">Ingresar</button>
    </form>
  );
}; 
export default LoginForm;