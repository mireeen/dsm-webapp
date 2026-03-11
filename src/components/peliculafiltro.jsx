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
                        <option value='drama'>drama</option>
                        <option value='risa'>risa</option>
                    </Form.Select>
                </Col>
            </Row>
        </Container>
    )
}

export default PeliculasFiltro