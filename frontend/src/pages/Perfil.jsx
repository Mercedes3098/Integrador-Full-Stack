import { useState, useEffect } from 'react';
import { useAuth } from '../context/Auth';
import api from '../services/api';
import Toast from '../components/Toast';
import '../styles/Perfil.css';

function Perfil() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await api.get(`/usuarios/${user.id_usuario || 1}`);
      setUserData({
        nombre: response.data.nombre,
        email: response.data.email,
        password: '',
        confirmPassword: ''
      });
    } catch (error) {
      console.error('Error al cargar datos del usuario:', error);
      setToast({ message: 'Error al cargar los datos', type: 'error' });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!userData.nombre) {
      newErrors.nombre = 'El nombre es requerido';
    } else if (userData.nombre.length < 3) {
      newErrors.nombre = 'Mínimo 3 caracteres';
    }

    if (!userData.email) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (userData.password) {
      if (userData.password.length < 6) {
        newErrors.password = 'La contraseña debe tener mínimo 6 caracteres';
      }
      if (userData.password !== userData.confirmPassword) {
        newErrors.confirmPassword = 'Las contraseñas no coinciden';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);
      const dataToSend = {
        nombre: userData.nombre,
        email: userData.email
      };

      if (userData.password) {
        dataToSend.password = userData.password;
      }

      await api.put(`/usuarios/${user.id_usuario || 1}`, dataToSend);
      
      setToast({ message: 'Perfil actualizado correctamente', type: 'success' });
      setIsEditing(false);
      setUserData({ ...userData, password: '', confirmPassword: '' });
      
      // Actualizar datos en localStorage si cambió el nombre
      if (userData.nombre !== user.usuario) {
        localStorage.setItem('usuario', userData.nombre);
        window.location.reload();
      }
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      setToast({ 
        message: error.response?.data?.message || 'Error al actualizar el perfil', 
        type: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    fetchUserData();
    setErrors({});
  };

  return (
    <div className="perfil-container">
      <div className="perfil-content">
        <div className="perfil-header">
          <div className="perfil-avatar">
            <span className="avatar-icon">👤</span>
          </div>
          <h2>Mi Perfil</h2>
          {!isEditing && (
            <button 
              className="btn-edit-profile" 
              onClick={() => setIsEditing(true)}
            >
              ✏️ Editar Perfil
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="perfil-form">
          <div className="form-group">
            <label>Nombre completo</label>
            <input
              type="text"
              name="nombre"
              value={userData.nombre}
              onChange={handleChange}
              disabled={!isEditing}
              className={errors.nombre ? 'input-error' : ''}
            />
            {errors.nombre && (
              <span className="error-message">{errors.nombre}</span>
            )}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              disabled={!isEditing}
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          {isEditing && (
            <>
              <div className="form-divider">
                <span>Cambiar contraseña (opcional)</span>
              </div>

              <div className="form-group">
                <label>Nueva contraseña</label>
                <div className="password-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Dejar en blanco para mantener la actual"
                    value={userData.password}
                    onChange={handleChange}
                    className={errors.password ? 'input-error' : ''}
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
                {errors.password && (
                  <span className="error-message">{errors.password}</span>
                )}
              </div>

              <div className="form-group">
                <label>Confirmar nueva contraseña</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Confirmar contraseña"
                  value={userData.confirmPassword}
                  onChange={handleChange}
                  className={errors.confirmPassword ? 'input-error' : ''}
                />
                {errors.confirmPassword && (
                  <span className="error-message">{errors.confirmPassword}</span>
                )}
              </div>
            </>
          )}

          {isEditing && (
            <div className="form-buttons">
              <button 
                type="submit" 
                className="btn-save"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Guardando...
                  </>
                ) : (
                  '💾 Guardar Cambios'
                )}
              </button>
              <button 
                type="button" 
                className="btn-cancel"
                onClick={handleCancel}
                disabled={loading}
              >
                Cancelar
              </button>
            </div>
          )}
        </form>

        {!isEditing && (
          <div className="perfil-info">
            <p className="info-text">
              💡 Haz clic en "Editar Perfil" para modificar tus datos
            </p>
          </div>
        )}
      </div>

      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
    </div>
  );
}

export default Perfil;