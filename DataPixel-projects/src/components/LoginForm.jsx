import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Importamos el navegador

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // 2. Inicializamos la función

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Aquí simulamos la validación. 
    // Si el usuario le da al botón, lo mandamos al Dashboard.
    if (email !== '' && password !== '') {
      alert("¡Bienvenido a Data Pixel!");
      navigate('/dashboard'); // 3. ¡Aquí ocurre la redirección!
    } else {
      alert("Por favor, llena todos los campos");
    }
  };

  return (
    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <div style={{ textAlign: 'left' }}>
        <label>Correo electrónico:</label>
        <input
          type="email"
          placeholder="ejemplo@correo.com"
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div style={{ textAlign: 'left' }}>
        <label>Contraseña:</label>
        <input
          type="password"
          placeholder="********"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn-primary">
        INICIAR SESIÓN
      </button>
    </form>
  );
};

export default LoginForm;