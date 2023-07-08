import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './point.css';

const PointRegister = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [comments, setComments] = useState('');
  const [userId, setUserId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Realizar la solicitud de creación de usuario al backend
      const response = await fetch('/points/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, longitude, latitude, comments, userId }),
      });

      // Verificar si la respuesta fue exitosa
      if (response.ok) {
        // Mostrar un mensaje de éxito o redirigir a la página de inicio de sesión
        alert('Punto registrado correctamente');
        setName('');
        setLongitude('');
        setLatitude('');
        setComments('');
        setUserId('');
      } else {
        // Mostrar un mensaje de error en caso de respuesta no exitosa
        const error = await response.json();
        alert(`Error al registrar el punto: ${error.error}`);
        console.error('Error al crear el punto');
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
        <h1>Registrar Punto de Recolección</h1>
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
          <label htmlFor="longitude">Longitud:</label>
          <br />
          <input
            type="text"
            id="longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="latitude">Latitud:</label>
          <br />
          <input
            type="text"
            id="latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="comments">Comentarios:</label>
          <br />
          <input
            type="text"
            id="comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="userId">Id del usuario:</label>
          <br />
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        <button type="submit">Registrar</button>
      </form>

      <button className='regresar-button' onClick={regresar}>Regresar</button>
    </div>
  );
};

export default PointRegister;
