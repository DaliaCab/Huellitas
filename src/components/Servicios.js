import React from 'react';
import styles from '../styles/Servicios.module.css'; 
import imagen1 from '../assets/GestionPacientes.jpg'; 
import imagen2 from '../assets/AgendamientoCitas.jpg'; 
import imagen3 from '../assets/Notificaciones.jpg'; 


const Servicios = () => {  
  const servicios = [
    {
      titulo: 'Gestión de Pacientes',
      descripcion: 'Registro y seguimiento del historial clínico de las mascotas para un cuidado óptimo.',
      imagen: imagen1, 
    },
    {
      titulo: 'Agendamiento de Citas',
      descripcion: 'Facilita la programación de citas con un sistema intuitivo y accesible.',
      imagen: imagen2,
    },
    {
      titulo: 'Actualización de Datos',
      descripcion: 'Mantén actualizada la información de tus pacientes y sus dueños para una atención personalizada.',
      imagen: imagen3,
    },
  ];
  // Array de objetos con información de los servicios
  return (
    <div className={styles.servicios}>
      <h1>Nuestros Servicios</h1>
      <p>En Huellitas, estamos comprometidos con la eficiencia en la gestión de clínicas veterinarias. Descubre nuestras funcionalidades:</p>
      
      <div className={styles.serviciosList}>
        {servicios.map((servicio, index) => (
          <div key={index} className={styles.servicioCard}>
            <img src={servicio.imagen} alt={servicio.titulo} />
            <h2>{servicio.titulo}</h2>
            <p>{servicio.descripcion}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Servicios;
