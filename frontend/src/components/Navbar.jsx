import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/Auth';
import ConfirmModal from './ConfirmModal';
import '../styles/Navbar.css';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogoutClick = () => {
    setShowConfirm(true);
  };

  const confirmLogout = () => {
    logout();
    setShowConfirm(false);
    navigate('/');
  };

  const cancelLogout = () => {
    setShowConfirm(false);
  };

  const handleProfileClick = () => {
    navigate('/perfil');
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-content">
          <Link to="/dashboard" className="navbar-brand">
            📝 App de Notas
          </Link>
          
          {user && (
            <div className="navbar-user">
              <span className="user-name">👤 {user.usuario}</span>
              <button onClick={handleProfileClick} className="btn-profile">
                Mi Perfil
              </button>
              <button onClick={handleLogoutClick} className="btn-logout">
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </nav>

      {showConfirm && (
        <ConfirmModal
          title="🚪 Cerrar Sesión"
          message="¿Estás seguro de que quieres cerrar sesión?"
          confirmText="Sí, cerrar sesión"
          cancelText="Cancelar"
          onConfirm={confirmLogout}
          onCancel={cancelLogout}
        />
      )}
    </>
  );
}

export default Navbar;