import { useState } from 'react';
import { Link } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage.js';
import PageHeader from '../../components/PageHeader.jsx';
import Button from '../../components/Button.jsx';
import ConfirmDialog from '../../components/ConfirmDialog.jsx';
import EmptyState from '../../components/EmptyState.jsx';
import '../../components/shared.css';

function Stars({ rating }) {
  const filled = Math.round(Number(rating) || 0);
  return (
    <span className="stars" aria-label={`Rating: ${filled} out of 5`}>
      {'★'.repeat(filled)}{'☆'.repeat(5 - filled)}
    </span>
  );
}

function BrewsList() {
  const { items: brews, remove } = useLocalStorage('qahwati_brews');
  const { items: beans } = useLocalStorage('qahwati_beans');
  const { items: methods } = useLocalStorage('qahwati_brewing_methods');
  const { items: grinders } = useLocalStorage('qahwati_grinders');
  const [deleteId, setDeleteId] = useState(null);

  const handleDelete = () => {
    remove(deleteId);
    setDeleteId(null);
  };

  const beanName = (id) => beans.find((b) => b.id === id)?.name || '—';
  const methodName = (id) => methods.find((m) => m.id === id)?.name || '—';
  const grinderName = (id) => grinders.find((g) => g.id === id)?.name || '—';

  const sortedBrews = [...brews].sort((a, b) => new Date(b.brewDate || b.createdAt) - new Date(a.brewDate || a.createdAt));

  return (
    <div>
      <PageHeader
        icon="📋"
        title="Brews"
        subtitle={`${brews.length} brew${brews.length !== 1 ? 's' : ''} logged`}
        action={
          <Button as={Link} to="/brews/new" variant="primary">
            + Log Brew
          </Button>
        }
      />

      {brews.length === 0 ? (
        <EmptyState
          icon="📋"
          title="No brews logged yet"
          message="Start recording your brew sessions — coffee amount, water, temp, and your rating."
          action={
            <Button as={Link} to="/brews/new" variant="primary">
              + Log Your First Brew
            </Button>
          }
        />
      ) : (
        <div className="cards-grid">
          {sortedBrews.map((brew) => (
            <div key={brew.id} className="card">
              <div className="card-header">
                <span className="card-title">
                  {brew.brewDate ? new Date(brew.brewDate).toLocaleDateString() : 'Brew'}
                </span>
                <div className="card-actions">
                  <Button as={Link} to={`/brews/${brew.id}/edit`} variant="ghost" size="sm">
                    ✏️ Edit
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => setDeleteId(brew.id)}>
                    🗑
                  </Button>
                </div>
              </div>
              <div className="card-body">
                {brew.rating && <Stars rating={brew.rating} />}
                <div className="detail-row">
                  <span className="detail-label">Beans:</span>
                  <span className="detail-value">{beanName(brew.beanId)}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Method:</span>
                  <span className="detail-value">{methodName(brew.methodId)}</span>
                </div>
                {brew.grinderId && (
                  <div className="detail-row">
                    <span className="detail-label">Grinder:</span>
                    <span className="detail-value">{grinderName(brew.grinderId)}</span>
                  </div>
                )}
                <div className="card-meta">
                  {brew.coffeeAmount && (
                    <span className="badge">☕ {brew.coffeeAmount} g</span>
                  )}
                  {brew.waterAmount && (
                    <span className="badge badge--accent">💧 {brew.waterAmount} ml</span>
                  )}
                  {brew.waterTemp && (
                    <span className="badge">🌡 {brew.waterTemp}°C</span>
                  )}
                </div>
                {brew.notes && <p className="card-notes">{brew.notes}</p>}
              </div>
              <div className="card-date">Logged {new Date(brew.createdAt).toLocaleDateString()}</div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        isOpen={!!deleteId}
        title="Delete Brew?"
        message="This will permanently remove this brew log."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}

export default BrewsList;
