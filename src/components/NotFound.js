import React from 'react';
import styles from '../styles/NotFound.module.css';
import logo from '../assets/Logo Huellitas.png';

const NotFound = () => {
  return (
    <div className={styles.container}>
      <img src={logo} alt="Logo Huellitas" className={styles.logo} />
      <h1 className={styles.message}>404 - Página no encontrada</h1>
      <p className={styles.description}>Lo sentimos, la página que buscas no existe.</p>
      <p className={styles.description}>Oops! The page you're looking for doesn't exist.</p>
    </div>
  );
};

export default NotFound;
