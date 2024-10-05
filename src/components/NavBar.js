import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li><Link to="/">HOME</Link></li>
        <li><Link to="/acerca">Acerca de nosotros</Link></li>
        <li><Link to="/preguntas">Preguntas frecuentes</Link></li>
        <li><Link to="/servicios">Servicios</Link></li>
        <li><Link to="/blog">Blog</Link></li>
        <li><Link to="/login">Login</Link></li>

      </ul>
    </nav>
  );
};

export default Navbar;

