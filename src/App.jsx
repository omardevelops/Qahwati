import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import CoffeeBeansList from './pages/beans/CoffeeBeansList.jsx';
import CoffeeBeanForm from './pages/beans/CoffeeBeanForm.jsx';
import BrewingMethodsList from './pages/brewingMethods/BrewingMethodsList.jsx';
import BrewingMethodForm from './pages/brewingMethods/BrewingMethodForm.jsx';
import GrindersList from './pages/grinders/GrindersList.jsx';
import GrinderForm from './pages/grinders/GrinderForm.jsx';
import BrewsList from './pages/brews/BrewsList.jsx';
import BrewForm from './pages/brews/BrewForm.jsx';

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '') || '/'}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Coffee Beans */}
          <Route path="/beans" element={<CoffeeBeansList />} />
          <Route path="/beans/new" element={<CoffeeBeanForm />} />
          <Route path="/beans/:id/edit" element={<CoffeeBeanForm />} />

          {/* Brewing Methods */}
          <Route path="/brewing-methods" element={<BrewingMethodsList />} />
          <Route path="/brewing-methods/new" element={<BrewingMethodForm />} />
          <Route path="/brewing-methods/:id/edit" element={<BrewingMethodForm />} />

          {/* Grinders */}
          <Route path="/grinders" element={<GrindersList />} />
          <Route path="/grinders/new" element={<GrinderForm />} />
          <Route path="/grinders/:id/edit" element={<GrinderForm />} />

          {/* Brews */}
          <Route path="/brews" element={<BrewsList />} />
          <Route path="/brews/new" element={<BrewForm />} />
          <Route path="/brews/:id/edit" element={<BrewForm />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
