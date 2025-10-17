import { useState, useEffect } from 'react';
import api from '../services/api';
import ConfirmModal from './ConfirmModal';
import '../styles/Sidebar.css';

function Sidebar({ notas, onRefresh, onFiltroChange, etiquetaActiva }) {
  const [etiquetas, setEtiquetas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    fetchEtiquetas();
  }, [notas]);

  const fetchEtiquetas = async () => {
    try {
      setLoading(true);
      const response = await api.get('/etiquetas');
      
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
    if (etiquetaActiva?.id_etiqueta === etiqueta.id_etiqueta) {
      onFiltroChange(null);
    } else {
      onFiltroChange(etiqueta);
    }
  };

  const handleDeleteEtiqueta = async (e, id_etiqueta) => {
    e.stopPropagation();
    setConfirmDelete(id_etiqueta);
  };

  const confirmDeleteEtiqueta = async () => {
    const id_etiqueta = confirmDelete;
    setConfirmDelete(null);

    try {
      await api.delete(`/etiquetas/${id_etiqueta}`);
      setEtiquetas(etiquetas.filter(e => e.id_etiqueta !== id_etiqueta));
      
      if (etiquetaActiva?.id_etiqueta === id_etiqueta) {
        onFiltroChange(null);
      }
      
      if (onRefresh) onRefresh();
    } catch (error) {
      console.error('Error al eliminar etiqueta:', error);
    }
  };

  const cancelDelete = () => {
    setConfirmDelete(null);
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
            className={`etiqueta-item ${!etiquetaActiva ? 'active' : ''}`}
            onClick={() => onFiltroChange(null)}
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
                etiquetaActiva?.id_etiqueta === etiqueta.id_etiqueta ? 'active' : ''
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

      {etiquetaActiva && (
        <div className="filtro-activo">
          <small>Filtrando por:</small>
          <div className="filtro-tag">
            {etiquetaActiva.nombre}
            <button onClick={() => onFiltroChange(null)}>✕</button>
          </div>
        </div>
      )}

      {confirmDelete && (
        <ConfirmModal
          title="🗑️ Eliminar Etiqueta"
          message="¿Estás seguro de que quieres eliminar esta etiqueta? Se quitará de todas las notas."
          onConfirm={confirmDeleteEtiqueta}
          onCancel={cancelDelete}
        />
      )}
    </aside>
  );
}

export default Sidebar;