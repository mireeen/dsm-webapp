import { Nav } from 'react-bootstrap';
import { Link } from 'react-router';
import './header.css'
import AuthContext from '../store/AuthContext';
import { useContext } from 'react';

function Header() {

  const loginContext = useContext(AuthContext).login

  return (
    <div className="header">

      <Nav className="justify-content-center">
        <Nav.Item>
          <Link className='nav-link' to="/">Catalogo</Link>
        </Nav.Item>
        <Nav.Item>
          <Link className='nav-link' to="/Login">Login</Link>
        </Nav.Item>
        <Nav.Item>
          <Link className='nav-link' to="/Registro">Registro</Link>
        </Nav.Item>
        <Nav.Item>
          <Link className='nav-link' to="/Favoritos">Favoritos</Link>
        </Nav.Item>
        <Nav.Item>
          <Link className='nav-link' to="/Contacto">Contacto</Link>
        </Nav.Item>
        <Nav.Item>
          <Link className='nav-link' to="/Legal">Legal</Link>
        </Nav.Item>
      </Nav></div>

  );
}

export default Header;