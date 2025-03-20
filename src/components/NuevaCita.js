import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/NuevaCita.module.css';

const NuevaCita = () => {
  const [formData, setFormData] = useState({
    idPaciente: '',
    idEmpleado: '',
    fechaHora: '',
    nombrePaciente: '',
    nombreEmpleado: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/cita', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        alert('Cita agendada exitosamente!');
        navigate('/gestion-citas');
      } else {
        const data = await response.json();
        setError(data.mensaje || 'Error al agendar la cita');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Error de conexión');
    }
  };

  return (
    <div className={styles.nuevaCitaContainer}>
      <h1>Agendar Nueva Cita</h1>
      {error && <div className={styles.error}>{error}</div>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label>ID Paciente:</label>
          <input
            type="number"
            name="idPaciente"
            value={formData.idPaciente}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>ID Empleado:</label>
          <input
            type="number"
            name="idEmpleado"
            value={formData.idEmpleado}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Fecha y Hora:</label>
          <input
            type="datetime-local"
            name="fechaHora"
            value={formData.fechaHora}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Agendar Cita
        </button>
      </form>
    </div>
  );
};

export default NuevaCita;
