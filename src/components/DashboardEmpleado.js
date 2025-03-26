import React from "react";
import styles from "../styles/Dashboard.module.css"; 
import { useNavigate } from "react-router-dom";
import logo from '../assets/Logo Huellitas.png';
import { BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { TfiAgenda } from "react-icons/tfi";
import { MdOutlinePets } from "react-icons/md";

const DashboardEmpleado = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('empleadoId');
    navigate('/login');
  };

  return (
    <div className={styles.dashboardContainer}>
      <h1>Bienvenido al sistema Huellitas</h1>
      <img src={logo} alt="Logo Huellitas" className={styles.logo} />
      <div className={styles.buttonContainer}>
        <button onClick={() => navigate("/pacientes")} className={styles.dashboardButton}><MdOutlinePets />Pacientes</button>
        <button onClick={() => navigate("/mi-perfil")} className={styles.dashboardButton}> <CgProfile />Mi Perfil</button>
        <button onClick={() => navigate("/gestion-citas")} className={styles.dashboardButton}><TfiAgenda />Agenda y Gestión de Citas</button>
      </div>
      <button 
            onClick={handleLogout}
           className={styles.botonSecundario}
          > 
          <BiLogOut />
            Cerrar Sesión
          </button>
    </div>
  );
};

export default DashboardEmpleado;