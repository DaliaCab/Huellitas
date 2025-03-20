import React from "react";
import styles from "../styles/Dashboard.module.css"; 
import { useNavigate } from "react-router-dom";
import logo from '../assets/Logo Huellitas.png';

const DashboardEmpleado = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.dashboardContainer}>
      <h1>Bienvenido al sistema Huellitas</h1>
      <img src={logo} alt="Logo Huellitas" className={styles.logo} />
      <div className={styles.buttonContainer}>
        <button onClick={() => navigate("/pacientes")} className={styles.dashboardButton}>Pacientes</button>
        <button onClick={() => navigate("/mi-perfil")} className={styles.dashboardButton}>Mi Perfil</button>
        <button onClick={() => navigate("/gestion-citas")} className={styles.dashboardButton}>Agenda y Gestión de Citas</button>
      </div>
    </div>
  );
};

export default DashboardEmpleado;