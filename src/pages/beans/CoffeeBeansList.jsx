import { useState } from 'react';
import { Link } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage.js';
import PageHeader from '../../components/PageHeader.jsx';
import Button from '../../components/Button.jsx';
import ConfirmDialog from '../../components/ConfirmDialog.jsx';
import EmptyState from '../../components/EmptyState.jsx';
import '../../components/shared.css';

const ROAST_LABELS = {
  light: '🌤 Light',
  'medium-light': '⛅ Medium-Light',
  medium: '🌥 Medium',
  'medium-dark': '🌦 Medium-Dark',
  dark: '☁️ Dark',
  espresso: '⚫ Espresso',
};

const PROCESS_LABELS = {
  washed: 'Washed',
  natural: 'Natural',
  honey: 'Honey',
  anaerobic: 'Anaerobic',
  other: 'Other',
};

function CoffeeBeansList() {
  const { items: beans, remove } = useLocalStorage('qahwati_beans');
  const [deleteId, setDeleteId] = useState(null);

  const handleDelete = () => {
    remove(deleteId);
    setDeleteId(null);
  };

  return (
    <div>
      <PageHeader
        icon="☕"
        title="Coffee Beans"
        subtitle={`${beans.length} bean${beans.length !== 1 ? 's' : ''} in your collection`}
        action={
          <Button as={Link} to="/beans/new" variant="primary">
            + Add Bean
          </Button>
        }
      />

      {beans.length === 0 ? (
        <EmptyState
          icon="☕"
          title="No beans yet"
          message="Start logging your coffee beans — track their origin, roast and more."
          action={
            <Button as={Link} to="/beans/new" variant="primary">
              + Add Your First Bean
            </Button>
          }
        />
      ) : (
        <div className="cards-grid">
          {beans.map((bean) => (
            <div key={bean.id} className="card">
              <div className="card-header">
                <span className="card-title">{bean.name}</span>
                <div className="card-actions">
                  <Button as={Link} to={`/beans/${bean.id}/edit`} variant="ghost" size="sm">
                    ✏️ Edit
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => setDeleteId(bean.id)}>
                    🗑
                  </Button>
                </div>
              </div>
              <div className="card-body">
                {bean.roaster && (
                  <div className="detail-row">
                    <span className="detail-label">Roaster:</span>
                    <span className="detail-value">{bean.roaster}</span>
                  </div>
                )}
                {bean.origin && (
                  <div className="detail-row">
                    <span className="detail-label">Origin:</span>
                    <span className="detail-value">{bean.origin}</span>
                  </div>
                )}
                <div className="card-meta">
                  {bean.roastLevel && (
                    <span className="badge">{ROAST_LABELS[bean.roastLevel] || bean.roastLevel}</span>
                  )}
                  {bean.process && (
                    <span className="badge badge--accent">{PROCESS_LABELS[bean.process] || bean.process}</span>
                  )}
                </div>
                {bean.notes && <p className="card-notes">{bean.notes}</p>}
              </div>
              <div className="card-date">Added {new Date(bean.createdAt).toLocaleDateString()}</div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        isOpen={!!deleteId}
        title="Delete Coffee Bean?"
        message="This will permanently remove this bean from your collection."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}

export default CoffeeBeansList;
