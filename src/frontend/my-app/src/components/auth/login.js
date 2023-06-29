import React, { useState } from 'react';
import jwtDecode from 'jwt-decode';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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

        // Decodificar el token para obtener el rol del usuario
        const decodedToken = jwtDecode(token);
        const { role } = decodedToken;

        // Verificar el rol del usuario y redirigir a la página correspondiente
        if (role === 'admin') {
          // Redirigir al dashboard del admin
          //window.location.href = '/admin-dashboard';
          console.log('Es admin');
        } else if (role === 'operario') {
          // Redirigir al dashboard del operario
          //window.location.href = '/operario-dashboard';
          console.log('Es Operario');
        } else {
          // Redirigir a una página de acceso no autorizado o mostrar un mensaje de error
          //window.location.href = '/unauthorized';
          console.log('No autorizado');
        }
      } else {
        // Mostrar mensaje de error en caso de respuesta no exitosa
        console.error('Error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

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
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default Login;
