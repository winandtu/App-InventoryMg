import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './operario.css'; // Importar el archivo CSS
import PointsOp from './pointsOp';

const Operario = () => {
  const [operario, setOperario] = useState(null);

  useEffect(() => {
    const fetchOperario = async () => {
      try {
        // Obtén el token del local storage
        const token = localStorage.getItem('token');

        // Verifica si el token existe
        if (token) {
          // Agrega el token al encabezado de autorización
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

          // Realiza la solicitud para obtener la información del operario
          const response = await axios.get('users/operarios');
          setOperario(response.data);
        } else {
          // Si el token no existe, redirige al usuario a la página de inicio de sesión 
          // o muestra un mensaje de error
          console.error('Token no encontrado');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchOperario();
  }, []);

  return (
    <div>
      {operario ? (
        <div>
          <h2>INFORMACIÓN</h2>
          <div className="panel-container">
            <div className="panel-left">
              <div className="container">
                <h1>Mis datos &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;</h1>
                <div className='datos-box'>

                  <h4>Nombre: {operario.name}</h4>

                  <h4>Username: {operario.username}</h4>

                  <h4>Id: {operario.id}</h4>
                </div>
              </div>
            </div>
            <div className="panel-right">
              <div className="container">
                <h1>Mis puntos &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;</h1>
                <PointsOp />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Cargando operario...</p>
      )}
    </div>
  );

};

export default Operario;
