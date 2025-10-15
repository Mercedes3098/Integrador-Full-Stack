import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', credentials);
      
      const { token, usuario } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('usuario', usuario);
      
      setUser({ usuario, token });
      
      return { success: true };
    } catch (error) {
      console.error('Error en login:', error);
      throw new Error(error.response?.data?.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', userData);
      
      console.log('Registro exitoso:', response.data);
      
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error en registro:', error);
      throw new Error(error.response?.data?.message || 'Error al registrar');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
}