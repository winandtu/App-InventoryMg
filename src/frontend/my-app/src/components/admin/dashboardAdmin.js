import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegisterUsr from '../auth/register';
import './admin.css'; // Importar el archivo CSS
import './dashboarAdm.css'; // Importar el archivo CSS
import PointRegister from '../points/point';
import Admin from './admin';

function DashboardAdmin() {
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
          <li><Link to="/register">Registrar Operario</Link></li>
          <li><Link to="/point">Registrar Puntos de Recolección</Link></li>
          <li><Link to="/map">Ver Mapa</Link></li>
          <div className="sidebar-footer">
          <button className="logout-button" onClick={handleLogout}>Cerrar Sesión</button>
            </div>
        </ul>
      </div>
      <div className="content">
        <h1 className="title">PANEL DE ADMINISTRADOR</h1>
        <div className="view-customers">
          <Admin />
        </div>
      </div>
    </div>
  );
}

export default DashboardAdmin;
