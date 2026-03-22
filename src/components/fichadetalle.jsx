import { useEffect, useState } from 'react';
import './fichaDetalle.css';
import { useParams, useSearchParams } from 'react-router';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import Comentarios from './Comentarios';
import Puntuacion from './Puntuacion';

function FichaDetalle() {

    const parametros = useParams()
    const [parametrosGet, setParametrosGet] = useSearchParams()

    const [pelicula, setPelicula] = useState({});

    useEffect(() => {
        axios.get('https://dsm-catalogo-default-rtdb.europe-west1.firebasedatabase.app/peliculas.json?orderBy="$key"&equalTo="' + parametros.id + '"')
            .then((response) => {
                // console.log("Respuesta de Firebase:", response.data);
                const peliculaFireBase = {
                    id: parametros.id,
                    nombre: response.data[parametros.id]?.nombre || "Nombre no disponible",
                    genero: response.data[parametros.id]?.genero || "Género no disponible",
                    resumen: response.data[parametros.id]?.resumen || "Resumen no disponible"
                }
                setPelicula(peliculaFireBase)
            })
            .catch(error => {
                console.error('Se ha producido algún error en la Base de Datos.', error);
            });
    }, [])

    let imgSrc;
    try {
        imgSrc = new URL(`../images/${pelicula.nombre}.jpg`, import.meta.url).href;
    } catch {
        imgSrc = new URL(`../images/usuario.png`, import.meta.url).href;
    }

    const handleRating = (rating) => {
        console.log(`Puntuación: ${rating}`);
    };

    return (
        <>
            <Container className="ficha-detalle-container mt-4 mb-5">
                <div className="card ficha-detalle-card p-4 text-light" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <Row>
                        <Col md={5} lg={4} className="text-center mb-4 mb-md-0 d-flex flex-column align-items-center">
                            <img className="pelicula_img_detalle shadow rounded mb-3" src={imgSrc} alt={pelicula.nombre} />

                            <div className="w-100 p-3 rounded mt-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                                <label className="rating-label d-block text-center fw-bold mb-2 text-warning">Puntúa la película:</label>
                                {pelicula.id && <Puntuacion peliculaId={pelicula.id} soloLectura={false} />}
                            </div>
                        </Col>
                        <Col md={7} lg={8} className="d-flex flex-column">
                            <h2 className="card-title ficha-detalle-title mb-1">{pelicula.nombre}</h2>
                            <p className="card-text text-muted mb-4 opacity-75"><strong>Género:</strong> {pelicula.genero}</p>

                            <h5 className="fw-bold border-bottom pb-2">Sinopsis</h5>
                            <p className="card-text ficha-detalle-resumen mb-4" style={{ textAlign: "justify", lineHeight: "1.6" }}>
                                {pelicula.resumen}
                            </p>


                        </Col>
                    </Row>
                    <hr className="my-4 text-muted" />
                    <div className="mt-2"><Comentarios key={pelicula.id} pelicula={pelicula} /></div>
                </div>
            </Container>
        </>
    );
}

export default FichaDetalle;