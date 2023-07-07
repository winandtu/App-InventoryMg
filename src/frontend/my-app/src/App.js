import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/auth/login';
import RegisterUsr from './components/auth/register';
import Map from './components/maps/map';
import Admin from './components/admin/admin';
import Operario from './components/operario/operario';
import PointRegister from './components/points/point';
import PointsOp from './components/operario/pointsOp';
import PointRegisterOp from './components/points/pointRegisterOp';
import DashboardAdmin from './components/admin/dashboardAdmin';
import './App.css';


function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterUsr />} />
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path="/map" element={<Map />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/operario" element={<Operario />} />
        <Route path="/point" element={<PointRegister />} />
        <Route path="/pointsOp" element={<PointsOp />} />
        <Route path="/pointRegisterOp" element={<PointRegisterOp />} />
        <Route path="/dashboardAdmin" element={<DashboardAdmin />} />
        
       


      </Routes>
    </Router>
  );
}

export default App;
