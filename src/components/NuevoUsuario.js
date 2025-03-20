import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/NuevoUsuario.module.css';

const NuevoUsuario = () => {
  const [tipoUsuario, setTipoUsuario] = useState('cliente');
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    contrasena: '',
    fechaNacimiento: '',
    correo: '',
    telefono: '',
    fechaAfiliacion: '',
    cargo: '',
    numTarjetaProfesional: '',
    especialidad: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {  //función para ACTUALIZAR el estado de los campos del formdata
    setFormData({ 
      ...formData,              //se asegura de conservar los datos ya ingresados en otros campos 
      [e.target.name]: e.target.value   
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = tipoUsuario === 'cliente' ? 'cliente' : 'empleado';  //selecciona el endpoint según el tipo de usuario si es cliente o empleado
      const body = {  //crea un objeto con los datos del formulario
        nombre: formData.nombre,
        apellido: formData.apellido,
        contrasena: formData.contrasena,
        fechaNacimiento: formData.fechaNacimiento,
        correo: formData.correo,
        telefono: formData.telefono, 
        ...(tipoUsuario === 'cliente' && {   //si el tipo de usuario es cliente, se añade la fecha de afiliación
          fechaAfiliacion: formData.fechaAfiliacion 
        }),
        ...(tipoUsuario === 'empleado' && {   //si el tipo de usuario es empleado, se añade el cargo, número de tarjeta profesional y especialidad
          cargo: formData.cargo,
          numTarjetaProfesional: formData.numTarjetaProfesional,
          especialidad: formData.especialidad 
        })
      };

      const response = await fetch(`http://localhost:8080/${endpoint}`, {  //hacemos una petición POST a la API, se llama a fetch con la URL correspondiente y se envía el body en formato JSON.
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      
      const data = await response.json();                     //esperamos la respuesta de la API y la convertimos a JSON
      if (response.ok) {
        alert(`Nuevo ${tipoUsuario} creado exitosamente!`);  //si la respuesta es exitosa, se muestra un mensaje de éxito 
        navigate("/login");                                  // Y redirige a la página de login
      } else {
        setError(data.mensaje || "Error al crear usuario");
      }
    } catch (err) {
      setError("Error de conexión");
    }
  };

  return (
    <div className={styles.nuevoUsuarioContainer}>
      <h1>Crear Nuevo Usuario</h1>
      {error && <div className={styles.error}>{error}</div>}
      <form onSubmit={handleSubmit} className={styles.form}>  
        <div className={styles.formGroup}> 
          <label>Tipo de Usuario:</label>
          <select 
            value={tipoUsuario} 
            onChange={(e) => setTipoUsuario(e.target.value)}  //cambia el tipo de usuario según la opción seleccionada
            className={styles.select}
          >
            <option value="cliente">Cliente</option>         {/*opciones para seleccionar el tipo de usuario*/}
            <option value="empleado">Empleado</option>
          </select>
        </div>

        {/* Campos comunes */}
        <div className={styles.formGroup}>
          <label>Nombre:</label>
          <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
        </div>
        <div className={styles.formGroup}>
          <label>Apellido:</label>
          <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} required />
        </div>
        <div className={styles.formGroup}>
          <label>Contraseña:</label>
          <input type="password" name="contrasena" value={formData.contrasena} onChange={handleChange} required />
        </div>
        <div className={styles.formGroup}>
          <label>Fecha de Nacimiento:</label>
          <input type="date" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} required />
        </div>
        <div className={styles.formGroup}>
          <label>Correo:</label>
          <input type="email" name="correo" value={formData.correo} onChange={handleChange} required />
        </div>
        <div className={styles.formGroup}>
          <label>Teléfono:</label>
          <input type="text" name="telefono" value={formData.telefono} onChange={handleChange} required />
        </div>

        {/* Campos dinámicos */}
        {tipoUsuario === 'cliente' ? (      //si el tipo de usuario es cliente, se muestra el campo de fecha de afiliación
          <div className={styles.formGroup}>
            <label>Fecha de Afiliación:</label>
            <input 
              type="date" 
              name="fechaAfiliacion" 
              value={formData.fechaAfiliacion} 
              onChange={handleChange} 
              required 
            />
          </div>
        ) : (                            //si el tipo de usuario es empleado, se muestran los campos de cargo, número de tarjeta profesional y especialidad
          <>
            <div className={styles.formGroup}>
              <label>Cargo:</label>
              <input 
                type="text" 
                name="cargo" 
                value={formData.cargo} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className={styles.formGroup}>
              <label>Número Tarjeta Profesional:</label>
              <input 
                type="text" 
                name="numTarjetaProfesional" 
                value={formData.numTarjetaProfesional} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className={styles.formGroup}>
              <label>Especialidad:</label>
              <input 
                type="text" 
                name="especialidad" 
                value={formData.especialidad} 
                onChange={handleChange} 
                required 
              />
            </div>
          </>
        )}

        <button type="submit" className={styles.submitButton}>   
          Crear {tipoUsuario === 'cliente' ? 'Cliente' : 'Empleado'}  {/*texto del botón según el tipo de usuario*/}
        </button>
      </form>
    </div>
  );
};

export default NuevoUsuario;