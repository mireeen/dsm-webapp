import { useState } from "react"
import { Col, Container, Form, Row } from "react-bootstrap"
import './peliculaFiltro.css'


function PeliculasFiltro(props) {


    const genderHandler = (event) => {
        props.setGenero(event.target.value)
    }

    return (
        <Container className="filtro_container">
            <Row>
                <Col md={4}>
                    <Form.Label>Selecciona el género:</Form.Label>
                    <Form.Select onChange={genderHandler} value={props.genero}>
                        <option value=''>Ver Todos</option>
                        <option value='drama'>Drama</option>
                        <option value='risa'>Comedia</option>
                        <option value='Acción'>Acción</option>
                        <option value='Terror'>Terror</option>
                        <option value='Ciencia Ficción'>Ciencia Ficción</option>
                        <option value='Fantasía'>Fantasía</option>
                        <option value='Romance'>Romance</option>
                        <option value='Suspense'>Suspense</option>
                    </Form.Select>
                </Col>
            </Row>
        </Container>
    )
}

export default PeliculasFiltro