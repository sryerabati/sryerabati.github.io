import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import Home from './Home';
import About from './About';
import Contact from './Contact';
import MainHeader from './mainHeader';

function App() {
  return (
    <div className="App">
      <MainHeader />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
