import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage.js';
import PageHeader from '../../components/PageHeader.jsx';
import Button from '../../components/Button.jsx';
import '../../components/shared.css';

const EMPTY_FORM = {
  name: '',
  roaster: '',
  origin: '',
  variety: '',
  roastLevel: '',
  process: '',
  altitude: '',
  notes: '',
};

function buildForm(existing) {
  if (!existing) return EMPTY_FORM;
  return {
    name: existing.name || '',
    roaster: existing.roaster || '',
    origin: existing.origin || '',
    variety: existing.variety || '',
    roastLevel: existing.roastLevel || '',
    process: existing.process || '',
    altitude: existing.altitude || '',
    notes: existing.notes || '',
  };
}

function CoffeeBeanForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { items: beans, add, update } = useLocalStorage('qahwati_beans');
  const isEdit = Boolean(id);

  const [form, setForm] = useState(() =>
    buildForm(isEdit ? beans.find((b) => b.id === id) : null)
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(
      Object.entries(form).map(([k, v]) => [k, typeof v === 'string' ? v.trim() : v])
    );
    if (isEdit) {
      update(id, data);
    } else {
      add(data);
    }
    navigate('/beans');
  };

  return (
    <div>
      <PageHeader
        icon="☕"
        title={isEdit ? 'Edit Coffee Bean' : 'Add Coffee Bean'}
        subtitle={isEdit ? 'Update the details of this bean.' : 'Add a new bean to your collection.'}
        action={
          <Button as={Link} to="/beans" variant="ghost">
            ← Back
          </Button>
        }
      />

      <form className="form-card" onSubmit={handleSubmit}>
        <div className="form-grid form-grid--2">
          <div className="form-group">
            <label className="form-label">
              Name <span>*</span>
            </label>
            <input
              className="form-input"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Ethiopia Yirgacheffe"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Roaster</label>
            <input
              className="form-input"
              name="roaster"
              value={form.roaster}
              onChange={handleChange}
              placeholder="e.g. Square Mile Coffee"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Origin / Farm</label>
            <input
              className="form-input"
              name="origin"
              value={form.origin}
              onChange={handleChange}
              placeholder="e.g. Ethiopia, Yirgacheffe"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Variety</label>
            <input
              className="form-input"
              name="variety"
              value={form.variety}
              onChange={handleChange}
              placeholder="e.g. Heirloom, Bourbon"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Roast Level</label>
            <select className="form-select" name="roastLevel" value={form.roastLevel} onChange={handleChange}>
              <option value="">Select roast level</option>
              <option value="light">Light</option>
              <option value="medium-light">Medium-Light</option>
              <option value="medium">Medium</option>
              <option value="medium-dark">Medium-Dark</option>
              <option value="dark">Dark</option>
              <option value="espresso">Espresso</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Process</label>
            <select className="form-select" name="process" value={form.process} onChange={handleChange}>
              <option value="">Select process</option>
              <option value="washed">Washed</option>
              <option value="natural">Natural</option>
              <option value="honey">Honey</option>
              <option value="anaerobic">Anaerobic</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Altitude (masl)</label>
            <input
              className="form-input"
              name="altitude"
              value={form.altitude}
              onChange={handleChange}
              placeholder="e.g. 1800-2200"
            />
          </div>

          <div className="form-group form-group--full">
            <label className="form-label">Tasting Notes</label>
            <textarea
              className="form-textarea"
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Describe the flavours, aroma, and your impressions…"
            />
          </div>
        </div>

        <div className="form-actions">
          <Button as={Link} to="/beans" variant="ghost" type="button">
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            {isEdit ? '✔ Save Changes' : '+ Add Bean'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CoffeeBeanForm;
