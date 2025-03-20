import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../styles/PerfilCliente.module.css";

const PerfilCliente = () => {
  const { id } = useParams();
  const [cliente, setCliente] = useState(null);
  const [error, setError] = useState("");
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const handlePasswordChange = async (e) => {
    e.preventDefault();
  
    if (newPassword !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
  
    try {  
      const response = await fetch(`http://localhost:8080/cliente/${cliente.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...cliente, // Mantenemos todos los datos existentes
          contrasena: newPassword // Actualizamos solo la contraseña
        })
      });
  
      if (response.ok) {
        alert('Contraseña actualizada correctamente!');
        setShowPasswordForm(false);
        setNewPassword('');
        setConfirmPassword('');
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Error al actualizar contraseña');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error de conexión');
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción es irreversible.');
    if (!confirmDelete) return;

    try {
      const clienteId = id || localStorage.getItem('clienteId');
      const response = await fetch(`http://localhost:8080/cliente/${clienteId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        localStorage.removeItem('clienteId');
        alert('Cuenta eliminada exitosamente');
        navigate('/login');
      }
    } catch (error) {
      console.error('Error al eliminar la cuenta:', error);
      alert('Error al eliminar la cuenta');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('clienteId');
    navigate('/login');
  };

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const clienteId = id || localStorage.getItem("clienteId");
        if (!clienteId) {
          setError("No hay un ID de cliente disponible.");
          return;
        }

        const response = await fetch(`http://localhost:8080/cliente/${clienteId}`);
        if (!response.ok) {
          throw new Error("Error al obtener los datos del cliente.");
        }

        const data = await response.json();
        setCliente(data);
      } catch (error) {
        console.error("Error:", error);
        setError("Error al cargar los datos del cliente.");
      }
    };

    fetchCliente();
  }, [id]);

  if (error) {
    return <h2 className={styles.error}>{error}</h2>;
  }

  if (!cliente) {
    return <h2 className={styles.loading}>Cargando datos del cliente...</h2>;
  }

  return (
    <div className={styles.perfilContainer}>
      <h1>Mi perfil</h1>
      <div className={styles.perfilInfo}>
        <p><strong>Nombre:</strong> {cliente.nombre} {cliente.apellido}</p>
        <p><strong>Correo:</strong> {cliente.correo}</p>
        <p><strong>Teléfono:</strong> {cliente.telefono}</p>
        <p><strong>Fecha de Nacimiento:</strong> {cliente.fechaNacimiento}</p>
        <p><strong>Fecha de Afiliación:</strong> {cliente.fechaAfiliacion}</p>

        <div className={styles.botonesPerfil}>  
          <button 
            onClick={() => navigate("/actualizar-datos")}
            className={styles.botonAccion}
          >
            Actualizar Datos
          </button>
          
          <button 
            onClick={() => setShowPasswordForm(!showPasswordForm)}
            className={styles.botonAccion}
          >
            Cambiar Contraseña
          </button>
          
          <button 
            onClick={handleLogout}
            className={`${styles.botonAccion} ${styles.botonSecundario}`}
          >
            Cerrar Sesión
          </button>
          
          <button 
            onClick={handleDeleteAccount}
            className={`${styles.botonAccion} ${styles.botonPeligro}`}
          >
            Eliminar cuenta
          </button>
        </div>

        {showPasswordForm && (
          <div className={styles.passwordForm}>
            <input
              type="password"
              placeholder="Nueva contraseña"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirmar contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <div className={styles.formActions}>
              <button 
                type="button" 
                onClick={() => setShowPasswordForm(false)}
                className={styles.botonCancelar}
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                onClick={handlePasswordChange}
                className={styles.botonGuardar}
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        )} 
      </div>
    </div>
  );
};

export default PerfilCliente;