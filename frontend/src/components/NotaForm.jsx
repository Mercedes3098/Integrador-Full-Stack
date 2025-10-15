import { useState, useEffect } from 'react';
import api from '../services/api';
import '../styles/NotaForm.css';

function NotaForm({ initialData, onSubmit, onCancel }) {
  const [nota, setNota] = useState({
    titulo: '',
    contenido: '',
  });

  const [etiquetas, setEtiquetas] = useState([]);
  const [etiquetasSeleccionadas, setEtiquetasSeleccionadas] = useState([]);
  const [nuevaEtiqueta, setNuevaEtiqueta] = useState('');
  const [showEtiquetaInput, setShowEtiquetaInput] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setNota({
        titulo: initialData.titulo || '',
        contenido: initialData.contenido || '',
      });
      setEtiquetasSeleccionadas(initialData.etiquetas || []);
    }
    fetchEtiquetas();
  }, [initialData]);

  const fetchEtiquetas = async () => {
    try {
      const response = await api.get('/etiquetas');
      console.log('Etiquetas cargadas:', response.data);
      setEtiquetas(response.data);
    } catch (error) {
      console.error('Error al cargar etiquetas:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNota({ ...nota, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...nota, etiquetas: etiquetasSeleccionadas });
  };

  const toggleEtiqueta = (etiqueta) => {
    const existe = etiquetasSeleccionadas.find(e => e.id_etiqueta === etiqueta.id_etiqueta);
    if (existe) {
      setEtiquetasSeleccionadas(etiquetasSeleccionadas.filter(e => e.id_etiqueta !== etiqueta.id_etiqueta));
    } else {
      setEtiquetasSeleccionadas([...etiquetasSeleccionadas, etiqueta]);
    }
  };

  const handleCrearEtiqueta = async () => {
    if (!nuevaEtiqueta.trim()) {
      alert('Ingresa un nombre para la etiqueta');
      return;
    }

    try {
      setLoading(true);
      const response = await api.post('/etiquetas', { nombre: nuevaEtiqueta.trim() });
      console.log('Etiqueta creada:', response.data);
      
      const nuevaEtiq = response.data;
      setEtiquetas([...etiquetas, nuevaEtiq]);
      setEtiquetasSeleccionadas([...etiquetasSeleccionadas, nuevaEtiq]);
      setNuevaEtiqueta('');
      setShowEtiquetaInput(false);
    } catch (error) {
      console.error('Error al crear etiqueta:', error);
      alert('Error al crear la etiqueta: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="nota-form">
      <h3>{initialData ? 'Editar Nota' : 'Nueva Nota'}</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Título:</label>
          <input
            type="text"
            name="titulo"
            placeholder="Título de la nota"
            value={nota.titulo}
            onChange={handleChange}
            required
            autoFocus
          />
        </div>

        <div className="form-group">
          <label>Contenido:</label>
          <textarea
            name="contenido"
            placeholder="Escribe tu nota aquí..."
            value={nota.contenido}
            onChange={handleChange}
            rows="8"
            required
          />
        </div>

        <div className="form-group">
          <label>Etiquetas:</label>
          <div className="etiquetas-container">
            {etiquetas.length === 0 ? (
              <p className="no-etiquetas">No hay etiquetas disponibles</p>
            ) : (
              etiquetas.map((etiqueta) => (
                <button
                  key={etiqueta.id_etiqueta}
                  type="button"
                  className={`etiqueta-btn ${
                    etiquetasSeleccionadas.find(e => e.id_etiqueta === etiqueta.id_etiqueta) 
                      ? 'selected' 
                      : ''
                  }`}
                  onClick={() => toggleEtiqueta(etiqueta)}
                >
                  {etiqueta.nombre}
                </button>
              ))
            )}
            
            {!showEtiquetaInput && (
              <button
                type="button"
                className="etiqueta-btn add-etiqueta"
                onClick={() => setShowEtiquetaInput(true)}
              >
                + Nueva Etiqueta
              </button>
            )}
          </div>

          {showEtiquetaInput && (
            <div className="nueva-etiqueta-input">
              <input
                type="text"
                placeholder="Nombre de la etiqueta"
                value={nuevaEtiqueta}
                onChange={(e) => setNuevaEtiqueta(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleCrearEtiqueta();
                  }
                }}
                disabled={loading}
              />
              <button 
                type="button" 
                onClick={handleCrearEtiqueta}
                disabled={loading}
                className="btn-confirm"
              >
                ✓
              </button>
              <button 
                type="button" 
                onClick={() => {
                  setShowEtiquetaInput(false);
                  setNuevaEtiqueta('');
                }}
                disabled={loading}
                className="btn-cancel-etiqueta"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        <div className="form-buttons">
          <button type="submit" className="btn-primary">
            {initialData ? 'Actualizar Nota' : 'Crear Nota'}
          </button>
          <button type="button" onClick={onCancel} className="btn-secondary">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default NotaForm;