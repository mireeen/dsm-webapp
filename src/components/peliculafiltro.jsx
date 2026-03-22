import { useState } from "react"
import { Col, Container, Form, Row } from "react-bootstrap"
import './peliculaFiltro.css'


function PeliculasFiltro(props) {


    const genderHandler = (event) => {
        props.setGenero(event.target.value)
    }

    return (
        <Container className="filtro_container">
            <Row className="justify-content-center mb-4">
                <Col md={6} lg={4} className="text-center">
                    <Form.Label className="fw-bold text-light mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Selecciona el género</Form.Label>
                    <Form.Select
                        onChange={genderHandler}
                        value={props.genero}
                        className="shadow-sm border-0 py-2"
                        style={{ backgroundColor: '#1e293b', color: '#f1f5f9', cursor: 'pointer' }}
                    >
                        <option value=''>★ Todos los géneros</option>
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