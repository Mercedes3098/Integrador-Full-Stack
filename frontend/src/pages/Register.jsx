import { useState } from 'react';
import { useAuth } from '../context/Auth';
import '../styles/Auth.css';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { register } = useAuth();

  const validateForm = () => {
    const newErrors = {};
    
    if (!username) {
      newErrors.username = 'El nombre de usuario es requerido';
    } else if (username.length < 3) {
      newErrors.username = 'Mínimo 3 caracteres';
    }
    
    if (!email) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (password.length < 6) {
      newErrors.password = 'Mínimo 6 caracteres';
    }
    
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirma tu contraseña';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getPasswordStrength = () => {
    if (!password) return null;
    const len = password.length;
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*]/.test(password);
    
    if (len < 6) return { text: 'Débil', className: 'weak' };
    if (len >= 10 && hasUpper && hasNumber && hasSpecial) {
      return { text: 'Muy fuerte', className: 'very-strong' };
    }
    if (len >= 8 && (hasUpper || hasNumber)) {
      return { text: 'Fuerte', className: 'strong' };
    }
    return { text: 'Media', className: 'medium' };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      await register({ username, email, password });
      console.log('Registro exitoso:', { username, email });
    } catch (error) {
      setErrors({ submit: 'Error al crear la cuenta. Intenta nuevamente.' });
      console.error('Error de registro:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const strength = getPasswordStrength();

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Registrarse</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input 
              type="text" 
              placeholder="Nombre de usuario" 
              value={username} 
              onChange={(e) => {
                setUsername(e.target.value);
                setErrors(prev => ({ ...prev, username: '', submit: '' }));
              }}
              className={errors.username ? 'input-error' : ''}
              disabled={isLoading}
            />
            {errors.username && (
              <span className="error-message">{errors.username}</span>
            )}
          </div>

          <div className="input-group">
            <input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors(prev => ({ ...prev, email: '', submit: '' }));
              }}
              className={errors.email ? 'input-error' : ''}
              disabled={isLoading}
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          <div className="input-group">
            <div className="password-wrapper">
              <input 
                type={showPassword ? 'text' : 'password'}
                placeholder="Contraseña" 
                value={password} 
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors(prev => ({ ...prev, password: '', submit: '' }));
                }}
                className={errors.password ? 'input-error' : ''}
                disabled={isLoading}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                aria-label="Mostrar contraseña"
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {strength && (
              <span className={`password-strength ${strength.className}`}>
                Fortaleza: {strength.text}
              </span>
            )}
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>

          <div className="input-group">
            <div className="password-wrapper">
              <input 
                type={showPassword ? 'text' : 'password'}
                placeholder="Confirmar contraseña" 
                value={confirmPassword} 
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setErrors(prev => ({ ...prev, confirmPassword: '', submit: '' }));
                }}
                className={errors.confirmPassword ? 'input-error' : ''}
                disabled={isLoading}
              />
            </div>
            {errors.confirmPassword && (
              <span className="error-message">{errors.confirmPassword}</span>
            )}
          </div>

          {errors.submit && (
            <div className="error-box">
              {errors.submit}
            </div>
          )}

          <button 
            type="submit" 
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Creando cuenta...
              </>
            ) : (
              'Crear cuenta'
            )}
          </button>
        </form>

        <div className="auth-footer">
          <span className="link-text">
            ¿Ya tienes cuenta? <a href="/login" className="link">Inicia sesión</a>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Register;