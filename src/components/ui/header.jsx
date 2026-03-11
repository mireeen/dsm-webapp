import { Nav } from 'react-bootstrap';
import { Link } from 'react-router';
import './header.css'

function Header() {
  return (
    <div className="header">
      <Nav className="justify-content-center">
        <Nav.Item>
          <Link className='nav-link' to="/">Catalogo</Link>
        </Nav.Item>
        <Nav.Item>
          <Link className='nav-link' to="/Contacto">Contacto</Link>
        </Nav.Item>
        <Nav.Item>
          <Link className='nav-link'to="/Legal">Legal</Link>
        </Nav.Item>
      </Nav></div>

  );
}

export default Header;