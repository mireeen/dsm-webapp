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
                const nombre= email.split('@')[0];
                
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
                console.error('Error en login:', error);
                setErrorMessage('Usuario no existe o contraseña incorrecta');
                setShowModal(true);
                setEmail('');
                setPassword('');
            })
    }




    return (
        <>
            <Form onSubmit={submitHandler}>
                <Container>
                    <Row>
                        <Col>
                            <Form.Label>Email:</Form.Label>
                            <Form.Control onChange={(event) => setEmail(event.target.value)} type='email' value={email} />
                        </Col>
                        <Col>
                            <Form.Label>Password:</Form.Label>
                            <Form.Control onChange={(event) => setPassword(event.target.value)} type='password' value={password} />
                        </Col>
                        <Col>
                            <Button variant='primary' type='submit'>LOGIN</Button>
                        </Col>
                      
                    </Row>
                </Container>
            </Form>
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