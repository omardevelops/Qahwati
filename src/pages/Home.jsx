import { Link } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage.js';
import './Home.css';

const SECTIONS = [
  {
    to: '/beans',
    icon: '☕',
    title: 'Coffee Beans',
    description: 'Track your bean collection — origin, roast level, process and tasting notes.',
    key: 'qahwati_beans',
  },
  {
    to: '/brewing-methods',
    icon: '🫗',
    title: 'Brewing Methods',
    description: 'Log your favourite brewing methods, brew times and techniques.',
    key: 'qahwati_brewing_methods',
  },
  {
    to: '/grinders',
    icon: '⚙️',
    title: 'Grinders',
    description: 'Keep a record of your grinders, burr sizes and settings.',
    key: 'qahwati_grinders',
  },
  {
    to: '/brews',
    icon: '📋',
    title: 'Brews',
    description: 'Log individual brew sessions with recipes, doses and ratings.',
    key: 'qahwati_brews',
  },
];

function StatCard({ section }) {
  const { items } = useLocalStorage(section.key);
  return (
    <Link to={section.to} className="home-card">
      <span className="home-card-icon">{section.icon}</span>
      <div className="home-card-body">
        <h2 className="home-card-title">{section.title}</h2>
        <p className="home-card-desc">{section.description}</p>
      </div>
      <span className="home-card-count">{items.length} {items.length === 1 ? 'entry' : 'entries'}</span>
    </Link>
  );
}

function Home() {
  return (
    <div className="home">
      <div className="home-hero">
        <h1 className="home-hero-title">Welcome to Qahwati ☕</h1>
        <p className="home-hero-subtitle">
          Your personal coffee logging and discovery journal. Track beans, methods, grinders, and every brew you craft.
        </p>
      </div>
      <div className="home-grid">
        {SECTIONS.map((s) => (
          <StatCard key={s.to} section={s} />
        ))}
      </div>
    </div>
  );
}

export default Home;
