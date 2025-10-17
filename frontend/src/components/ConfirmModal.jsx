import '../styles/ConfirmModal.css';

function ConfirmModal({ 
  title, 
  message, 
  confirmText = "Sí, eliminar",
  cancelText = "Cancelar",
  onConfirm, 
  onCancel 
}) {
  return (
    <div className="confirm-overlay" onClick={onCancel}>
      <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="confirm-buttons">
          <button className="btn-confirm-yes" onClick={onConfirm}>
            {confirmText}
          </button>
          <button className="btn-confirm-no" onClick={onCancel}>
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;