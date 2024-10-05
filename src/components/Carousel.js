import React, { useState, useEffect } from 'react';
import styles from '../styles/Carousel.module.css';
import imagen1 from '../assets/cat_ear.jpg';
import imagen2 from '../assets/Veterinarian catDog.jpg';
import imagen3 from '../assets/veterinarian-shot.jpg';
import imagen4 from '../assets/Logo Huellitas.png';
import { Link } from 'react-router-dom';



const Carousel = () => {
  const [index, setIndex] = useState(0);
  const slides = [
    {
      img: imagen1,
      text: "Profesionales dedicados a brindarle amor y salud a tu compañero fiel.",
      buttonText: <Link to="/servicios" className={styles.linkButton}>Consulta nuestros servicios</Link>
    },
    {
      img: imagen2,
      text: "El cuidado y bienestar de tu mascota, nuestra prioridad.",
      buttonText: <Link to="/login" className={styles.linkButton}>Ingresa</Link>,
    },
    {
      img: imagen3,
      text: "Atención personalizada para cada una de tus mascotas.",
      buttonText: <Link to="/acerca" className={styles.linkButton}>Contáctanos</Link>,
    },
    {
      img: imagen4,
      text: "Tu mascota merece lo mejor, y en Huellitas lo encontrará.",
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
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map(
          (
            hoja,
            i // Añadido las llaves para el mapeo
          ) => (
            <div className={styles.pagina} key={i}>
              <img
                src={hoja.img}
                alt={`Imagen de ${hoja.text}`}
                className={styles.imagen}
              />
              <div className={styles.texto}>
                <h2>{hoja.text}</h2>
                <button className={styles.botonTexto}>{hoja.buttonText}</button>
                {/* Agregado el botón del texto*/}
              </div>
            </div>
          )
        )}
      </div>
      <button onClick={prevPage} className={`${styles.boton} ${styles.prev}`}>
        &#8249;
      </button>{" "}
      {/*Los botones de prev y next*/}
      <button onClick={nextPage} className={`${styles.boton} ${styles.next}`}>
        &#8250;
      </button>
    </div>
  );
};
export default Carousel;