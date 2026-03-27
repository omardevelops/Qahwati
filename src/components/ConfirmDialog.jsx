import './ConfirmDialog.css';
import Button from './Button.jsx';

function ConfirmDialog({ isOpen, title, message, onConfirm, onCancel }) {
  if (!isOpen) return null;
  return (
    <div className="dialog-backdrop" role="dialog" aria-modal="true">
      <div className="dialog-box">
        <h3 className="dialog-title">{title || 'Are you sure?'}</h3>
        {message && <p className="dialog-message">{message}</p>}
        <div className="dialog-actions">
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
