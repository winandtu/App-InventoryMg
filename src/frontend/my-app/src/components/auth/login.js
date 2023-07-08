import React, { useState } from 'react';
import jwtDecode from 'jwt-decode';
import { Link, Navigate } from 'react-router-dom';
import './login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');

  const handleLoginSuccess = (token) => {
    setError(null);
    const decodedToken = jwtDecode(token);
    const { role } = decodedToken;
    setUserRole(role);
    setLoggedIn(true);

    // Almacena el token en el local storage
    localStorage.setItem('token', token);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const { token } = await response.json();
        handleLoginSuccess(token);
      } else {
        if (response.status === 404) {
          setError('Usuario no existe, debe registrarse primero');
          if (response.ok) {
            setError('');
          }
        } else if (response.status === 401) {
          setError('Contraseña incorrecta');
        } else {
          setError('Usuario o contraseña incorrectos');
        }

        setUsername('');
        setPassword('');
      }
    } catch (error) {
      setError('Error en la solicitud');
      console.error('Error en la solicitud:', error);
      setUsername('');
      setPassword('');
    }
  };

  if (loggedIn) {
    if (userRole === 'admin') {
      return <Navigate to="/dashboardAdmin" />;
    } else if (userRole === 'operario') {
      return <Navigate to="/dashboardOP" />;
    } else {
      return <p>No autorizado</p>;
    }
  }

  return (
    <div><h1 style={{ color: "red", fontSize: "50px", textAlign: "center" , paddingTop: "10px"}}>Inventory Management</h1>
    <div className="login-container">
      <div className="login-box">
        <h1>Iniciar sesión</h1>
        <br />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
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
            <label htmlFor="password">Password:</label>
            <br />
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
        {error && <p className="error">{error}</p>}
      </div>
      <div className="map-box">
        <Link to="/map">Map</Link>
      </div>
    </div>
    </div>
  );
}

export default Login;
