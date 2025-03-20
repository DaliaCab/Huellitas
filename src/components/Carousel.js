import React, { useState, useEffect } from 'react';
import styles from '../styles/Carousel.module.css';
import imagen1 from '../assets/Cat-Ear.png';
import imagen2 from '../assets/Veterinarian_catDog-removebg-preview.png';
import imagen3 from '../assets/vet_con_perro_blanco-removebg-preview.png';
import imagen4 from '../assets/Logo Huellitas.png'; // Logo Huellitas
import { Link } from 'react-router-dom';

const Carousel = () => {
  const [index, setIndex] = useState(0);
  const slides = [
    {
      img: imagen1,
      text: "Brindamos un servicio de calidad para el cuidado de tu mascota.",
      buttonText: <Link to="/servicios" className={styles.linkButton}>Consulta nuestros servicios</Link>
    },
    {
      img: imagen2,
      text: "Optimiza la gestión de tu clínica veterinaria con Huellitas.",
      buttonText: <Link to="/login" className={styles.linkButton}>Ingresa</Link>,
    },
    {
      img: imagen3,
      text: "Facilita el acceso a historiales médicos y citas con nuestra app.",
      buttonText: <Link to="/acerca" className={styles.linkButton}>Conócenos</Link>,
    },
    {
      img: imagen4,
      text: "Explora nuestros artículos y consejos en el blog.",
      buttonText: <Link to="/blog" className={styles.linkButton}>Descubre nuestro blog</Link>,
    },
  ];

  const nextPage = () => {
    setIndex((index + 1) % slides.length);
  };

  const prevPage = () => {
    setIndex((index - 1 + slides.length) % slides.length);
  };

  // Auto-cambio de página
  useEffect(() => {
    const intervalId = setInterval(nextPage, 8000); // Cambia cada 8 segundos
    return () => clearInterval(intervalId); // Limpia el intervalo al desmontar
  });

  return (
    <div className={styles.carrusel}>
      <div
        className={styles.hoja}
        style={{ transform: `translateX(-${index * 100}%)` }} // Mueve el carrusel
      >
        {slides.map( // Mapea cada hoja del carrusel
          (hoja, i) => ( // Cada hoja tiene una imagen, un texto y un botón
            <div className={styles.pagina} key={i}> 
              <img 
                src={hoja.img}
                alt={`Imagen de ${hoja.text}`}
                className={styles.imagen}
              />
              <div className={styles.texto}>
                <h2>{hoja.text}</h2>
                <button className={styles.botonTexto}>{hoja.buttonText}</button>
              </div>
            </div>
          )
        )}
      </div>
      <button onClick={prevPage} className={`${styles.boton} ${styles.prev}`}>
        &#8249;
      </button>
      <button onClick={nextPage} className={`${styles.boton} ${styles.next}`}>
        &#8250;
      </button>
    </div>
  );
};

export default Carousel;
