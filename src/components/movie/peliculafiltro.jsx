import { useState } from "react"
import { Col, Container, Form, Row } from "react-bootstrap"
import './peliculaFiltro.css'


function PeliculasFiltro({ genero, setGenero, busqueda, setBusqueda }) {

    return (
        <Container className="filtro_container">
            <Row className="justify-content-center mb-5 g-4">
                <Col md={6} lg={5} className="premium-input-group">
                    <label className="filtro-label">Buscar película</label>
                    <Form.Control
                        type="text"
                        placeholder="Ej: Inception, Matrix..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                </Col>
                <Col md={6} lg={5} className="premium-input-group">
                    <label className="filtro-label">Filtrar por género</label>
                    <Form.Select
                        onChange={(e) => setGenero(e.target.value)}
                        value={genero}
                    >
                        <option value=''>★ Todos los géneros</option>
                        <option value='Drama'>Drama</option>
                        <option value='Comedia'>Comedia</option>
                        <option value='Acción'>Acción</option>
                        <option value='Terror'>Terror</option>
                        <option value='Ciencia ficción'>Ciencia ficción</option>
                        <option value='Animación'>Animación</option>
                        <option value='Thriller'>Thriller</option>
                        <option value='Biografía'>Biografía</option>
                        <option value='Supervivencia'>Supervivencia</option>
                    </Form.Select>
                </Col>
            </Row>
        </Container>
    )
}

export default PeliculasFiltro