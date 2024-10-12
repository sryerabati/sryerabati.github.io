import { Link } from 'react-router-dom';
import '../styles/custom.css';

export default function Layout({ children }) {
  return (
    <div className="layout-container">
      <header className="header">
        <nav className="container">
          <ul className="nav-list">
            <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
            <li className="nav-item"><Link to="/projects" className="nav-link">Projects</Link></li>
            <li className="nav-item"><Link to="/about" className="nav-link">About Me</Link></li>
            <li className="nav-item"><Link to="/contact" className="nav-link">Contact</Link></li>
          </ul>
        </nav>
      </header>
      <main className="content-container" style={{marginLeft: '50px', marginTop: "70px"}}>
        {children}
      </main>
      
    </div>
  );
}