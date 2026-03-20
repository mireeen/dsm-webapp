import axios from "axios"
import { useState } from "react"
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { useContext } from "react"
import AuthContext from "../components/store/AuthContext"


function Registro(props) {
    const auth = useContext(AuthContext)


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submitHandler = (event) => {
        event.preventDefault()
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAm6kEzv-D6dPHwXPSibmrCZKmB00zPkRc', authData)
            .then((response) => {
                auth.setAuthData(true, response.data.idToken)


                localStorage.setItem('login', 'true')
                localStorage.setItem('idToken', response.data.idToken)
            })
            .catch((error) => console.log('Se ha producido algún error.'))
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
                            <Button variant='primary' type='submit'>Registrarme</Button>
                        </Col>
                    </Row>
                </Container>
            </Form>
        </>
    )
}

export default Registro