import React from 'react';
import styles from '../styles/AcercaDeNosotros.module.css';
import logo from '../assets/Logo Huellitas.png'; // Importar el logo

const AcercaDeNosotros = () => {
  return (
    <div className={styles.acercaDeNosotros}>
      <h1>Acerca de Nosotros</h1>
      <img src={logo} alt="Logo Huellitas" className={styles.logo} /> {/* Agregar el logo */}
      <p>
        En <strong>Huellitas</strong>, nos dedicamos a brindar el mejor cuidado a tus mascotas. Nuestro equipo de
        veterinarios y especialistas está comprometido con la salud y el bienestar de los animales, ofreciendo servicios
        veterinarios de alta calidad y atención personalizada para cada uno de nuestros pacientes.
      </p>

      <div className={styles.misionVision}>
        <div className={styles.card}>
          <h2>Nuestra Misión</h2>
          <p>
            Proveer atención médica veterinaria de excelencia, con un enfoque en la prevención y el cuidado integral
            de las mascotas, promoviendo su bienestar y felicidad.
          </p>
        </div>

        <div className={styles.card}>
          <h2>Nuestra Visión</h2>
          <p>
            Ser el centro veterinario líder en la región, reconocido por nuestra pasión, dedicación y compromiso
            hacia la salud animal, utilizando tecnología avanzada y un equipo humano altamente capacitado.
          </p>
        </div>
      </div>

      <div className={styles.valores}>
        <h2>Nuestros Valores</h2>
        <ul>
          <li><strong>Compromiso:</strong> Estamos comprometidos con la salud y bienestar de las mascotas.</li>
          <li><strong>Amor por los animales:</strong> Tratamos a cada mascota como si fuera parte de nuestra familia.</li>
          <li><strong>Profesionalismo:</strong> Contamos con un equipo altamente calificado y en constante capacitación.</li>
          <li><strong>Innovación:</strong> Utilizamos las mejores herramientas y técnicas para brindar un cuidado de calidad.</li>
          <li><strong>Confianza:</strong> Construimos relaciones duraderas con nuestros clientes basadas en la confianza y transparencia.</li>
        </ul>
      </div>
    </div>
  );
};

export default AcercaDeNosotros;

