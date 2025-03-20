import React from 'react';
import styles from '../styles/PreguntasFrecuentes.module.css';

const PreguntasFrecuentes = () => {
  const faqs = [  // Array de objetos con preguntas y respuestas
    {
      pregunta: '¿Qué es Huellitas?',
      respuesta: 'Huellitas es una aplicación web diseñada para ayudar a las clínicas veterinarias a gestionar sus operaciones de manera más eficiente, desde el registro de pacientes hasta la generación de notificaciones y facturas.',
    },
    {
      pregunta: '¿Cómo puedo implementar Huellitas en mi clínica?',
      respuesta: 'Puedes comenzar contactándonos a través de nuestro sitio web para obtener información sobre la implementación y capacitación en el uso de nuestra plataforma.',
    },
    {
      pregunta: '¿Qué funcionalidades ofrece Huellitas?',
      respuesta: 'Nuestra plataforma incluye registro y gestión de pacientes, agendamiento de citas, actualización de historias clínicas, gestión de exámenes de laboratorio y generación de recordatorios para dueños de mascotas.',
    },
    {
      pregunta: '¿Es Huellitas fácil de usar?',
      respuesta: 'Sí, Huellitas ha sido diseñada con una interfaz intuitiva que permite a los usuarios navegar y gestionar sus tareas fácilmente. También ofrecemos soporte técnico para cualquier duda que puedas tener.',
    },
    {
      pregunta: '¿Ofrecen capacitación para el uso de la plataforma?',
      respuesta: 'Sí, brindamos sesiones de capacitación para el personal de las clínicas que utilizan Huellitas, asegurando que todos estén familiarizados con el sistema y puedan aprovechar al máximo sus funcionalidades.',
    },
    {
      pregunta: '¿Qué debo hacer si tengo problemas técnicos?',
      respuesta: 'Si encuentras algún problema técnico, puedes contactarnos a través de nuestro soporte en línea o por teléfono, y nuestro equipo estará encantado de ayudarte.',
    },
  ];

  return (
    <div className={styles.faq}>
      <h1>Preguntas Frecuentes</h1>
      <div className={styles.faqList}>
        {faqs.map((faq, index) => (  // Mapeo del array de objetos
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
