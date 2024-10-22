import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//? Login
import Home from './Home';
import Register from './log/Register';
//? Pages
import Dashboard from './pages/Dashboard';

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
