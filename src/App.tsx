import { Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { CartProvider } from './context/CartContext';
import { About } from './pages/About';
import { Home } from './pages/Home';
import { Store } from './pages/Store';

function App() {
  return (
    <CartProvider>
      <div className="mb-4 bg-slate-100 min-h-screen">
        <div className="w-full bg-blue-200">
          <Navbar />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="store" element={<Store />} />
          <Route path="about" element={<About />} />
        </Routes>
      </div>
    </CartProvider>
  );
}

export default App;
