import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './operario.css'; // Importar el archivo CSS
import './dashboardOp.css'; // Importar el archivo CSS
import Operario from '../operario/operario';


function DashboardOperario() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Realiza la lógica para cerrar sesión

    // Redirige al componente de inicio de sesión
    navigate('/login');
  };

  return (
    <div className="container">
      <div className="sidebar">
        <ul className="menu">
          <li><Link to="/pointRegisterOp">Registrar Puntos de Recolección</Link></li>
          <li><Link to="/map">Ver Mapa</Link></li>
          <div className="sidebar-footer">
            <button className="logout-button" onClick={handleLogout}>Cerrar Sesión</button>
          </div>
        </ul>
      </div>
      <div className="content">
        <h1 className="title">PANEL DE OPERARIO</h1>
        <div className="view-customers">
          <Operario />
        </div>
      </div>
    </div>
  );
}

export default DashboardOperario;
