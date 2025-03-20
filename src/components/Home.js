import React from 'react';
import Carousel from './Carousel';
import styles from '../styles/Home.module.css';
import image from '../assets/veterinaria.jpg';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className={styles.home}>
      <Carousel />

      <div className={styles.section}>
        <div className={styles.text}>
          <h2>¡Garantizamos a tu mascota los mejores cuidados!</h2>
          <p>
            Descubre historias inspiradoras de dueños que han confiado en nosotros para el cuidado de sus mascotas. 
            También encontrarás consejos útiles y recomendaciones para asegurar el bienestar de tu compañero fiel.
          </p>
          <Link to="/blog">
            <button className={styles.blogButton}>EXPLORAR EL BLOG</button>
          </Link>
        </div>
        <div className={styles.image}>
          <img src={image} alt="Veterinaria" />
        </div>
      </div>
    </div>
  );
};

export default Home;

