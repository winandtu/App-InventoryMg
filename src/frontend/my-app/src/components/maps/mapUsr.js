import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';

mapboxgl.accessToken = 'pk.eyJ1Ijoid2luYW5kdHUiLCJhIjoiY2xqaTVqcWp4MDl0bTNncjRudThzNTFxeSJ9.bgiS1laMfDA3CShv0CEaCw';

const MapUser = () => {
  const [map, setMap] = useState(null);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const markerRef = useRef(null);

  useEffect(() => {
    const initializeMap = () => {
      const mapInstance = new mapboxgl.Map({
        container: 'map-container',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [0, 0],
        zoom: 2,
      });

      setMap(mapInstance);
    };

    if (!map) {
      initializeMap();
    }

    return () => {
      if (map) {
        map.remove();
      }
    };
  }, [map]);

  useEffect(() => {
    if (map) {
      const loadPoints = async () => {
        try {
          const token = localStorage.getItem('token');
          if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.get('/users/pointsOperario');
            const points = response.data;

            points.forEach((point) => {
              const { id, name, longitude, latitude, comments, userId } = point;

              const markerElement = document.createElement('div');
              markerElement.className = 'custom-marker';
              markerElement.style.backgroundColor = 'red';
              markerElement.style.width = '15px';
              markerElement.style.height = '15px';

              markerElement.addEventListener('click', () => {
                showModal({ id, name, longitude, latitude, comments, userId });
              });

              new mapboxgl.Marker(markerElement)
                .setLngLat([longitude, latitude])
                .addTo(map);
            });
          } else {
            console.log('Token no encontrado');
          }
        } catch (error) {
          console.error('Error al cargar los puntos:', error);
        }
      };

      loadPoints();
    }
  }, [map]);

  const showModal = (point) => {
    setSelectedPoint(point);
    console.log('Mostrar modal:', point);
  };

  const closeModal = () => {
    setSelectedPoint(null);
  };


  const handleDeletePoint = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await axios.delete(`/points/${selectedPoint.id}`);
        if (response.status === 200) {
          alert('Punto eliminado correctamente');
          closeModal();
          ///markerRef.current.remove();////////////////////
          // Eliminar el marcador del mapa
    if (markerRef.current) {
        markerRef.current.remove();
      }
        } else {
          alert('Error al eliminar el punto');
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
      <div id="map-container" style={{ height: '700px' }}></div>
      {selectedPoint && (
        <div
          className="modal"
          style={{
            background: 'green',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '20px',
            color: 'white',
          }}
        >
          <div className="modal-content">
            <h2>{selectedPoint.name}</h2>
            <p>Longitude: {selectedPoint.longitude}</p>
            <p>Latitude: {selectedPoint.latitude}</p>
            <p>Comments: {selectedPoint.comments}</p>
            <p>User ID: {selectedPoint.userId}</p>
            <button onClick={handleDeletePoint}>Borrar</button>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapUser;
