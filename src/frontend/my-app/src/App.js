import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/auth/login';
import RegisterUsr from './components/auth/register';
import Map from './components/maps/map';
import Admin from './components/admin/admin';
import Operario from './components/operario/operario';
//import adminDashboard from './components/admin/admin';
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
        
       


      </Routes>
    </Router>
  );
}

export default App;
