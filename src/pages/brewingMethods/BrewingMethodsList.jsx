import { useState } from 'react';
import { Link } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage.js';
import PageHeader from '../../components/PageHeader.jsx';
import Button from '../../components/Button.jsx';
import ConfirmDialog from '../../components/ConfirmDialog.jsx';
import EmptyState from '../../components/EmptyState.jsx';
import '../../components/shared.css';

function BrewingMethodsList() {
  const { items: methods, remove } = useLocalStorage('qahwati_brewing_methods');
  const [deleteId, setDeleteId] = useState(null);

  const handleDelete = () => {
    remove(deleteId);
    setDeleteId(null);
  };

  return (
    <div>
      <PageHeader
        icon="🫗"
        title="Brewing Methods"
        subtitle={`${methods.length} method${methods.length !== 1 ? 's' : ''} saved`}
        action={
          <Button as={Link} to="/brewing-methods/new" variant="primary">
            + Add Method
          </Button>
        }
      />

      {methods.length === 0 ? (
        <EmptyState
          icon="🫗"
          title="No brewing methods yet"
          message="Add your pour-over, espresso, French press, or any other brewing method."
          action={
            <Button as={Link} to="/brewing-methods/new" variant="primary">
              + Add Your First Method
            </Button>
          }
        />
      ) : (
        <div className="cards-grid">
          {methods.map((method) => (
            <div key={method.id} className="card">
              <div className="card-header">
                <span className="card-title">{method.name}</span>
                <div className="card-actions">
                  <Button as={Link} to={`/brewing-methods/${method.id}/edit`} variant="ghost" size="sm">
                    ✏️ Edit
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => setDeleteId(method.id)}>
                    🗑
                  </Button>
                </div>
              </div>
              <div className="card-body">
                {method.brewType && (
                  <div className="card-meta">
                    <span className="badge">{method.brewType}</span>
                  </div>
                )}
                {method.brewTime && (
                  <div className="detail-row">
                    <span className="detail-label">Brew Time:</span>
                    <span className="detail-value">{method.brewTime} min</span>
                  </div>
                )}
                {method.grindSize && (
                  <div className="detail-row">
                    <span className="detail-label">Grind Size:</span>
                    <span className="detail-value">{method.grindSize}</span>
                  </div>
                )}
                {method.description && <p className="card-notes">{method.description}</p>}
              </div>
              <div className="card-date">Added {new Date(method.createdAt).toLocaleDateString()}</div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        isOpen={!!deleteId}
        title="Delete Brewing Method?"
        message="This will permanently remove this brewing method."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}

export default BrewingMethodsList;
