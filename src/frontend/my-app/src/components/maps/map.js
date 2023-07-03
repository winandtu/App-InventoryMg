import React, { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1Ijoid2luYW5kdHUiLCJhIjoiY2xqaTVqcWp4MDl0bTNncjRudThzNTFxeSJ9.bgiS1laMfDA3CShv0CEaCw';

const Map = () => {
  const [map, setMap] = useState(null);
  const [selectedPoint, setSelectedPoint] = useState(null);

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
          const response = await fetch('/points');
          const points = await response.json();

          points.forEach((point) => {
            const { name, longitude, latitude, comments, userId } = point;

            const markerElement = document.createElement('div');
            markerElement.className = 'custom-marker';
            markerElement.style.backgroundColor = 'red';
            markerElement.style.width = '15px';
            markerElement.style.height = '15px';

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

  //Muestra la una pantalla pequeña con la información del punto
  const showModal = (point) => {
    setSelectedPoint(point);
    console.log('Mostrar modal:', point);
  };

  const closeModal = () => {
    setSelectedPoint(null);
  };

  return (
    <div>
      <div id="map-container" style={{ height: '700px' }}></div>
      {selectedPoint && (
        <div className="modal" style={{ background: 'green', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '20px', color: 'white' }}>
          <div className="modal-content">
            <h2>{selectedPoint.name}</h2>
            <p>Longitude: {selectedPoint.longitude}</p>
            <p>Latitude: {selectedPoint.latitude}</p>
            <p>Comments: {selectedPoint.comments}</p>
            <p>User ID: {selectedPoint.userId}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Map;
