import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
          <h2>Información del operario:</h2>
          <p>Nombre: {operario.name}</p>
          <p>Username: {operario.username}</p>
          <p>id: {operario.id}</p>
        </div>
      ) : (
        <p>Cargando operario...</p>
      )}
    </div>
  );
};

export default Operario;
