import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './operario.css'; // Importar el archivo CSS


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
          <div className="panel-container">
            <div className="container">
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>#&nbsp;&nbsp;</th>
                      <th>Nombre&nbsp;&nbsp;</th>
                      <th>Latitude&nbsp;&nbsp;</th>
                      <th>Longitude&nbsp;&nbsp;</th>
                    </tr>
                  </thead>
                  <tbody>
                    {points.map((point, index) => (
                      <tr key={point.id}>
                        <td>{index + 1}&nbsp;&nbsp;</td>
                        <td>{point.name}&nbsp;&nbsp;</td>
                        <td>{point.latitude}&nbsp;&nbsp;</td>
                        <td>{point.longitude}&nbsp;&nbsp;</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Cargando Points...</p>
      )}
    </div>
  );
};

export default PointsOp;
