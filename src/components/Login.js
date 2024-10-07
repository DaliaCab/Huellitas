import React from 'react';
import styles from '../styles/Login.module.css';

const Login = () => {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.formContainer}>
        <h2>Iniciar Sesión</h2>
        <form>
          <div className={styles.formGroup}>
            <label htmlFor="username">Usuario</label>
            <input type="text" id="username" name="username" required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Contraseña</label>
            <input type="password" id="password" name="password" required />
          </div>
        </form>
      </div>

      {/* Botón afuera del formulario */}
      <button type="submit" className={styles.loginButton}>Login</button>
    </div>
  );
};

export default Login;

