import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Pacientes.module.css';
import { FaSearch } from "react-icons/fa";
import { RiHealthBookFill } from "react-icons/ri";

const Pacientes = () => {
  const navigate = useNavigate();
  const [pacientes, setPacientes] = useState([]);
  const [nuevoPaciente, setNuevoPaciente] = useState({
    nombre: '',
    fechaNacimiento: '',
    especie: '',
    genero: '',
    raza: '',
    color: '',
    peso: '',
    tamano: '',
    alergias: '',
    enfermedadesCronicas: '',
    vacunas: '',
    estado: 'activo',
    idcliente: ''
  });
  const [filtroId, setFiltroId] = useState('');
  const [pacienteFiltrado, setPacienteFiltrado] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [pacienteEditar, setPacienteEditar] = useState(null);

  // Obtener todos los pacientes
  useEffect(() => {
    fetch('http://localhost:8080/pacientes')
      .then(res => {
        if (!res.ok) throw new Error('Error obteniendo pacientes');
        return res.json();
      })
      .then(data => {
        if (!Array.isArray(data)) throw new Error('Datos no válidos');
        setPacientes(data.filter(p => p !== null)); // Filtra nulos
      })
      .catch(err => {
        console.error('Error:', err);
        setPacientes([]); // Lista vacía en caso de error
      });
  }, []);

  // Filtrar paciente por ID
  const buscarPorId = () => {
    if (!filtroId) return;
    
    fetch(`http://localhost:8080/paciente/${filtroId}`)
      .then(res => res.json())
      .then(data => setPacienteFiltrado(data))
      .catch(err => {
        console.error('Error:', err);
        setPacienteFiltrado(null);
      });
  };

  // Crear nuevo paciente
  const crearPaciente = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:8080/paciente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoPaciente)
      });
      
      if (response.ok) {
        const data = await response.json();
        setPacientes([...pacientes, data]);
        setMostrarFormulario(false);
        setNuevoPaciente({...nuevoPaciente, nombre: '', especie: ''}); // Reset form
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Actualizar paciente
  const actualizarPaciente = async (e, id) => {
    e.preventDefault();
    try {
      const payload = {
        ...pacienteEditar,
        peso: Number(pacienteEditar.peso),
        tamano: Number(pacienteEditar.tamano),
        idcliente: Number(pacienteEditar.idcliente),
        fechaNacimiento: pacienteEditar.fechaNacimiento
      };

      const response = await fetch(`http://localhost:8080/paciente/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (response.ok) {
        const updatedData = await response.json(); // Obtener datos actualizados del servidor
        setPacientes(pacientes.map(p => p.idpaciente === id ? updatedData : p));
        setPacienteEditar(null);
        alert('Datos actualizados correctamente!');
      } else {
        const errorDetail = await response.json();
        alert(`Error ${response.status}: ${errorDetail.message || 'Error desconocido'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error de conexión');
    }
  };

  return (
    <div className={styles.container}>
      <button 
        className={styles.botonDashboard}
        onClick={() => navigate('/dashboard-empleado')}
      >
         Volver al Dashboard
      </button>
      <h1> <RiHealthBookFill />  Gestión de Pacientes</h1>
      
      {/* Filtro por ID */}
      <div className={styles.filtroContainer}>
        <input
          type="number"
          placeholder="Buscar por ID"
          value={filtroId}
          onChange={(e) => {
            setFiltroId(e.target.value);
            if (e.target.value === "") setPacienteFiltrado(null);
          }}
        />
        <button onClick={buscarPorId}><FaSearch />  Buscar</button>
      </div>

      {/* Botón para nuevo paciente */}
      <button 
        className={styles.nuevoBoton}
        onClick={() => setMostrarFormulario(true)}
      >
        + Nuevo Paciente
      </button>

      {/* Formulario de creación */}
      {mostrarFormulario && (
        <div className={styles.modal}>
          <div className={styles.formContainer}>
            <h2>Nuevo Paciente</h2>
            <form onSubmit={crearPaciente}>
              
            <div className={styles.formGroup}>
                <label>ID Cliente-dueño</label>
                <input
                  value={nuevoPaciente.idcliente}
                  onChange={(e) => setNuevoPaciente({...nuevoPaciente, idcliente: e.target.value})}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Nombre*</label>
                <input
                  required
                  value={nuevoPaciente.nombre}
                  onChange={(e) => setNuevoPaciente({...nuevoPaciente, nombre: e.target.value})}
                />
              </div>
              
              <div className={styles.formGroup}>
                <label>Fecha de Nacimiento</label> 
                <input
                  type="date"
                  value={nuevoPaciente.fechaNacimiento}
                  onChange={(e) => setNuevoPaciente({...nuevoPaciente, fechaNacimiento: e.target.value})}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Especie*</label>
                <input
                  required
                  value={nuevoPaciente.especie}
                  onChange={(e) => setNuevoPaciente({...nuevoPaciente, especie: e.target.value})}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Genero</label>
                <input
                  value={nuevoPaciente.genero}
                  onChange={(e) => setNuevoPaciente({...nuevoPaciente, genero: e.target.value})}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Raza</label>
                <input
                  value={nuevoPaciente.raza}
                  onChange={(e) => setNuevoPaciente({...nuevoPaciente, raza: e.target.value})} 
                />
              </div>
              <div className={styles.formGroup}>
                <label>Color</label>
                <input
                  value={nuevoPaciente.color}
                  onChange={(e) => setNuevoPaciente({...nuevoPaciente, color: e.target.value})}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Peso</label>
                <input
                  value={nuevoPaciente.peso}
                  onChange={(e) => setNuevoPaciente({...nuevoPaciente, peso: e.target.value})}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Tamaño cm</label>
                <input
                  value={nuevoPaciente.tamano}
                  onChange={(e) => setNuevoPaciente({...nuevoPaciente, tamano: e.target.value})}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Estado</label>
                <select
                  value={nuevoPaciente.estado}
                  onChange={(e) => setNuevoPaciente({...nuevoPaciente, estado: e.target.value})}
                >
                  <option value="activo">Activo</option>
                  <option value="inactivo">Inactivo</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Alergias</label>
                <input
                  value={nuevoPaciente.alergias || ''}
                  onChange={(e) => setNuevoPaciente({...nuevoPaciente, alergias: e.target.value})}
                  placeholder="Opcional"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Enfermedades Crónicas</label>
                <input
                  value={nuevoPaciente.enfermedadesCronicas || ''}
                  onChange={(e) => setNuevoPaciente({...nuevoPaciente, enfermedadesCronicas: e.target.value})}
                  placeholder="Opcional"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Vacunas</label>
                <input
                  value={nuevoPaciente.vacunas || ''}
                  onChange={(e) => setNuevoPaciente({...nuevoPaciente, vacunas: e.target.value})}
                  placeholder="Separar por comas"
                />
              </div>

              <div className={styles.botonesForm}>
                <button type="submit">Guardar</button>
                <button type="button" onClick={() => setMostrarFormulario(false)}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Cartas de pacientes */}
      <div className={styles.listaPacientes}>
        {(pacienteFiltrado ? [pacienteFiltrado] : pacientes)
          .filter(paciente => paciente && paciente.nombre) // Filtra pacientes nulos o sin nombre
          .map(paciente => (
            <div key={paciente.id} className={styles.pacienteCard}>
              {/* Validación adicional para propiedades */}
              {paciente.nombre && (
                <>
                  <h3>{paciente.nombre} ({paciente.especie || 'Sin especie'})</h3>
                  <p><strong>ID:</strong> {paciente.idpaciente}</p>
                  <p><strong>Dueño:</strong> Cliente #{paciente.idcliente || 'No asignado'}</p>
                  <p><strong>Edad:</strong> {paciente.fechaNacimiento ? 
                    new Date().getFullYear() - new Date(paciente.fechaNacimiento).getFullYear() 
                    : 'Desconocida'} años</p>
                  <p><strong>Genero:</strong> {paciente.genero || 'Sin género'}</p>
                  <p><strong>Estado:</strong> {paciente.estado}</p>
                  <p><strong>Raza:</strong> {paciente.raza || 'Sin raza'}</p>
                  <p><strong>Color:</strong> {paciente.color || 'Sin color'}</p> 
                  <p><strong>Peso:</strong> {paciente.peso || 'Sin peso'} kg</p>
                  <p><strong>Tamaño cm:</strong> {paciente.tamano || 'Sin tamaño'}</p>


                  {/* Campos opcionales con validación */}
                  {paciente.alergias && (
                    <p><strong>Alergias:</strong> {paciente.alergias}</p>
                  )}
                  
                  {paciente.enfermedadesCronicas ? (
                    <p><strong>Enfermedades Crónicas:</strong> {paciente.enfermedadesCronicas}</p>
                  ) : (
                    <p className={styles.noInfo}>Sin enfermedades crónicas registradas</p>
                  )}
                  
                  {paciente.vacunas ? (
                    <p><strong>Vacunas:</strong> {paciente.vacunas}</p>
                  ) : (
                    <p className={styles.noInfo}>No tiene vacunas registradas</p>
                  )}

                  {/* Botón de edición */}
                  <button 
                    className={styles.editarBoton}
                    onClick={() => setPacienteEditar(paciente)}
                  >
                    Editar
                  </button>
                </>
              )}
            </div>
          ))}
      </div>

      {/* Formulario edición*/}
      {pacienteEditar && (
        <div className={styles.modal}>
          <div className={styles.formContainer}>
            <h2>Editar Paciente</h2>
            <form onSubmit={(e) => actualizarPaciente(e, pacienteEditar.idpaciente)}>
             
            
              <div className={styles.formGroup}>
                <label>Nombre</label>
                <input
                  value={pacienteEditar.nombre}
                  onChange={(e) => setPacienteEditar({...pacienteEditar, nombre: e.target.value})}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Fecha de Nacimiento</label>
                <input
                  type="date"
                  value={pacienteEditar.fechaNacimiento}
                  onChange={(e) => setPacienteEditar({...pacienteEditar, fechaNacimiento: e.target.value})}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Especie</label>
                <input
                  value={pacienteEditar.especie}
                  onChange={(e) => setPacienteEditar({...pacienteEditar, especie: e.target.value})}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Genero</label>
                <input
                  value={pacienteEditar.genero}
                  onChange={(e) => setPacienteEditar({...pacienteEditar, genero: e.target.value})}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Raza</label>
                <input
                  value={pacienteEditar.raza}
                  onChange={(e) => setPacienteEditar({...pacienteEditar, raza: e.target.value})}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Color</label>
                <input
                  value={pacienteEditar.color}
                  onChange={(e) => setPacienteEditar({...pacienteEditar, color: e.target.value})}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Peso</label>
                <input
                  value={pacienteEditar.peso}
                  onChange={(e) => setPacienteEditar({...pacienteEditar, peso: e.target.value})}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Tamaño cm</label>
                <input
                  value={pacienteEditar.tamano}
                  onChange={(e) => setPacienteEditar({...pacienteEditar, tamano: e.target.value})}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Estado</label>
                <select
                  value={pacienteEditar.estado}
                  onChange={(e) => setPacienteEditar({...pacienteEditar, estado: e.target.value})}
                >
                  <option value="activo">Activo</option>
                  <option value="inactivo">Inactivo</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Alergias</label>
                <input
                  value={pacienteEditar.alergias || ''}
                  onChange={(e) => setPacienteEditar({...pacienteEditar, alergias: e.target.value})}
                  placeholder="Opcional"
                />
              </div>
              <div className={styles.formGroup}>
                <label>Enfermedades Crónicas</label>
                <input
                  value={pacienteEditar.enfermedadesCronicas || ''}
                  onChange={(e) => setPacienteEditar({...pacienteEditar, enfermedadesCronicas: e.target.value})}
                  placeholder="Opcional"
                />
              </div>
              <div className={styles.formGroup}>
                <label>Vacunas</label>
                <input
                  value={pacienteEditar.vacunas || ''}
                  onChange={(e) => setPacienteEditar({...pacienteEditar, vacunas: e.target.value})}
                  placeholder="Separar por comas"
                />
              </div>
              <div className={styles.formGroup}>
                <label>ID Cliente-dueño</label>
                <input
                  value={pacienteEditar.idcliente}
                  onChange={(e) => setPacienteEditar({...pacienteEditar, idcliente: e.target.value})}
                />
              </div>
              <div className={styles.botonesForm}>
                <button type="submit">Guardar</button>
                <button type="button" onClick={() => setPacienteEditar(null)}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pacientes;