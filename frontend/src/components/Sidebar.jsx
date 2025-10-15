import { useState, useEffect } from 'react';
import api from '../services/api';
import '../styles/Sidebar.css';

function Sidebar({ notas, onRefresh }) {
  const [etiquetas, setEtiquetas] = useState([]);
  const [etiquetaSeleccionada, setEtiquetaSeleccionada] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEtiquetas();
  }, [notas]);

  const fetchEtiquetas = async () => {
    try {
      setLoading(true);
      const response = await api.get('/etiquetas');
      
      // Contar cuántas notas tiene cada etiqueta
      const etiquetasConConteo = response.data.map(etiqueta => {
        const count = notas.filter(nota => 
          nota.etiquetas?.some(e => e.id_etiqueta === etiqueta.id_etiqueta)
        ).length;
        
        return { ...etiqueta, count };
      });

      setEtiquetas(etiquetasConConteo);
    } catch (error) {
      console.error('Error al cargar etiquetas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEtiquetaClick = (etiqueta) => {
    if (etiquetaSeleccionada?.id_etiqueta === etiqueta.id_etiqueta) {
      setEtiquetaSeleccionada(null);
    } else {
      setEtiquetaSeleccionada(etiqueta);
    }
  };

  const handleDeleteEtiqueta = async (e, id_etiqueta) => {
    e.stopPropagation();
    
    if (!window.confirm('¿Eliminar esta etiqueta? Se quitará de todas las notas.')) {
      return;
    }

    try {
      await api.delete(`/etiquetas/${id_etiqueta}`);
      setEtiquetas(etiquetas.filter(e => e.id_etiqueta !== id_etiqueta));
      if (etiquetaSeleccionada?.id_etiqueta === id_etiqueta) {
        setEtiquetaSeleccionada(null);
      }
      if (onRefresh) onRefresh();
      alert('Etiqueta eliminada');
    } catch (error) {
      console.error('Error al eliminar etiqueta:', error);
      alert('Error al eliminar la etiqueta');
    }
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h3>🏷️ Etiquetas</h3>
        {etiquetas.length > 0 && (
          <span className="etiquetas-count">{etiquetas.length}</span>
        )}
      </div>

      {loading ? (
        <p className="sidebar-loading">Cargando...</p>
      ) : etiquetas.length === 0 ? (
        <div className="no-tags">
          <p>Sin etiquetas</p>
          <small>Crea etiquetas al agregar o editar notas</small>
        </div>
      ) : (
        <ul className="etiquetas-list">
          <li 
            className={`etiqueta-item ${!etiquetaSeleccionada ? 'active' : ''}`}
            onClick={() => setEtiquetaSeleccionada(null)}
          >
            <div className="etiqueta-content">
              <span className="etiqueta-icon">📝</span>
              <span className="etiqueta-nombre">Todas las notas</span>
              <span className="etiqueta-badge">{notas.length}</span>
            </div>
          </li>

          {etiquetas.map((etiqueta) => (
            <li
              key={etiqueta.id_etiqueta}
              className={`etiqueta-item ${
                etiquetaSeleccionada?.id_etiqueta === etiqueta.id_etiqueta ? 'active' : ''
              }`}
              onClick={() => handleEtiquetaClick(etiqueta)}
            >
              <div className="etiqueta-content">
                <span className="etiqueta-icon">🏷️</span>
                <span className="etiqueta-nombre">{etiqueta.nombre}</span>
                <span className="etiqueta-badge">{etiqueta.count}</span>
              </div>
              
              <button
                className="btn-delete-etiqueta"
                onClick={(e) => handleDeleteEtiqueta(e, etiqueta.id_etiqueta)}
                title="Eliminar etiqueta"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}

      {etiquetaSeleccionada && (
        <div className="filtro-activo">
          <small>Filtrando por:</small>
          <div className="filtro-tag">
            {etiquetaSeleccionada.nombre}
            <button onClick={() => setEtiquetaSeleccionada(null)}>✕</button>
          </div>
        </div>
      )}
    </aside>
  );
}

export default Sidebar;