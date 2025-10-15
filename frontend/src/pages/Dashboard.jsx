import { useEffect, useState } from "react";
import NotaCard from "../components/NotaCard";
import NotaForm from "../components/NotaForm";
import Sidebar from "../components/Sidebar";
import "../styles/Dashboard.css";

function Dashboard() {
  const [notas, setNotas] = useState([]); // listado de notas
  const [loading, setLoading] = useState(true);
  const [selectedNota, setSelectedNota] = useState(null); // para editar
  const [showForm, setShowForm] = useState(false);

  // 🔹 Simulamos fetch inicial (luego lo reemplazamos con notasService)
  useEffect(() => {
    setLoading(true);
    // Aquí luego irá el fetch real con Axios
    setTimeout(() => {
      setNotas([]); // vacío por ahora
      setLoading(false);
    }, 500);
  }, []);

  const handleCreate = () => {
    setSelectedNota(null);
    setShowForm(true);
  };

  const handleEdit = (nota) => {
    setSelectedNota(nota);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm("¿Eliminar esta nota?")) {
      setNotas(notas.filter((n) => n.id !== id));
      // Luego reemplazamos con notasService.deleteNota(id)
    }
  };

  const handleSave = (nuevaNota) => {
    if (selectedNota) {
      // editar
      setNotas(notas.map((n) => (n.id === nuevaNota.id ? nuevaNota : n)));
    } else {
      // crear
      setNotas([...notas, { ...nuevaNota, id: Date.now() }]);
    }
    setShowForm(false);
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
                key={nota.id}
                nota={nota}
                onEdit={() => handleEdit(nota)}
                onDelete={() => handleDelete(nota.id)}
              />
            ))}
          </div>
        )}
      </div>

      {showForm && (
        <NotaForm
          nota={selectedNota}
          onSave={handleSave}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
}

export default Dashboard;
