import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/ActualizarDatos.module.css';

const ActualizarDatos = () => {
  const [usuario, setUsuario] = useState(null);
  const [formData, setFormData] = useState({});
  const [tipoUsuario, setTipoUsuario] = useState('empleado');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const clienteId = localStorage.getItem('clienteId');
    const empleadoId = localStorage.getItem('empleadoId');
    
    const fetchUsuario = async () => {
      try {
        let endpoint = '';
        let id = '';
        
        if (clienteId) {
          endpoint = 'cliente';
          id = clienteId;
          setTipoUsuario('cliente');
        } else if (empleadoId) {
          endpoint = 'empleado';
          id = empleadoId;
          setTipoUsuario('empleado');
        } else {
          setError("Usuario no autenticado");
          return;
        }
        
        const response = await fetch(`http://localhost:8080/${endpoint}/${id}`);
        if (!response.ok) throw new Error('Error obteniendo datos');

        const data = await response.json();
        setUsuario(data);
        setFormData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError(error.message);
      }
    };

    fetchUsuario();
  }, []);

  if (error) return <div className={styles.error}>{error}</div>;       //Mostrar error
  if (!usuario) return <div>Cargando...</div>;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const endpoint = tipoUsuario === 'empleado' ? 'empleado' : 'cliente';
      const id = tipoUsuario === 'empleado' 
        ? localStorage.getItem('empleadoId') 
        : localStorage.getItem('clienteId');

      const response = await fetch(`http://localhost:8080/${endpoint}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Datos actualizados correctamente!');
        navigate('/mi-perfil');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (!usuario) return <div>Cargando...</div>;

  return (
    <div className={styles.formContainer}>
      {error && <div className={styles.error}>{error}</div>} 
      <h1>Actualizar Datos</h1>
      <form onSubmit={handleSubmit}>
        {/* Campos comunes */}
        <div className={styles.formGroup}>
          <label>Nombre</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre || ''}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Apellido</label>
          <input
            type="text"
            name="apellido"
            value={formData.apellido || ''}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Correo</label>
          <input
            type="email"
            name="correo"
            value={formData.correo || ''}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Teléfono</label>
          <input
            type="text"
            name="telefono"
            value={formData.telefono || ''}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Fecha de nacimiento</label>
          <input
            type="date"
            name="fechaNacimiento"
            value={formData.fechaNacimiento || ''}
            onChange={handleChange}
          />
        </div>

        {/* Campos específicos por tipo de usuario */}
        {tipoUsuario === 'empleado' ? (
          <>
            <div className={styles.formGroup}>
              <label>Cargo</label>
              <input
                type="text"
                name="cargo"
                value={formData.cargo || ''}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Especialidad</label>
              <input
                type="text"
                name="especialidad"
                value={formData.especialidad || ''}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Tarjeta Profesional</label>
              <input
                type="text"
                name="numTarjetaProfesional"
                value={formData.numTarjetaProfesional || ''}
                onChange={handleChange}
              />
            </div>
          </>
        ) : (
          <div className={styles.formGroup}>
            <label>Fecha de Afiliación</label>
            <input
              type="date"
              name="fechaAfiliacion"
              value={formData.fechaAfiliacion || ''}
              onChange={handleChange}
            />
          </div>
        )}

        <button type="submit" className={styles.submitButton}>
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default ActualizarDatos;

// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import styles from '../styles/ActualizarDatos.module.css';

// const ActualizarDatos = () => {
//   const [empleado, setEmpleado] = useState(null);
//   const [formData, setFormData] = useState({});
//   const navigate = useNavigate();

//   useEffect(() => {
//     const empleadoId = localStorage.getItem('empleadoId');
    
//     // Obtener datos actuales del empleado
//     const fetchEmpleado = async () => {
//       const response = await fetch(`http://localhost:8080/empleado/${empleadoId}`);
//       const data = await response.json();
//       setEmpleado(data);
//       setFormData(data); 
//     };

//     fetchEmpleado();
//   }, []);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     try {
//       const response = await fetch(`http://localhost:8080/empleado/${empleado.id}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData)
//       });

//       if (response.ok) {
//         alert('Datos actualizados correctamente!');
//         navigate('/mi-perfil');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   if (!empleado) return <div>Cargando...</div>;

//   return (
//     <div className={styles.formContainer}>
//       <h1>Actualizar Datos</h1>
//       <form onSubmit={handleSubmit}>
//         <div className={styles.formGroup}>
//           <label>Nombre</label>
//           <input
//             type="text"
//             name="nombre"
//             value={formData.nombre || ''}
//             onChange={handleChange}
//           />
//         </div>

//         <div className={styles.formGroup}>
//           <label>Apellido</label>
//           <input
//             type="text"
//             name="apellido"
//             value={formData.apellido || ''}
//             onChange={handleChange}
//           />
//         </div>

//         <div className={styles.formGroup}>
//           <label>Cargo</label>
//           <input
//             type="text"
//             name="cargo"
//             value={formData.cargo || ''}
//             onChange={handleChange}
//           />
//         </div>

//         <div className={styles.formGroup}>
//           <label>Correo</label>
//           <input
//             type="email"
//             name="correo"
//             value={formData.correo || ''}
//             onChange={handleChange}
//           />
//         </div>

//         <div className={styles.formGroup}>
//           <label>Telefono</label>
//           <input
//             type="text"
//             name="telefono"
//             value={formData.telefono || ''}
//             onChange={handleChange}
//           />
//         </div>

//         <div className={styles.formGroup}>
//           <label>Fecha de nacimiento</label>
//           <input
//             type="date"
//             name="fechaNacimiento"
//             value={formData.fechaNacimiento || ''}
//             onChange={handleChange}
//           />
//         </div>

//         <div className={styles.formGroup}>
//           <label>Especialidad</label>
//           <input
//             type="text"
//             name="especialidad"
//             value={formData.especialidad || ''}
//             onChange={handleChange}
//           />
//         </div>

//         <button type="submit" className={styles.submitButton}>
//           Guardar Cambios
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ActualizarDatos;