import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Admin() {
  const [operarios, setOperarios] = useState([]);
  const [puntosRecolectados, setPuntosRecolectados] = useState([]);

  // Obtener la información de los operarios desde el backend
  useEffect(() => {
    const fetchOperarios = async () => {
      try {
        const response = await fetch('/users/'); // Ruta para obtener la información de los operarios
        if (response.ok) {
          const data = await response.json();
          const operariosFiltrados = data.filter((user) => user.role === 'operario');
          setOperarios(operariosFiltrados);
          //setOperarios(data);
        } else {
          console.error('Error al obtener la información de los operarios');
        }
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
      }
    };

    fetchOperarios();
  }, []);

  // Obtener los puntos recolectados por los operarios desde el backend
  useEffect(() => {
    const fetchPuntosRecolectados = async () => {
      try {
        const response = await fetch('/points/'); // Ruta para obtener los puntos recolectados
        if (response.ok) {
          const data = await response.json();
          setPuntosRecolectados(data);
        } else {
          console.error('Error al obtener los puntos recolectados');
        }
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
      }
    };

    fetchPuntosRecolectados();
  }, []);

  return (
    <div>
       <h1>Panel de Administrador</h1>
       <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
    
    <table style={{ width: '50%' }}>
      <caption>Información de Operarios</caption>
      <thead>
        <tr>
          <th>#</th>
          <th>Nombre</th>
          <th>username</th>
          <th>ID</th>
        </tr>
      </thead>
      <tbody>
        {operarios.map((operario, index) => (
          <tr key={operario.id}>
            <td>{index + 1}</td>
            <td>{operario.name}</td>
            <td>{operario.username}</td>
            <td>{operario.id}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>

      <h2>Puntos Recolectados</h2>
      <table>
        <thead> 
          <tr> 
            <th>#</th>
            <th>Nombre</th>
            <th>Operario</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {puntosRecolectados.map((punto, index) => (
            <tr key={punto.id}>
              <td>{index + 1}</td>
              <td>{punto.name}</td>
              <td>{punto.userId}</td>
              <td>{punto.create_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h1>Mapa de puntos recolectados</h1>
        <div><Link to="/map">Map</Link></div>
      </div>
    </div>
  );
}

export default Admin;