import { useState, useEffect } from 'react';
import '../styles/Sidebar.css';

function Sidebar() {
  const [etiquetas, setEtiquetas] = useState([]);

  useEffect(() => {
    // Luego traerá las etiquetas desde el backend
    // getEtiquetas().then(setEtiquetas);
  }, []);

  return (
    <aside className="sidebar">
      <h3>Etiquetas</h3>
      <ul>
        {etiquetas.length === 0 ? (
          <li className="no-tags">Sin etiquetas</li>
        ) : (
          etiquetas.map((tag) => (
            <li key={tag.id}>{tag.nombre}</li>
          ))
        )}
      </ul>
    </aside>
  );
}

export default Sidebar;
