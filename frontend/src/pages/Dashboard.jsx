import { useEffect, useState } from "react";
import NotaCard from "../components/NotaCard";
import NotaForm from "../components/NotaForm";
import Sidebar from "../components/Sidebar";
import Toast from "../components/Toast";
import ConfirmModal from "../components/ConfirmModal";
import api from "../services/api";
import "../styles/Dashboard.css";

function Dashboard() {
  const [notas, setNotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNota, setSelectedNota] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [etiquetaFiltro, setEtiquetaFiltro] = useState(null);
  const [toast, setToast] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    fetchNotas();
  }, []);

  const fetchNotas = async () => {
    try {
      setLoading(true);
      const response = await api.get('/notas'); 
      console.log('✅ Notas cargadas:', response.data);
      setNotas(response.data);
    } catch (error) {
      console.error('❌ Error al cargar notas:', error);
      if (error.response?.status === 403) {
        alert('Sesión expirada. Por favor, inicia sesión nuevamente.');
        window.location.href = '/login';
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    console.log('➕ Creando nueva nota');
    setSelectedNota(null);
    setShowForm(true);
  };

  const handleEdit = (nota) => {
    console.log('✏️ Editando nota:', nota);
    setSelectedNota(nota);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    console.log('🗑️ Intentando eliminar nota ID:', id);
    setConfirmDelete(id);
  };

  const confirmDeleteNota = async () => {
    const id = confirmDelete;
    setConfirmDelete(null);
    
    try {
      await api.delete(`/notas/${id}`);
      setNotas(notas.filter((n) => n.id_nota !== id));
      console.log('✅ Nota eliminada');
      setToast({ message: 'Nota eliminada correctamente', type: 'success' });
    } catch (error) {
      console.error('❌ Error al eliminar:', error);
      setToast({ message: 'Error al eliminar la nota', type: 'error' });
    }
  };

  const cancelDelete = () => {
    setConfirmDelete(null);
  };

  const handleSubmit = async (notaData) => {
    console.log('💾 Guardando nota:', notaData);
    
    try {
      if (selectedNota) {
        await api.put(`/notas/${selectedNota.id_nota}`, {
          titulo: notaData.titulo,
          contenido: notaData.contenido
        });

        await actualizarEtiquetasNota(selectedNota.id_nota, notaData.etiquetas);
        
        console.log('✅ Nota actualizada');
        setToast({ message: 'Nota actualizada correctamente', type: 'success' });
      } else {
        const response = await api.post('/notas', {
          titulo: notaData.titulo,
          contenido: notaData.contenido
        });

        if (notaData.etiquetas && notaData.etiquetas.length > 0) {
          await asignarEtiquetasNota(response.data.id_nota, notaData.etiquetas);
        }
        
        console.log('✅ Nota creada:', response.data);
        setToast({ message: 'Nota creada correctamente', type: 'success' });
      }

      setShowForm(false);
      setSelectedNota(null);
      await fetchNotas();
      
    } catch (error) {
      console.error('❌ Error al guardar:', error);
      setToast({ message: error.response?.data?.message || 'Error al guardar la nota', type: 'error' });
    }
  };

  const actualizarEtiquetasNota = async (id_nota, nuevasEtiquetas) => {
    try {
      const notaActual = notas.find(n => n.id_nota === id_nota);
      const etiquetasActuales = notaActual?.etiquetas || [];

      for (const etiqueta of etiquetasActuales) {
        if (!nuevasEtiquetas.find(e => e.id_etiqueta === etiqueta.id_etiqueta)) {
          await api.post('/etiquetas/remover', {
            id_nota,
            id_etiqueta: etiqueta.id_etiqueta
          });
        }
      }

      for (const etiqueta of nuevasEtiquetas) {
        if (!etiquetasActuales.find(e => e.id_etiqueta === etiqueta.id_etiqueta)) {
          await api.post('/etiquetas/asignar', {
            id_nota,
            id_etiqueta: etiqueta.id_etiqueta
          });
        }
      }
    } catch (error) {
      console.error('Error al actualizar etiquetas:', error);
    }
  };

  const asignarEtiquetasNota = async (id_nota, etiquetas) => {
    try {
      for (const etiqueta of etiquetas) {
        await api.post('/etiquetas/asignar', {
          id_nota,
          id_etiqueta: etiqueta.id_etiqueta
        });
      }
    } catch (error) {
      console.error('Error al asignar etiquetas:', error);
    }
  };

  const handleCancelForm = () => {
    console.log('❌ Cancelando formulario');
    setShowForm(false);
    setSelectedNota(null);
  };

  const handleFiltroEtiqueta = (etiqueta) => {
    setEtiquetaFiltro(etiqueta);
  };

  const notasFiltradas = etiquetaFiltro 
    ? notas.filter(nota => 
        nota.etiquetas?.some(e => e.id_etiqueta === etiquetaFiltro.id_etiqueta)
      )
    : notas;

  if (loading) {
    return (
      <div className="dashboard-container">
        <Sidebar notas={[]} onRefresh={fetchNotas} onFiltroChange={handleFiltroEtiqueta} />
        <div className="dashboard-content">
          <p className="dashboard-loading">⏳ Cargando notas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <Sidebar 
        notas={notas} 
        onRefresh={fetchNotas}
        onFiltroChange={handleFiltroEtiqueta}
        etiquetaActiva={etiquetaFiltro}
      />

      <div className="dashboard-content">
        <div className="dashboard-header">
          <h2>📝 Mis Notas</h2>
          <button className="btn-add" onClick={handleCreate}>
            + Nueva Nota
          </button>
        </div>

        {notasFiltradas.length === 0 ? (
          <div className="no-notas">
            <p>
              {etiquetaFiltro 
                ? `No hay notas con la etiqueta "${etiquetaFiltro.nombre}"`
                : 'No tienes notas aún. ¡Crea tu primera nota!'
              }
            </p>
          </div>
        ) : (
          <div className="notas-grid">
            {notasFiltradas.map((nota) => (
              <NotaCard
                key={nota.id_nota}
                nota={nota}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      {showForm && (
        <div className="modal-overlay" onClick={handleCancelForm}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <NotaForm
              initialData={selectedNota}
              onSubmit={handleSubmit}
              onCancel={handleCancelForm}
            />
          </div>
        </div>
      )}

      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}

      {confirmDelete && (
        <ConfirmModal
          title="🗑️ Eliminar Nota"
          message="¿Estás seguro de que quieres eliminar esta nota? Esta acción no se puede deshacer."
          onConfirm={confirmDeleteNota}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
}

export default Dashboard;