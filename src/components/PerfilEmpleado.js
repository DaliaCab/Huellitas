import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Importa useNavigate
import styles from '../styles/PerfilEmpleado.module.css';
import { BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { MdDelete } from "react-icons/md";
import { FaKey } from "react-icons/fa";
import { SiFormspree } from "react-icons/si";

const PerfilEmpleado = () => {
  const { id } = useParams(); // Captura el ID de la URL si lo pasamos en la ruta
  const [empleado, setEmpleado] = useState(null);
  const [error, setError] = useState('');
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const navigate = useNavigate(); // Inicializa navigate
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción es irreversible.');
    if (!confirmDelete) return;

    try {
      const empleadoId = id || localStorage.getItem('empleadoId');
      const response = await fetch(`http://localhost:8080/empleado/${empleadoId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        localStorage.removeItem('empleadoId');
        alert('Cuenta eliminada exitosamente');
        navigate('/login');
      }
    } catch (error) {
      console.error('Error al eliminar la cuenta:', error);
      alert('Error al eliminar la cuenta');
    }
  };


  const handlePasswordChange = async (e) => {
  e.preventDefault();

  if (newPassword !== confirmPassword) {
    alert('Las contraseñas no coinciden');
    return;
  }

  try {  
    const response = await fetch(`http://localhost:8080/empleado/${empleado.id}/contrasena`, {
      method: 'PUT',                                         // Se hace una solicitud PUT al backend para actualizar la contraseña
      headers: { 'Content-Type': 'application/json' },       // Se envía la nueva contraseña en el body de la solicitud
      body: JSON.stringify({ contrasena: newPassword })
    });

    if (response.ok) {
      alert('Contraseña actualizada correctamente!');
      setShowPasswordForm(false);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

  useEffect(() => {
    const fetchEmpleado = async () => {
      try {
        // Obtén el ID del empleado desde localStorage o la URL
        const empleadoId = id || localStorage.getItem('empleadoId');
        if (!empleadoId) {
          setError("No hay un ID de empleado disponible.");
          return;
        }

        // Hacer la solicitud al backend
        const response = await fetch(`http://localhost:8080/empleado/${empleadoId}`);
        if (!response.ok) {
          throw new Error("Error al obtener los datos del empleado.");
        }

        const data = await response.json();
        setEmpleado(data);
      } catch (error) {
        console.error("Error:", error);
        setError("Error al cargar los datos del empleado.");
      }
    };

    fetchEmpleado();
  }, [id]);

  if (error) {
    return <h2>{error}</h2>;
  }

  if (!empleado) {
    return <h2>Cargando datos del empleado...</h2>;
  }


  const handleLogout = () => {
    localStorage.removeItem('empleadoId');
    navigate('/login');
  };

  return (
    <div className={styles.perfilContainer}>
      <button 
        className={styles.botonDashboard}
        onClick={() => navigate('/dashboard-empleado')}
      >
         Volver al Dashboard
      </button>
      <h1><CgProfile />  Mi Perfil</h1>
      <div className={styles.perfilInfo}>
        <p><strong>Nombre:</strong> {empleado.nombre}</p>
        <p><strong>Apellido:</strong> {empleado.apellido}</p>
        <p><strong>Cargo:</strong> {empleado.cargo}</p>
        <p><strong>Correo:</strong> {empleado.correo}</p>
        <p><strong>Teléfono:</strong> {empleado.telefono}</p>
        <p><strong>Fecha de Nacimiento:</strong> {empleado.fechaNacimiento}</p>
        <p><strong>Especialidad:</strong> {empleado.especialidad}</p>
        
        <div className={styles.botonesPerfil}>  
          
        <button 
            onClick={() => navigate("/actualizar-datos")} // Navega a la ruta /actualizar-datos
            className={styles.botonAccion}
          >
            <SiFormspree />  Actualizar Datos
          </button>
          
          <button 
            onClick={() => setShowPasswordForm(!showPasswordForm)}
            className={styles.botonAccion}
          >
            <FaKey />  Cambiar Contraseña
          </button>
          
          <button 
            onClick={handleLogout}
           className={`${styles.botonAccion} ${styles.botonSecundario}`}
          >
            <BiLogOut />
             Cerrar Sesión
          </button>

          <button 
            onClick={handleDeleteAccount}
            className={`${styles.botonAccion} ${styles.botonPeligro}`}
          >
            <MdDelete />
              Eliminar mi cuenta
          </button>
        </div>

        {showPasswordForm && (
        <div className={styles.passwordForm}>
          <input
            type="password"
            placeholder="Nueva contraseña"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button onClick={handlePasswordChange}>Guardar Cambios</button>
        </div>
      )}
      </div>
    </div>
  );
};

export default PerfilEmpleado;