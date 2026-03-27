import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage.js';
import PageHeader from '../../components/PageHeader.jsx';
import Button from '../../components/Button.jsx';
import '../../components/shared.css';

const EMPTY_FORM = {
  name: '',
  brewType: '',
  brewTime: '',
  waterTemp: '',
  grindSize: '',
  description: '',
};

function buildForm(existing) {
  if (!existing) return EMPTY_FORM;
  return {
    name: existing.name || '',
    brewType: existing.brewType || '',
    brewTime: existing.brewTime || '',
    waterTemp: existing.waterTemp || '',
    grindSize: existing.grindSize || '',
    description: existing.description || '',
  };
}

function BrewingMethodForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { items: methods, add, update } = useLocalStorage('qahwati_brewing_methods');
  const isEdit = Boolean(id);

  const [form, setForm] = useState(() =>
    buildForm(isEdit ? methods.find((m) => m.id === id) : null)
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
    navigate('/brewing-methods');
  };

  return (
    <div>
      <PageHeader
        icon="🫗"
        title={isEdit ? 'Edit Brewing Method' : 'Add Brewing Method'}
        subtitle={isEdit ? 'Update the details of this method.' : 'Log a new brewing method.'}
        action={
          <Button as={Link} to="/brewing-methods" variant="ghost">
            ← Back
          </Button>
        }
      />

      <form className="form-card" onSubmit={handleSubmit}>
        <div className="form-grid form-grid--2">
          <div className="form-group">
            <label className="form-label">
              Method Name <span>*</span>
            </label>
            <input
              className="form-input"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. V60 Pour-Over"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Brew Type</label>
            <select className="form-select" name="brewType" value={form.brewType} onChange={handleChange}>
              <option value="">Select type</option>
              <option value="Pour-Over">Pour-Over</option>
              <option value="Espresso">Espresso</option>
              <option value="French Press">French Press</option>
              <option value="AeroPress">AeroPress</option>
              <option value="Cold Brew">Cold Brew</option>
              <option value="Moka Pot">Moka Pot</option>
              <option value="Siphon">Siphon</option>
              <option value="Drip">Drip</option>
              <option value="Turkish">Turkish</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Brew Time (minutes)</label>
            <input
              className="form-input"
              name="brewTime"
              type="number"
              min="0"
              step="0.5"
              value={form.brewTime}
              onChange={handleChange}
              placeholder="e.g. 3"
            />
          </div>

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

          <div className="form-group form-group--full">
            <label className="form-label">Recommended Grind Size</label>
            <input
              className="form-input"
              name="grindSize"
              value={form.grindSize}
              onChange={handleChange}
              placeholder="e.g. Medium-fine, Coarse, Setting 15 on Comandante"
            />
          </div>

          <div className="form-group form-group--full">
            <label className="form-label">Description / Notes</label>
            <textarea
              className="form-textarea"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe the method, recipe, or any tips…"
            />
          </div>
        </div>

        <div className="form-actions">
          <Button as={Link} to="/brewing-methods" variant="ghost" type="button">
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            {isEdit ? '✔ Save Changes' : '+ Add Method'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default BrewingMethodForm;
