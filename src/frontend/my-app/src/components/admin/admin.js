import React, { useState, useEffect } from 'react';
import './admin.css'; // Importar el archivo CSS

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
      {operarios.length > 0 ? (
        <div>
          <h1>INFORMACIÓN</h1>
          <div className="panel-container">
            <div className="panel-left">
              <div className="container">
                <h1>Puntos Recolectados</h1>
                <div className="table-container">
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
                </div>
              </div>

              <div className="container">
                <h1>Comentarios</h1>
                <div className="map-box">
                  {puntosRecolectados.map((punto, index) => (
                    <div key={punto.id}>
                      <p>{punto.name}</p>
                      <p>{punto.comments}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="panel-right">
              <div className="container">
                <h1>Información de Operarios</h1>
                <div className="table-container">
                  <table>
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
              </div>
            </div>
          </div>
        </div>
      ) : ( 
        <p>Cargando...</p>
      )}
    </div>
  );
}

export default Admin;
