import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RegisterUsr from '../auth/register';
import './admin.css'; // Importar el archivo CSS
import PointRegister from '../points/point';
import Map from '../maps/map';

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
          localStorage.setItem('operarios', JSON.stringify(operariosFiltrados)); // Almacenar en el almacenamiento local
        } else {
          console.error('Error al obtener la información de los operarios');
        }
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
      }
    };

    const storedOperarios = localStorage.getItem('operarios');
    if (storedOperarios) {
      setOperarios(JSON.parse(storedOperarios));
    } else {
      fetchOperarios();
    }
  }, []);

  // Obtener los puntos recolectados por los operarios desde el backend
  useEffect(() => {
    const fetchPuntosRecolectados = async () => {
      try {
        const response = await fetch('/points/'); // Ruta para obtener los puntos recolectados
        if (response.ok) {
          const data = await response.json();
          setPuntosRecolectados(data);
          localStorage.setItem('puntosRecolectados', JSON.stringify(data)); // Almacenar en el almacenamiento local
        } else {
          console.error('Error al obtener los puntos recolectados');
        }
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
      }
    };

    const storedPuntosRecolectados = localStorage.getItem('puntosRecolectados');
    if (storedPuntosRecolectados) {
      setPuntosRecolectados(JSON.parse(storedPuntosRecolectados));
    } else {
      fetchPuntosRecolectados();
    }
  }, []);

  return (
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
          <h1>mirar que colocar</h1>
        <div className='map-box'>
        <h1>Aquí también</h1>
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
  );
}

export default Admin;
