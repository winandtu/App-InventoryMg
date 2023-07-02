import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RegisterUsr = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Realizar la solicitud de creación de usuario al backend
      const response = await fetch('/users/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, username, password, role }),
      });

      // Verificar si la respuesta fue exitosa
      if (response.ok) {
        // Mostrar un mensaje de éxito o redirigir a la página de inicio de sesión
        setSuccessMessage(() => 'Registro exitoso');
        setErrorMessage(() => '');
        console.log('Usuario creado con éxito');
      } else {
        // Mostrar un mensaje de error en caso de respuesta no exitosa
        setError(true);
        console.error('Error al crear el usuario');
      }
    } catch (error) {
      //setError(true);
      setSuccessMessage(() => '');
      setErrorMessage(() => 'Error en la solicitud');
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <div>
      <h1>Registro de usuario</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="username">Nombre de usuario:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="role">Rol:</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">Seleccionar rol</option>
            <option value="admin">Admin</option>
            <option value="operario">Operario</option>
          </select>
        </div>
        <button type="submit">Registrar</button>
      </form>
      {error && <p>Error al crear el usuario</p>}
      {error && <p>{errorMessage}</p>}
      {successMessage && <p>{successMessage}</p>}
      <Link to="/login">Volver al inicio de sesión</Link>
    </div>
  );
};

export default RegisterUsr;
