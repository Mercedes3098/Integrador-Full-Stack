import { useState, useEffect } from 'react';
import '../styles/NotaForm.css';

function NotaForm({ initialData, onSubmit, onCancel }) {
  const [nota, setNota] = useState({
    titulo: '',
    contenido: '',
    color: '#ffffff',
    etiquetas: [],
  });

  useEffect(() => {
    if (initialData) setNota(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNota({ ...nota, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(nota);
  };

  return (
    <div className="nota-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="titulo"
          placeholder="Título"
          value={nota.titulo}
          onChange={handleChange}
          required
        />
        <textarea
          name="contenido"
          placeholder="Contenido..."
          value={nota.contenido}
          onChange={handleChange}
          required
        />
        <label>
          Color:
          <input
            type="color"
            name="color"
            value={nota.color}
            onChange={handleChange}
          />
        </label>
        <div className="form-buttons">
          <button type="submit">Guardar</button>
          <button type="button" onClick={onCancel}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}

export default NotaForm;
