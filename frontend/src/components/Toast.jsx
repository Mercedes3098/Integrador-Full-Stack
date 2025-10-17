// frontend/src/components/Toast.jsx
import { useEffect } from 'react';
import '../styles/Toast.css';

function Toast({ message, type = 'success', onClose, duration = 2000 }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`toast toast-${type}`}>
      <span className="toast-icon">
        {type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}
      </span>
      <span className="toast-message">{message}</span>
    </div>
  );
}

export default Toast;