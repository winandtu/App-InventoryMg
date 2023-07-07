import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PointRegisterOp = () => {
  const [name, setName] = useState('');
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [comments, setComments] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        const response = await axios.post('/points/create-point', {
          name,
          longitude,
          latitude,
          comments,
        });

        if (response.status === 201) {
          alert('Punto registrado correctamente');
          setName('');
          setLongitude('');
          setLatitude('');
          setComments('');
        } else {
          alert('Error al registrar el punto');
          console.error('Error al crear el punto');
        }
      } else {
        console.error('Token no encontrado');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Registrar</button>
      </form>

      <Link to="/login">Volver al inicio de sesión</Link>
    </div>
  );
};

export default PointRegisterOp;
