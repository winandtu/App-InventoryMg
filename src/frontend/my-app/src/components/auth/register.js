import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const RegisterUsr = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //const [role, setRole] = useState('');
  //const [error, setError] = useState(false);
  //const [successMessage, setSuccessMessage] = useState('');
  //const [errorMessage, setErrorMessage] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Realizar la solicitud de creación de usuario al backend
      const response = await fetch('/users/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, username, password, role: 'operario' }),
      });

      // Verificar si la respuesta fue exitosa
      if (response.ok) {
        // Mostrar un mensaje de éxito o redirigir a la página de inicio de sesión
        alert('Operario registrado correctamente');
        setName('');
        setUsername('');
        setPassword('');
      } else {
        // Mostrar un mensaje de error en caso de respuesta no exitosa
        const error = await response.json();
        alert(`Error al registrar el operario: ${error.error}`);
        console.error('Error al crear el usuario');
      }
    } catch (error) {
      //setError(true);
      console.error('Error en la solicitud:', error);
    }
  };

  const regresar = () => {
    navigate('/dashboardAdmin');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Registrar Operario</h1>
        <div>
          <label htmlFor="name">Nombre:</label>
          <br />
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="username">Nombre de usuario:</label>
          <br />
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <br />
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Registrar</button>
      </form>

      <button className='regresar-button' onClick={regresar}>Regresar</button>
    </div>
  );
};

export default RegisterUsr;
