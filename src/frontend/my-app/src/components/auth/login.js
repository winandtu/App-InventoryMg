import React, { useState } from 'react';
import jwtDecode from 'jwt-decode';
import { Link, Navigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false); // Estado para controlar la autenticación
  const [userRole, setUserRole] = useState(''); // Estado para almacenar el rol del usuario

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Realizar la solicitud de inicio de sesión al backend
      const response = await fetch('/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      // Verificar si la respuesta fue exitosa
      if (response.ok) {
        // Obtener el token de la respuesta
        const { token } = await response.json();

        // Decidir qué hacer con el token (por ejemplo, almacenarlo en el estado o en las cookies)

        setError(null);
        setLoggedIn(true); // Marcar al usuario como autenticado

        // Decodificar el token para obtener el rol del usuario
        const decodedToken = jwtDecode(token);
        const { role } = decodedToken;
        setUserRole(role); // Almacenar el rol en el estado
      } else {
        if (response.status === 404) {
          setError('Usuario no existe, debe registrarse primero');
        } else if (response.status === 401) {
          setError('Contraseña incorrecta');
        } else {
          setError('Usuario o contraseña incorrectos');
        }
      }
    } catch (error) {
      setError('Error en la solicitud');
      console.error('Error en la solicitud:', error);
    }
  };

  if (loggedIn) {
    if (userRole === 'admin') {
      return <Navigate to="/admin" />; // Redirigir a la página del admin si está autenticado como admin
    } else if (userRole === 'operario') {
      return <Navigate to="/operario" />; // Redirigir a la página del operario si está autenticado como operario
    } else {
      return <p>No autorizado</p>; // Mostrar mensaje de no autorizado si el rol no está definido correctamente
    }
  }

  return (
    <div>
      <h1>Iniciar sesión</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Nombre de usuario:</label>
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
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Iniciar sesión</button>
      </form>
      {error && <p>{error}</p>} 
      <Link to="/register">Registrate</Link>
      <div><Link to="/map">Map</Link></div>
    </div>
  );
}

export default Login;
