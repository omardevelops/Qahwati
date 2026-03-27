import { useState } from 'react';
import { Link } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage.js';
import PageHeader from '../../components/PageHeader.jsx';
import Button from '../../components/Button.jsx';
import ConfirmDialog from '../../components/ConfirmDialog.jsx';
import EmptyState from '../../components/EmptyState.jsx';
import '../../components/shared.css';

const TYPE_LABELS = {
  burr: '🔘 Burr',
  blade: '🔪 Blade',
};

function GrindersList() {
  const { items: grinders, remove } = useLocalStorage('qahwati_grinders');
  const [deleteId, setDeleteId] = useState(null);

  const handleDelete = () => {
    remove(deleteId);
    setDeleteId(null);
  };

  return (
    <div>
      <PageHeader
        icon="⚙️"
        title="Grinders"
        subtitle={`${grinders.length} grinder${grinders.length !== 1 ? 's' : ''} saved`}
        action={
          <Button as={Link} to="/grinders/new" variant="primary">
            + Add Grinder
          </Button>
        }
      />

      {grinders.length === 0 ? (
        <EmptyState
          icon="⚙️"
          title="No grinders yet"
          message="Log your grinders, burr sizes, and settings."
          action={
            <Button as={Link} to="/grinders/new" variant="primary">
              + Add Your First Grinder
            </Button>
          }
        />
      ) : (
        <div className="cards-grid">
          {grinders.map((grinder) => (
            <div key={grinder.id} className="card">
              <div className="card-header">
                <span className="card-title">{grinder.name}</span>
                <div className="card-actions">
                  <Button as={Link} to={`/grinders/${grinder.id}/edit`} variant="ghost" size="sm">
                    ✏️ Edit
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => setDeleteId(grinder.id)}>
                    🗑
                  </Button>
                </div>
              </div>
              <div className="card-body">
                {grinder.brand && (
                  <div className="detail-row">
                    <span className="detail-label">Brand:</span>
                    <span className="detail-value">{grinder.brand}</span>
                  </div>
                )}
                <div className="card-meta">
                  {grinder.type && (
                    <span className="badge">{TYPE_LABELS[grinder.type] || grinder.type}</span>
                  )}
                  {grinder.burrMaterial && (
                    <span className="badge badge--accent">{grinder.burrMaterial} burrs</span>
                  )}
                </div>
                {grinder.burrSize && (
                  <div className="detail-row">
                    <span className="detail-label">Burr Size:</span>
                    <span className="detail-value">{grinder.burrSize} mm</span>
                  </div>
                )}
                {grinder.notes && <p className="card-notes">{grinder.notes}</p>}
              </div>
              <div className="card-date">Added {new Date(grinder.createdAt).toLocaleDateString()}</div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        isOpen={!!deleteId}
        title="Delete Grinder?"
        message="This will permanently remove this grinder from your list."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}

export default GrindersList;
