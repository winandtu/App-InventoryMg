import React, { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1Ijoid2luYW5kdHUiLCJhIjoiY2xqaTVqcWp4MDl0bTNncjRudThzNTFxeSJ9.bgiS1laMfDA3CShv0CEaCw';

const Map = () => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    const initializeMap = () => {
      const mapInstance = new mapboxgl.Map({
        container: 'map-container',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [0, 0],
        zoom: 10,
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
          const response = await fetch('http://localhost:3000/points');
          const points = await response.json();

          points.forEach((point) => {
            const { name, longitude, latitude, comments, userId } = point;

            const markerElement = document.createElement('div');
            markerElement.className = 'custom-marker';
            markerElement.style.backgroundColor = 'red'; // Cambiar el color del marcador a amarillo
            markerElement.style.width = '10px'; // Ajustar el tamaño del marcador
            markerElement.style.height = '10px'; // Ajustar el tamaño del marcador

            markerElement.addEventListener('click', () => {
              showModal({ name, longitude, latitude, comments, userId });
            });

            new mapboxgl.Marker(markerElement)
              .setLngLat([longitude, latitude])
              .addTo(map);
          });
        } catch (error) {
          console.error('Error al cargar los puntos:', error);
        }
      };

      loadPoints();
    }
  }, [map]);

  const showModal = (point) => {
    console.log('Mostrar modal:', point);
  };

  return <div id="map-container" style={{ height: '400px' }}></div>;
};

export default Map;
