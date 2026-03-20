import axios from "axios"
import { useState } from "react"
import { Button, Col, Container, Form, Row, Modal } from "react-bootstrap"
import { useContext } from "react"
import { useNavigate } from "react-router"
import AuthContext from "../components/store/AuthContext"


function Registro(props) {
    const auth = useContext(AuthContext)
    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [showErrorModal, setShowErrorModal] = useState(false)

    const handleCloseModal = () => {
        setShowModal(false);
        navigate('/');
    }

    const submitHandler = (event) => {
        event.preventDefault()
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAm6kEzv-D6dPHwXPSibmrCZKmB00zPkRc', authData)
            .then((response) => {
                const nombre = email.split('@')[0];
                auth.setAuthData(true, response.data.idToken, '', nombre)


                localStorage.setItem('login', 'true')
                localStorage.setItem('idToken', response.data.idToken)

                setShowModal(true)
                setEmail('')
                setPassword('')
            })
            .catch((error) => {
                console.error('Error en registro:', error);
                setShowErrorModal(true);
            })
    }


    return (
        <>
            <Container className="d-flex justify-content-center mt-5 mb-5">
                <Row className="w-100 justify-content-center">
                    <Col md={8} lg={5} xl={4}>
                        <div className="p-4 border rounded shadow-sm bg-light">
                            <h3 className="text-center mb-4">Regístrate</h3>
                            <Form onSubmit={submitHandler}>
                                <Form.Group className="mb-3">
                                    <Form.Label fw-bold>Email</Form.Label>
                                    <Form.Control onChange={(event) => setEmail(event.target.value)} type='email' value={email} placeholder="Tu correo electrónico" required />
                                </Form.Group>
                                <Form.Group className="mb-4">
                                    <Form.Label fw-bold>Contraseña</Form.Label>
                                    <Form.Control
                                        onChange={(event) => setPassword(event.target.value)}
                                        type='password'
                                        value={password}
                                        placeholder="Tu contraseña"
                                        required
                                        minLength="8"
                                        pattern="^(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$"
                                        title="Mínimo 8 caracteres, una mayúscula y un símbolo"
                                    />
                                    <Form.Text className="text-muted text-center" style={{ display: 'block', marginTop: '0.25rem', fontSize: '0.85rem' }}>
                                        Mínimo 8 caracteres, 1 mayúscula y 1 símbolo
                                    </Form.Text>
                                </Form.Group>
                                <div className="d-grid gap-2 mb-3">
                                    <Button variant='primary' type='submit' size="lg">Registrarme</Button>
                                </div>
                            </Form>
                            <div className="text-center mt-3">
                                <span className="text-muted">¿Ya tienes cuenta? <a href="#" onClick={(e) => { e.preventDefault(); navigate('/Login'); }} className="text-primary text-decoration-none fw-bold">Inicia sesión</a></span>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Registro Correcto</Modal.Title>
                </Modal.Header>
                <Modal.Body>Tu cuenta ha sido creada exitosamente. ¡Bienvenido!</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleCloseModal}>
                        Continuar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Error de Registro</Modal.Title>
                </Modal.Header>
                <Modal.Body>Se ha producido un error al intentar registrarte, es posible que el email ya esté en uso o la contraseña sea inválida.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowErrorModal(false)}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Registro