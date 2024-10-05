import React from 'react';
import styles from '../styles/Blog.module.css';
import image1 from '../assets/gato con cono.jpg'; // Añade tus imágenes
import image2 from '../assets/comida mascotas pasillo.jpg';
import image3 from '../assets/mascotas con ropa.jpg';

const Blog = () => {
  return (
    <div className={styles.container}>
      <h1>¡Bienvenido a nuestro blog!</h1>
      <p>Las noticias más novedosas y los mejores consejos los encontrarás aquí</p>


      <div className={styles.blogPosts}>
        {/* Primer componente */}
        <div className={styles.post}>
          <img src={image1} alt="Post 1" className={styles.image} />
          <h2 className={styles.titulo}>Cómo cuidar a tu gato después de una cirugía</h2>
        </div>

        {/* Segundo componente */}
        <div className={styles.post}>
          <img src={image2} alt="Post 2" className={styles.image} />
          <h2 className={styles.titulo}>¿Sabes cómo elegir la mejor comida para tu mascota?</h2>
        </div>

        {/* Tercer componente */}
        <div className={styles.post}>
          <img src={image3} alt="Post 3" className={styles.image} />
          <h2 className={styles.titulo}>¿Es buena idea vestir a tu mascota?</h2>
        </div>
      </div>
    </div>
  );
};

export default Blog;

