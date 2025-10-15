import { useEffect, useState } from "react";
import NotaCard from "../components/NotaCard";
import NotaForm from "../components/NotaForm";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import "../styles/Dashboard.css";

function Dashboard() {
  const [notas, setNotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNota, setSelectedNota] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Obtener el id del usuario del localStorage
  const getUserId = () => {
    // Por ahora usamos un ID fijo, luego lo obtendremos del token
    return 1;
  };

  // Fetch de notas desde el backend
  useEffect(() => {
    const fetchNotas = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/notas');
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
        await axios.delete(`http://localhost:5000/api/notas/${id}`);
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
        // Editar nota existente
        const response = await axios.put(
          `http://localhost:5000/api/notas/${selectedNota.id_nota}`,
          {
            titulo: notaData.titulo,
            contenido: notaData.contenido
          }
        );
        
        // Actualizar en el estado local
        setNotas(notas.map((n) => 
          n.id_nota === selectedNota.id_nota 
            ? { ...n, ...notaData } 
            : n
        ));
        
        console.log('Nota actualizada:', response.data);
      } else {
        // Crear nueva nota
        const response = await axios.post('http://localhost:5000/api/notas', {
          titulo: notaData.titulo,
          contenido: notaData.contenido,
          id_usuario: getUserId()
        });
        
        // Agregar al estado local
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