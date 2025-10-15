import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // null si no está logueado

  // Función para loguear usuario
  const login = (userData) => {
    setUser(userData); 
    // Aquí luego agregarías localStorage/sessionStorage o token
  };

  // Función para registrar usuario
  const register = (userData) => {
    setUser(userData);
    // Igual, guardar token si viene del backend
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook para usar Auth fácilmente
export function useAuth() {
  return useContext(AuthContext);
}
