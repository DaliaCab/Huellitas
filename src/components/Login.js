import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Login.module.css';
import { GrLogin } from "react-icons/gr";
import { GrUserNew } from "react-icons/gr";

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('empleado');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  const endpoint = userType === "empleado" 
    ? "http://localhost:8080/login-empleado" 
    : "http://localhost:8080/login";

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, contrasena: password }),
    });

    const data = await response.json();
    
    if (response.ok) {
      // Guardar el ID según el tipo de usuario
      if (userType === "empleado") {
        localStorage.setItem("empleadoId", data.id); // Guarda el ID del empleado
        navigate("/dashboard-empleado");
      } else {
        localStorage.setItem("clienteId", data.id); // Guarda el ID del cliente
        navigate("/perfil-cliente");
      }
    } else {
      setError(data.mensaje || "Credenciales incorrectas");
    }
  } catch (err) {
    setError("Error de conexión");
  }
};
return (
      <div className={styles.loginContainer}>
        <div className={styles.formContainer}>
          <h2>Iniciar Sesión</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label>Tipo de usuario</label>
              <select 
                value={userType} 
                onChange={(e) => setUserType(e.target.value)}
                className={styles.select}
              >
                <option value="empleado">Empleado</option>
                <option value="cliente">Cliente</option>
              </select>
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="id">ID</label>
              <input
                type="number"
                id="id"
                value={id}
                onChange={(e) => setId(e.target.value.replace(/[^0-9]/g, ''))} // Solo números
                min="1" // Valor mínimo
                required // Campo obligatorio
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength="6"  // Longitud mínima de la contraseña
                required
              />
            </div>
            
            {error && <div className={styles.error}>{error}</div>}  
            
          
            <div className={styles.buttonsContainer}>
              <button 
                type="submit" 
                className={styles.loginButton}
                disabled={!id || !password}
              >
                <GrLogin /> Ingresar
              </button>
              <button 
                className={styles.nuevoUsuarioButton}
                onClick={() => navigate("/nuevo-usuario")}
              >
                <GrUserNew /> Crear Nuevo Usuario
              </button>
            </div>
          </form>

        </div>
      </div>
    );
  };
  
  export default Login;