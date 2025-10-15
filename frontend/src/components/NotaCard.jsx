import '../styles/NotaCard.css';

function NotaCard({ nota, onEdit, onDelete }) {
  return (
    <div className="nota-card" style={{ backgroundColor: nota.color || '#fff' }}>
      <h4>{nota.titulo}</h4>
      <p>{nota.contenido}</p>
      {nota.etiquetas && (
        <div className="nota-etiquetas">
          {nota.etiquetas.map((tag) => (
            <span key={tag.id} className="etiqueta">{tag.nombre}</span>
          ))}
        </div>
      )}
      <div className="nota-actions">
        <button onClick={() => onEdit(nota)}>✏️</button>
        <button onClick={() => onDelete(nota.id)}>🗑️</button>
      </div>
    </div>
  );
}

export default NotaCard;
