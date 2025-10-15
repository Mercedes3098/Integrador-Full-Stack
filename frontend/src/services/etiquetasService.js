import api from './api';

export const getEtiquetas = async () => {
  const res = await api.get('/etiquetas');
  return res.data;
};

export const createEtiqueta = async (data) => {
  const res = await api.post('/etiquetas', data);
  return res.data;
};

export const updateEtiqueta = async (id, data) => {
  const res = await api.put(`/etiquetas/${id}`, data);
  return res.data;
};

export const deleteEtiqueta = async (id) => {
  const res = await api.delete(`/etiquetas/${id}`);
  return res.data;
};
