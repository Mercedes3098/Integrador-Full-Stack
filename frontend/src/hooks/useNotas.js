import { useState, useEffect } from 'react';
import * as notasService from '../services/notasService';

export function useNotas() {
  const [notas, setNotas] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotas = async () => {
    try {
      setLoading(true);
      const data = await notasService.getNotas();
      setNotas(data);
    } catch (err) {
      console.error('Error al obtener notas:', err);
    } finally {
      setLoading(false);
    }
  };

  const addNota = async (nuevaNota) => {
    const data = await notasService.createNota(nuevaNota);
    setNotas([...notas, data]);
  };

  const updateNota = async (id, actualizada) => {
    const data = await notasService.updateNota(id, actualizada);
    setNotas(notas.map(n => n.id === id ? data : n));
  };

  const deleteNota = async (id) => {
    await notasService.deleteNota(id);
    setNotas(notas.filter(n => n.id !== id));
  };

  useEffect(() => {
    fetchNotas();
  }, []);

  return { notas, loading, addNota, updateNota, deleteNota };
}
