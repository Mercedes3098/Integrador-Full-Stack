import api from './api';

export const login = async (data) => {
  const res = await api.post('/usuarios/login', data);
  return res.data;
};

export const register = async (data) => {
  const res = await api.post('/usuarios/register', data);
  return res.data;
};

export const getPerfil = async () => {
  const res = await api.get('/usuarios/perfil');
  return res.data;
};
