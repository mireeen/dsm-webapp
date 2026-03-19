import { useState } from "react"
import { Col, Container, Form, Row } from "react-bootstrap"


function PeliculasFiltro(props) {


    const genderHandler = (event) => {
        props.setGenero(event.target.value)
    }

    return (
        <Container>
            <Row>
                <Col md={4}>
                    <Form.Label>Selecciona el genero:</Form.Label>
                    <Form.Select onChange={genderHandler} value={props.genero}>
                        <option value=''>Ver todos</option>
                        <option value='Drama'>Drama</option>
                        <option value='Comedia'>Comedia</option>
                        <option value='Acción'>Acción</option>
                        <option value='Terror'>Terror</option>
                        <option value='Ciencia ficción'>Ciencia ficción</option>
                        <option value='Animación'>Animación</option>
                        <option value='Thriller'>Thriller</option>
                    </Form.Select>
                </Col>
            </Row>
        </Container>
    )
}

export default PeliculasFiltro