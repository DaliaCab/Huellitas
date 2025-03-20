import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from '../src/components/NavBar';
import Home from './components/Home';
import AcercaDeNosotros from './components/AcercaDeNosotros';
import PreguntasFrecuentes from './components/PreguntasFrecuentes';
import Servicios from './components/Servicios';
import Login from './components/Login';
import Blog from './components/Blog';
import Dashboard from './components/DashboardEmpleado';
import PerfilCliente from './components/PerfilCliente';
import GestionCitas from './components/GestionCitas';
import Pacientes from './components/Pacientes';
import PerfilEmpleado from './components/PerfilEmpleado';
import ActualizarDatos from './components/ActualizarDatos';
import NuevaCita from './components/NuevaCita';
import Footer from './components/Footer';
import NuevoUsuario from './components/NuevoUsuario.js';
import NotFound from './components/NotFound';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/acerca" element={<AcercaDeNosotros />} />
          <Route path="/preguntas" element={<PreguntasFrecuentes />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/login" element={<Login />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/dashboard-empleado" element={<Dashboard />} />
          <Route path="/perfil-cliente" element={<PerfilCliente />} />
          <Route path="/gestion-citas" element={<GestionCitas />} />
          <Route path="/pacientes" element={<Pacientes />} />
          <Route path="/mi-perfil" element={<PerfilEmpleado />} />
          <Route path="/actualizar-datos" element={<ActualizarDatos />} />
          <Route path="/nueva-cita" element={<NuevaCita />} />
          <Route path="/nuevo-usuario" element={<NuevoUsuario />} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
