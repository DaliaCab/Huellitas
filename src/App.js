import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from '../src/components/NavBar';
import Home from './components/Home';
import AcercaDeNosotros from './components/AcercaDeNosotros';
import PreguntasFrecuentes from './components/PreguntasFrecuentes';
import Servicios from './components/Servicios';
import Login from './components/Login';
import Blog from './components/Blog';

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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
