import api from './api';

export const getNotas = async () => {
  const res = await api.get('/notas');
  return res.data;
};

export const createNota = async (data) => {
  const res = await api.post('/notas', data);
  return res.data;
};

export const updateNota = async (id, data) => {
  const res = await api.put(`/notas/${id}`, data);
  return res.data;
};

export const deleteNota = async (id) => {
  const res = await api.delete(`/notas/${id}`);
  return res.data;
};
