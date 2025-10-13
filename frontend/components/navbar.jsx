import React from "react";
import { Link, useHistory } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  const history = useHistory();
  const isLoggedIn = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    history.push("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">📝 NotasApp</Link>
        </div>

        {isLoggedIn && (
          <div className="navbar-search">
            <input
              type="text"
              placeholder="Buscar notas..."
              className="navbar-input"
            />
          </div>
        )}

        <ul className="navbar-links">
          {!isLoggedIn ? (
            <>
              <li>
                <Link to="/login">Iniciar sesión</Link>
              </li>
              <li>
                <Link to="/register">Registrarse</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/notas">Mis Notas</Link>
              </li>
              <li>
                <Link to="/etiquetas">Etiquetas</Link>
              </li>
              <li>
                <Link to="/usuarios">Usuarios</Link>
              </li>
              <li>
                <button className="logout-btn" onClick={handleLogout}>
                  Cerrar sesión
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
