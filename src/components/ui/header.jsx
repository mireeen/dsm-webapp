import { Nav } from 'react-bootstrap';
import { Link } from 'react-router';
import './header.css'
import { useContext } from 'react';
import AuthContext from '../store/AuthContext';
import usuarioImg from '../../images/usuario.png';
import { Button, Col, Container, Form, Row } from "react-bootstrap"

function Header() {


  const auth = useContext(AuthContext);
  const idToken = auth.idToken;
  const nombre = auth.nombre;

  
    const logoutHandler = () => {
        auth.setAuthData(false, null)
        localStorage.clear()
    }

  return (
    <div className="header">
      <div className="nav-container">
        <Nav className="justify-content-center">
          <Nav.Item>
            <Link className='nav-link' to="/">Catalogo</Link>
          </Nav.Item>
          {!idToken && (
            <>
              <Nav.Item>
                <Link className='nav-link' to="/Login">Login</Link>
              </Nav.Item>
              <Nav.Item>
                <Link className='nav-link' to="/Registro">Registro</Link>
              </Nav.Item>
            </>
          )}
          {idToken && (
          <Nav.Item>
            <Link className='nav-link' to="/Favoritos">Favoritos</Link>
          </Nav.Item>
          )}
          <Nav.Item>
            <Link className='nav-link' to="/Contacto">Contacto</Link>
          </Nav.Item>
          <Nav.Item>
            <Link className='nav-link' to="/Legal">Legal</Link>
          </Nav.Item>
        </Nav>
      </div>
      {idToken && (
        <><div><Col>
          <Button variant='warning' onClick={logoutHandler}>LOGOUT</Button>
        </Col></div><div className="user-info">
            <span>{nombre}</span>
            <img src={usuarioImg} width="60" height="60" alt="Usuario" />
          </div></>
      )}
    </div>



  );
}

export default Header;