import { useEffect, useState } from "react";
import NotaCard from "../components/NotaCard";
import NotaForm from "../components/NotaForm";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
import "../styles/Dashboard.css";

function Dashboard() {
  const [notas, setNotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNota, setSelectedNota] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const getUserId = () => {
    return 1;
  };

  useEffect(() => {
    const fetchNotas = async () => {
      try {
        setLoading(true);
        const response = await api.get('/notas'); 
        setNotas(response.data);
      } catch (error) {
        console.error('Error al cargar notas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotas();
  }, []);

  const handleCreate = () => {
    setSelectedNota(null);
    setShowForm(true);
  };

  const handleEdit = (nota) => {
    setSelectedNota(nota);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm("¿Eliminar esta nota?")) {
      try {
        await api.delete(`/notas/${id}`);

        setNotas(notas.filter((n) => n.id_nota !== id));
        console.log('Nota eliminada exitosamente');
      } catch (error) {
        console.error('Error al eliminar nota:', error);
        alert('Error al eliminar la nota');
      }
    }
  };

  const handleSubmit = async (notaData) => {
    try {
      if (selectedNota) {
        const response = await api.put(`/notas/${selectedNota.id_nota}`, {
          titulo: notaData.titulo,
          contenido: notaData.contenido
        });

        setNotas(notas.map((n) => 
          n.id_nota === selectedNota.id_nota 
            ? { ...n, ...notaData } 
            : n
        ));

        console.log('Nota actualizada:', response.data);
      } else {
        const response = await api.post('/notas', {
          titulo: notaData.titulo,
          contenido: notaData.contenido,
          id_usuario: getUserId()
        });

        setNotas([...notas, response.data]);

        console.log('Nota creada:', response.data);
      }

      setShowForm(false);
    } catch (error) {
      console.error('Error al guardar nota:', error);
      alert('Error al guardar la nota: ' + (error.response?.data?.message || error.message));
    }
  };

  if (loading) return <p className="dashboard-loading">Cargando notas...</p>;

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="dashboard-content">
        <div className="dashboard-header">
          <h2>Mis Notas</h2>
          <button className="btn-add" onClick={handleCreate}>
            + Nueva Nota
          </button>
        </div>

        {notas.length === 0 ? (
          <p className="no-notas">No tienes notas aún. ¡Crea una!</p>
        ) : (
          <div className="notas-grid">
            {notas.map((nota) => (
              <NotaCard
                key={nota.id_nota}
                nota={nota}
                onEdit={() => handleEdit(nota)}
                onDelete={() => handleDelete(nota.id_nota)}
              />
            ))}
          </div>
        )}
      </div>

      {showForm && (
        <NotaForm
          initialData={selectedNota}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
}

export default Dashboard;
