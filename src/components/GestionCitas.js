import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Citas.module.css';

const GestionCitas = () => {
  const [citas, setCitas] = useState([]);  //estado para GUARDAR la lista de citas
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCitas = async () => {  //función asíncrona para OBTENER la lista de citas
      try {
        const response = await fetch('http://localhost:8080/citas'); //hacemos una petición GET a la API
        const data = await response.json();   //convertimos la respuesta a JSON
        setCitas(data);                      //guardamos esa lista de citas en el estado
      } catch (error) {
        console.error('Error fetching citas:', error);
      }
    };
    fetchCitas();
  }, []);

     // Función para eliminar una cita específica 
  const eliminarCita = async (idCita) => {
    if (window.confirm('¿Estás seguro de eliminar esta cita?')) {
      try {
        const response = await fetch(`http://localhost:8080/cita/${idCita}`, { 
          method: 'DELETE'
        });
        if (response.ok) {
          // Actualiza el estado eliminando la cita borrada
          setCitas(citas.filter(cita => cita.id !== idCita));
        } else {
          console.error('Error al eliminar la cita');
        }
      } catch (error) {
        console.error('Error al eliminar la cita:', error);
      }
    }
  };

  return (
    <div className={styles.citasContainer}>
      <h1>Agenda de Citas</h1>
      <button 
        onClick={() => navigate("/nueva-cita")}
        className={styles.botonNuevaCita}
      >
        Agendar Nueva Cita
      </button>
      
      <table className={styles.tablaCitas}>
        <thead>
          <tr>                               {/*cabecera de la tabla*/}
            <th>ID Cita</th>
            <th>ID Paciente</th>
            <th>Nombre Paciente</th>
            <th>ID Empleado</th>
            <th>Nombre Empleado</th>
            <th>Fecha</th>
            <th>Hora</th>
          </tr>
        </thead>
        <tbody>                             {/*cuerpo de la tabla*/}
          {citas.map(cita => (           //por cada cita en la lista de citas, creamos una fila en la tabla
            <tr key={cita.id}>          {/*para que React pueda identificar de manera única cada fila de la tabla key único*/}
            <td>{cita.id}</td>
            <td>{cita.idPaciente}</td>
            <td>{cita.nombrePaciente}</td>
            <td>{cita.idEmpleado}</td>
            <td>{cita.nombreEmpleado}</td>
            <td>{new Date(cita.fechaHora).toLocaleDateString()}</td>
            <td>{new Date(cita.fechaHora).toLocaleTimeString()}</td>
            <td>
                <button 
                  className={styles.botonEliminar}
                  onClick={() => eliminarCita(cita.id)}
                >
                  ❌ Eliminar
                </button>
              </td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GestionCitas;