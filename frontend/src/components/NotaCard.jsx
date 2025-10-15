import '../styles/NotaCard.css';

function NotaCard({ nota, onEdit, onDelete }) {
  const handleEdit = (e) => {
    e.stopPropagation();
    console.log('Botón editar clickeado para nota:', nota.id_nota);
    onEdit(nota);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    console.log('Botón eliminar clickeado para nota:', nota.id_nota);
    onDelete(nota.id_nota);
  };

  return (
    <div className="nota-card">
      <div className="nota-header">
        <h4 className="nota-titulo">{nota.titulo}</h4>
        <div className="nota-actions">
          <button 
            onClick={handleEdit}
            className="btn-action btn-edit"
            title="Editar nota"
          >
            ✏️
          </button>
          <button 
            onClick={handleDelete}
            className="btn-action btn-delete"
            title="Eliminar nota"
          >
            🗑️
          </button>
        </div>
      </div>
      
      <p className="nota-contenido">{nota.contenido}</p>
      
      {nota.etiquetas && nota.etiquetas.length > 0 && (
        <div className="nota-etiquetas">
          {nota.etiquetas.map((tag) => (
            <span key={tag.id_etiqueta} className="etiqueta">
              {tag.nombre}
            </span>
          ))}
        </div>
      )}
      
      <div className="nota-footer">
        <small className="nota-fecha">
          {nota.fecha_creacion 
            ? new Date(nota.fecha_creacion).toLocaleDateString('es-AR')
            : 'Sin fecha'
          }
        </small>
      </div>
    </div>
  );
}

export default NotaCard;