import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/auth/login';
import RegisterUsr from './components/auth/register';
import Map from './components/maps/map';
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

      </Routes>
    </Router>
  );
}

export default App;
