import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router';
import './header.css'
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import usuarioImg from '../../assets/images/usuario.png';

function Header() {
  const auth = useContext(AuthContext);
  const idToken = auth.idToken;
  const nombre = auth.nombre;
  const navigate = useNavigate();

  const logoutHandler = () => {
    auth.setAuthData(false, null);
    localStorage.clear();
    navigate('/');
  }

  return (
    <Navbar collapseOnSelect expand="lg" variant="dark" className="shadow-sm custom-navbar sticky-top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-4 text-white">
          <span className="text-primary">▶ </span>Peliculeras
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mx-auto">
            <Link className="nav-link text-uppercase fw-semibold px-3" to="/">Catálogo</Link>
            <Link className="nav-link text-uppercase fw-bold text-warning px-3" to="/Ranking">🏆 Top 10</Link>
            {idToken && <Link className="nav-link text-uppercase fw-semibold px-3" to="/Favoritos">Favoritos</Link>}
            <Link className="nav-link text-uppercase fw-semibold px-3" to="/Contacto">Contacto</Link>
            <Link className="nav-link text-uppercase fw-semibold px-3" to="/Legal">Legal</Link>
          </Nav>

          <Nav className="align-items-center gap-3 mt-3 mt-lg-0 pb-3 pb-lg-0">
            {!idToken ? (
              <>
                <Link className="nav-link fw-bold" to="/Login">Entrar</Link>
                <Link className="btn btn-primary rounded-pill px-4 fw-bold text-white shadow-sm" to="/Registro">Registro</Link>
              </>
            ) : (
              <div className="d-flex flex-column flex-lg-row align-items-lg-center gap-3 w-100">
                <div className="d-flex align-items-center bg-secondary bg-opacity-25 rounded-pill px-3 py-1 user-badge">
                  <img src={usuarioImg} width="32" height="32" className="rounded-circle me-2 object-fit-cover" alt="Avatar" />
                  <span className="text-white fw-medium text-truncate" style={{ maxWidth: '100px' }}>{nombre}</span>
                </div>
                <Button variant="outline-danger" size="sm" onClick={logoutHandler} className="rounded-pill fw-bold w-100 w-lg-auto">Cerrar Sesión</Button>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;