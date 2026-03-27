import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage.js';
import PageHeader from '../../components/PageHeader.jsx';
import Button from '../../components/Button.jsx';
import '../../components/shared.css';

const EMPTY_FORM = {
  name: '',
  brand: '',
  type: '',
  burrSize: '',
  burrMaterial: '',
  notes: '',
};

function buildForm(existing) {
  if (!existing) return EMPTY_FORM;
  return {
    name: existing.name || '',
    brand: existing.brand || '',
    type: existing.type || '',
    burrSize: existing.burrSize || '',
    burrMaterial: existing.burrMaterial || '',
    notes: existing.notes || '',
  };
}

function GrinderForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { items: grinders, add, update } = useLocalStorage('qahwati_grinders');
  const isEdit = Boolean(id);

  const [form, setForm] = useState(() =>
    buildForm(isEdit ? grinders.find((g) => g.id === id) : null)
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
    navigate('/grinders');
  };

  return (
    <div>
      <PageHeader
        icon="⚙️"
        title={isEdit ? 'Edit Grinder' : 'Add Grinder'}
        subtitle={isEdit ? 'Update your grinder details.' : 'Add a grinder to your collection.'}
        action={
          <Button as={Link} to="/grinders" variant="ghost">
            ← Back
          </Button>
        }
      />

      <form className="form-card" onSubmit={handleSubmit}>
        <div className="form-grid form-grid--2">
          <div className="form-group">
            <label className="form-label">
              Grinder Name <span>*</span>
            </label>
            <input
              className="form-input"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Comandante C40"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Brand</label>
            <input
              className="form-input"
              name="brand"
              value={form.brand}
              onChange={handleChange}
              placeholder="e.g. Comandante"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Type</label>
            <select className="form-select" name="type" value={form.type} onChange={handleChange}>
              <option value="">Select type</option>
              <option value="burr">Burr</option>
              <option value="blade">Blade</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Burr Material</label>
            <select className="form-select" name="burrMaterial" value={form.burrMaterial} onChange={handleChange}>
              <option value="">Select material</option>
              <option value="Steel">Steel</option>
              <option value="Ceramic">Ceramic</option>
              <option value="Titanium">Titanium</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Burr Size (mm)</label>
            <input
              className="form-input"
              name="burrSize"
              type="number"
              min="0"
              step="0.5"
              value={form.burrSize}
              onChange={handleChange}
              placeholder="e.g. 38"
            />
          </div>

          <div className="form-group form-group--full">
            <label className="form-label">Notes</label>
            <textarea
              className="form-textarea"
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Anything else about this grinder…"
            />
          </div>
        </div>

        <div className="form-actions">
          <Button as={Link} to="/grinders" variant="ghost" type="button">
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            {isEdit ? '✔ Save Changes' : '+ Add Grinder'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default GrinderForm;
