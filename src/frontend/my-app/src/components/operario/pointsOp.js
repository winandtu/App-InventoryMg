import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PointsOp = () => {
  const [points, setPoints] = useState([]);

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const response = await axios.get('users/pointsOperario');
          setPoints(response.data);
        } else {
          console.error('Token no encontrado');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchPoints();
  }, []);

  return (
    <div>
      {points.length > 0 ? (
        <div>
          <h2>Información de los puntos:</h2>
          {points.map((point) => (
            <div key={point.id}>
              <p>Nombre: {point.name}</p>
              <p>Latitude: {point.latitude}</p>
              <p>Longitude: {point.longitude}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Cargando Points...</p>
      )}
    </div>
  );
};

export default PointsOp;
