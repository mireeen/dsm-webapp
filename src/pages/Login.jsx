import axios from "axios"
import { useState } from "react"
import { Button, Col, Container, Form, Row, Modal } from "react-bootstrap"
import { useContext } from "react"
import { useNavigate } from "react-router"
import AuthContext from "../components/store/AuthContext"


function Login(props) {
    const auth = useContext(AuthContext)
    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const submitHandler = (event) => {
        event.preventDefault()
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAm6kEzv-D6dPHwXPSibmrCZKmB00zPkRc', authData)
            .then((response) => {
                const nombre = email.split('@')[0];

                auth.setAuthData(true, response.data.idToken, response.data.localId, nombre);
                localStorage.setItem('nombre', nombre);
                localStorage.setItem('login', 'true');
                localStorage.setItem('idToken', response.data.idToken);
                localStorage.setItem('local', response.data.localId);
                setEmail('');
                setPassword('');
                navigate('/');
            })
            .catch((error) => {
                let fbError = 'Error desconocido';
                if (error.response && error.response.data && error.response.data.error) {
                    fbError = error.response.data.error.message;
                }
                console.error('Error en Firebase Auth:', fbError);

                setErrorMessage('Usuario inexistente o contraseña incorrecta');
                setShowModal(true);
                setEmail('');
                setPassword('');
            })
    }




    return (
        <>
            <Container className="d-flex justify-content-center mt-5 mb-5">
                <Row className="w-100 justify-content-center">
                    <Col md={8} lg={5} xl={4}>
                        <div className="p-4 rounded shadow-lg text-light" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                            <h3 className="text-center mb-4">Iniciar Sesión</h3>
                            <Form onSubmit={submitHandler}>
                                <Form.Group className="mb-3">
                                    <Form.Label fw-bold>Email</Form.Label>
                                    <Form.Control onChange={(event) => setEmail(event.target.value)} type='email' value={email} placeholder="Tu correo electrónico" required />
                                </Form.Group>
                                <Form.Group className="mb-4">
                                    <Form.Label fw-bold>Contraseña</Form.Label>
                                    <Form.Control onChange={(event) => setPassword(event.target.value)} type='password' value={password} placeholder="Tu contraseña" required />
                                </Form.Group>
                                <div className="d-grid gap-2 mb-3">
                                    <Button variant='primary' type='submit' size="lg">Entrar</Button>
                                </div>
                            </Form>
                            <div className="text-center mt-3">
                                <span className="text-light">¿No estás registrado? <a href="#" onClick={(e) => { e.preventDefault(); navigate('/Registro'); }} className="text-primary text-decoration-none fw-bold">Regístrate aquí</a></span>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Error de Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>{errorMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Login