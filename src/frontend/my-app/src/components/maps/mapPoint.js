import React, { useState, useEffect, useCallback, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';

mapboxgl.accessToken = 'pk.eyJ1Ijoid2luYW5kdHUiLCJhIjoiY2xqaTVqcWp4MDl0bTNncjRudThzNTFxeSJ9.bgiS1laMfDA3CShv0CEaCw';

const MapPointCreator = () => {
  const [map, setMap] = useState(null);
  const [name, setName] = useState('');
  const [comments, setComments] = useState('');
  //const [imageUrl, setImageUrl] = useState('');
  const [mapPointCoordinates, setMapPointCoordinates] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const markerRef = useRef(null);

  const handleMapClick = useCallback((e) => {
    const lngLat = e.lngLat;
    const longitude = lngLat.lng;
    const latitude = lngLat.lat;

    // Guardar la longitud y latitud seleccionada en el estado del componente
    setMapPointCoordinates({ longitude, latitude });

    // Mostrar la ventana para crear el punto
    openPointCreationModal();
  }, []);

  const handlePointCreation = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        const response = await axios.post('/points/create-point', {
          name,
          longitude: mapPointCoordinates.longitude,
          latitude: mapPointCoordinates.latitude,
          comments,
        });

        if (response.status === 201) {
          alert('Punto registrado correctamente');
          setName('');
          setComments('');
          //const pointId = response.data.id;
          //await addPointImage(pointId);
        } else {
          alert('Error al registrar el punto');
          console.error('Error al crear el punto');
        }
      } else {
        console.error('Token no encontrado');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }

    // Cerrar la ventana de creación del punto
    closePointCreationModal();
  };

  /*const addPointImage = async (pointId) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        const response = await axios.post('/images/create', {
          pointId,
          imageUrl,
        });

        if (response.status === 201) {
          alert('Punto creado correctamente');
          setImageUrl('');
        } else {
          alert('Error al agregar la imagen');
          console.error('Error al agregar la imagen');
        }
      } else {
        console.error('Token no encontrado');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  }; */

  const openPointCreationModal = () => {
    setShowModal(true);
  };

  const closePointCreationModal = () => {
    setShowModal(false);
  };

  const handleCancel = () => {
    closePointCreationModal();

    // Eliminar el marcador del mapa
    if (markerRef.current) {
      markerRef.current.remove();
    }
  };

  useEffect(() => {
    const initializeMap = () => {
      const mapInstance = new mapboxgl.Map({
        container: 'map-container',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [0, 0],
        zoom: 2,
      });

      // Configurar el evento de click en el mapa
      mapInstance.on('click', handleMapClick);

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
  }, [map, handleMapClick]);

  useEffect(() => {
    if (map && mapPointCoordinates) {
      const markerElement = document.createElement('div');
      markerElement.className = 'marker-creator';
      //markerElement.style.backgroundColor = 'blue';
      //markerElement.style.width = '15px';
      //markerElement.style.height = '15px';

      // Crear el marcador y almacenar la referencia en el estado
      const marker = new mapboxgl.Marker(markerElement)
        .setLngLat([mapPointCoordinates.longitude, mapPointCoordinates.latitude])
        .addTo(map);
      markerRef.current = marker;
    }
  }, [map, mapPointCoordinates]);

  return (
    <div>
      <div id="map-container" style={{ height: '700px' }}></div>
      {showModal && (
        <div className="modal" style={{ background: 'green', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '20px', color: 'white' }}>
          <div className="modal-content">
            <h2>Crear punto</h2>
            <div>
              <label htmlFor="name">Nombre:</label>
              <br />
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="comments">Comentarios:</label>
              <br />
              <input
                type="text"
                id="comments"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                required
              />
            </div>
            <div>
              <button onClick={handlePointCreation}>Crear punto</button>
              <button onClick={handleCancel}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapPointCreator;
