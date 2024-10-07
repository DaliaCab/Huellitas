import React from 'react';
import styles from '../styles/PreguntasFrecuentes.module.css';

const PreguntasFrecuentes = () => {
  const faqs = [
    {
      pregunta: '¿Cuáles son los horarios de atención?',
      respuesta: 'Nuestro centro veterinario está abierto de lunes a viernes de 8:00 a.m. a 6:00 p.m., y los sábados de 9:00 a.m. a 2:00 p.m.',
    },
    {
      pregunta: '¿Ofrecen servicio de emergencias?',
      respuesta: 'Sí, contamos con atención de emergencias las 24 horas. Puedes contactarnos al número de emergencia en cualquier momento.',
    },
    {
      pregunta: '¿Cómo puedo agendar una cita?',
      respuesta: 'Puedes agendar una cita llamando a nuestra línea directa o a través de nuestro sitio web, en la sección de "Agendar Cita".',
    },
    {
      pregunta: '¿Qué vacunas necesitan mis mascotas?',
      respuesta: 'Depende de la especie y la edad de tu mascota. Recomendamos que agendes una consulta con nuestros veterinarios para un plan de vacunación personalizado.',
    },
    {
      pregunta: '¿Qué debo llevar a la primera consulta de mi mascota?',
      respuesta: 'Es importante traer cualquier historial médico previo, las vacunas que ha recibido y cualquier otra información relevante sobre su salud.',
    },
    {
      pregunta: '¿Ofrecen planes de salud para mascotas?',
      respuesta: 'Sí, ofrecemos diferentes planes de salud que incluyen consultas regulares, vacunación y descuentos en otros servicios. Contáctanos para más detalles.',
    },
  ];

  return (
    <div className={styles.faq}>
      <h1>Preguntas Frecuentes</h1>
      <div className={styles.faqList}>
        {faqs.map((faq, index) => (
          <div key={index} className={styles.faqItem}>
            <h3>{faq.pregunta}</h3>
            <p>{faq.respuesta}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreguntasFrecuentes;
