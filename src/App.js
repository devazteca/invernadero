import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
//? Login
import Register from './log/Register';
//? Pages
import Dashboard from './pages/Dashboard';
import Index from './pages/Index';
import Temperature from './pages/Temperature'
import Humidity from './pages/Humidity';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Register" element={<Register />} />
           //? Pages
          <Route path="/Dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
