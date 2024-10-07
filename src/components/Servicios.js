import React from 'react';
import styles from '../styles/Servicios.module.css'; 
import imagen1 from '../assets/Consulta.jpg';
import imagen2 from '../assets/Vacuna.jpg';
import imagen3 from '../assets/Cirugia.jpg';

const Servicios = () => {
  const servicios = [
    {
      titulo: 'Consulta Veterinaria General',
      descripcion: 'Ofrecemos consultas generales para el cuidado preventivo de la salud de tu mascota.',
      imagen: imagen1, 
    },
    {
      titulo: 'Vacunación y Desparasitación',
      descripcion: 'Protege a tu mascota de enfermedades prevenibles con nuestro servicio de vacunación.',
      imagen: imagen2,
    },
    {
      titulo: 'Cirugía y Hospitalización',
      descripcion: 'Contamos con instalaciones equipadas para realizar cirugías y hospitalización postoperatoria.',
      imagen: imagen3,
    },
  ];

  return (
    <div className={styles.servicios}>
      <h1>Nuestros Servicios</h1>
      <p>En Huellitas, estamos comprometidos con el bienestar y la salud de tu mascota. Descubre nuestros servicios:</p>
      
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
