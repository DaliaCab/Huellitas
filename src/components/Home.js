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
          <p>Lee sobre testimonios que han traido a sus mascotas con nuestros profesionales, también sobre sus cuidados y recomendaciones para tu mascota</p>
          <Link to="/blog"><button className={styles.blogButton}>EXPLORAR BLOG </button ></Link>
        </div>
        <div className={styles.image}>
          <img src={image} alt="Imagen" />
        </div>
      </div>
    </div>
  );
};

export default Home;
