import React from 'react';
import styles from '../styles/AcercaDeNosotros.module.css';
import logo from '../assets/Logo Huellitas.png'; // Importar el logo

const AcercaDeNosotros = () => {
  return (
    <div className={styles.acercaDeNosotros}>
      <h1>Acerca de Nosotros</h1>
      <img src={logo} alt="Logo Huellitas" className={styles.logo} />
      <p>
        <strong>Huellitas</strong> es una plataforma diseñada para transformar la gestión de clínicas veterinarias, 
        simplificando y agilizando sus procesos internos. Nuestro sistema ayuda a optimizar las operaciones, permitiendo a las 
        clínicas gestionar de manera eficiente el historial clínico de cada paciente, agendar citas, actualizar historias clínicas, 
        gestionar exámenes de laboratorio, generar notificaciones, facturas y mucho más.
      </p>
      <p>
        Con <strong>Huellitas</strong>, los dueños de mascotas también pueden revisar los historiales médicos de sus mascotas y recibir 
        recordatorios sobre citas y vacunas. Este sistema innovador no solo facilita la administración de las clínicas veterinarias, 
        sino que también mejora la experiencia del cliente al permitir una interacción rápida y cómoda.
      </p>

      <div className={styles.misionVision}>
        <div className={styles.card}>
          <h2>Nuestra Misión</h2>
          <p>
            Simplificar y modernizar la gestión de clínicas veterinarias, proporcionando una plataforma tecnológica que optimice 
            sus operaciones y mejore la atención al cliente.
          </p>
        </div>

        <div className={styles.card}>
          <h2>Nuestra Visión</h2>
          <p>
            Convertirnos en el sistema de gestión veterinaria líder en la industria, reconocido por nuestra innovación, 
            confiabilidad y capacidad de adaptarnos a las necesidades de las clínicas y sus pacientes.
          </p>
        </div>
      </div>

      <div className={styles.valores}>
        <h2>Nuestros Valores</h2>
        <ul>
          <li><strong>Innovación:</strong> Incorporamos tecnología avanzada para mejorar los servicios veterinarios.</li>
          <li><strong>Confiabilidad:</strong> Ofrecemos una plataforma segura y estable para la gestión clínica.</li>
          <li><strong>Compromiso:</strong> Estamos comprometidos con el éxito y la eficiencia de cada clínica que utiliza nuestra plataforma.</li>
          <li><strong>Facilidad de uso:</strong> Nuestro sistema es intuitivo y fácil de usar, tanto para las clínicas como para los dueños de mascotas.</li>
          <li><strong>Calidad:</strong> Trabajamos para ofrecer un sistema de alta calidad que simplifique el día a día en la clínica.</li>
        </ul>
      </div>
    </div>
  );
};

export default AcercaDeNosotros;
