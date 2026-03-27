import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage.js';
import PageHeader from '../../components/PageHeader.jsx';
import Button from '../../components/Button.jsx';
import '../../components/shared.css';

const getTodayString = () => new Date().toISOString().split('T')[0];

const EMPTY_FORM = {
  brewDate: getTodayString(),
  beanId: '',
  methodId: '',
  grinderId: '',
  coffeeAmount: '',
  waterAmount: '',
  waterTemp: '',
  brewTime: '',
  grindSetting: '',
  rating: '',
  notes: '',
};

function buildForm(existing) {
  if (!existing) return EMPTY_FORM;
  return {
    brewDate: existing.brewDate || getTodayString(),
    beanId: existing.beanId || '',
    methodId: existing.methodId || '',
    grinderId: existing.grinderId || '',
    coffeeAmount: existing.coffeeAmount || '',
    waterAmount: existing.waterAmount || '',
    waterTemp: existing.waterTemp || '',
    brewTime: existing.brewTime || '',
    grindSetting: existing.grindSetting || '',
    rating: existing.rating || '',
    notes: existing.notes || '',
  };
}

function BrewForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { items: brews, add, update } = useLocalStorage('qahwati_brews');
  const { items: beans } = useLocalStorage('qahwati_beans');
  const { items: methods } = useLocalStorage('qahwati_brewing_methods');
  const { items: grinders } = useLocalStorage('qahwati_grinders');
  const isEdit = Boolean(id);

  const [form, setForm] = useState(() =>
    buildForm(isEdit ? brews.find((b) => b.id === id) : null)
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { ...form };
    if (isEdit) {
      update(id, data);
    } else {
      add(data);
    }
    navigate('/brews');
  };

  return (
    <div>
      <PageHeader
        icon="📋"
        title={isEdit ? 'Edit Brew' : 'Log a Brew'}
        subtitle={isEdit ? 'Update this brew session.' : 'Record a new brew session.'}
        action={
          <Button as={Link} to="/brews" variant="ghost">
            ← Back
          </Button>
        }
      />

      <form className="form-card" onSubmit={handleSubmit}>
        <div className="form-grid form-grid--2">

          {/* Date */}
          <div className="form-group">
            <label className="form-label">
              Brew Date <span>*</span>
            </label>
            <input
              className="form-input"
              name="brewDate"
              type="date"
              value={form.brewDate}
              onChange={handleChange}
              required
            />
          </div>

          {/* Rating */}
          <div className="form-group">
            <label className="form-label">Rating</label>
            <select className="form-select" name="rating" value={form.rating} onChange={handleChange}>
              <option value="">Select rating</option>
              <option value="5">★★★★★ — Excellent</option>
              <option value="4">★★★★☆ — Great</option>
              <option value="3">★★★☆☆ — Good</option>
              <option value="2">★★☆☆☆ — Okay</option>
              <option value="1">★☆☆☆☆ — Poor</option>
            </select>
          </div>

          {/* Bean */}
          <div className="form-group">
            <label className="form-label">Coffee Beans</label>
            <select className="form-select" name="beanId" value={form.beanId} onChange={handleChange}>
              <option value="">Select beans</option>
              {beans.map((b) => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>
            {beans.length === 0 && (
              <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                <Link to="/beans/new" style={{ color: 'var(--color-primary)' }}>+ Add beans first</Link>
              </span>
            )}
          </div>

          {/* Method */}
          <div className="form-group">
            <label className="form-label">Brewing Method</label>
            <select className="form-select" name="methodId" value={form.methodId} onChange={handleChange}>
              <option value="">Select method</option>
              {methods.map((m) => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>
            {methods.length === 0 && (
              <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                <Link to="/brewing-methods/new" style={{ color: 'var(--color-primary)' }}>+ Add method first</Link>
              </span>
            )}
          </div>

          {/* Grinder */}
          <div className="form-group">
            <label className="form-label">Grinder</label>
            <select className="form-select" name="grinderId" value={form.grinderId} onChange={handleChange}>
              <option value="">Select grinder</option>
              {grinders.map((g) => (
                <option key={g.id} value={g.id}>{g.name}</option>
              ))}
            </select>
          </div>

          {/* Grind Setting */}
          <div className="form-group">
            <label className="form-label">Grind Setting</label>
            <input
              className="form-input"
              name="grindSetting"
              value={form.grindSetting}
              onChange={handleChange}
              placeholder="e.g. 20 clicks, setting 5"
            />
          </div>

          {/* Coffee Amount */}
          <div className="form-group">
            <label className="form-label">Coffee Amount (g)</label>
            <input
              className="form-input"
              name="coffeeAmount"
              type="number"
              min="0"
              step="0.1"
              value={form.coffeeAmount}
              onChange={handleChange}
              placeholder="e.g. 18"
            />
          </div>

          {/* Water Amount */}
          <div className="form-group">
            <label className="form-label">Water Amount (ml)</label>
            <input
              className="form-input"
              name="waterAmount"
              type="number"
              min="0"
              step="1"
              value={form.waterAmount}
              onChange={handleChange}
              placeholder="e.g. 300"
            />
          </div>

          {/* Water Temp */}
          <div className="form-group">
            <label className="form-label">Water Temperature (°C)</label>
            <input
              className="form-input"
              name="waterTemp"
              type="number"
              min="0"
              max="100"
              value={form.waterTemp}
              onChange={handleChange}
              placeholder="e.g. 93"
            />
          </div>

          {/* Brew Time */}
          <div className="form-group">
            <label className="form-label">Brew Time (minutes)</label>
            <input
              className="form-input"
              name="brewTime"
              type="number"
              min="0"
              step="0.25"
              value={form.brewTime}
              onChange={handleChange}
              placeholder="e.g. 3.5"
            />
          </div>

          {/* Notes */}
          <div className="form-group form-group--full">
            <label className="form-label">Tasting Notes</label>
            <textarea
              className="form-textarea"
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="How did it taste? Any observations or things to adjust next time…"
            />
          </div>
        </div>

        <div className="form-actions">
          <Button as={Link} to="/brews" variant="ghost" type="button">
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            {isEdit ? '✔ Save Changes' : '+ Log Brew'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default BrewForm;
