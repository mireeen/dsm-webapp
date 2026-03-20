import { useEffect, useState } from 'react';
import './fichaDetalle.css';
import { useParams, useSearchParams } from 'react-router';
import axios from 'axios';

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

    const handleRating = (rating) => {
        console.log(`Puntuación: ${rating}`);
    };

    return (
        <>
            <div className="ficha-detalle-container">
                <div className="card ficha-detalle-card">
                    <div className="card-body">
                        <h2 className="card-title ficha-detalle-title">{pelicula.nombre}</h2>
                        <p className="card-text ficha-detalle-genero"><strong>Género:</strong> {pelicula.genero}</p>
                        <p className="card-text ficha-detalle-resumen">{pelicula.resumen}</p>
                        <div className="rating-section">
                            <label className="rating-label">Puntúa la película:</label>
                            <div className="btn-group rating-buttons" role="group">
                                {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                                    <button
                                        key={num}
                                        type="button"
                                        className="btn btn-outline-primary"
                                        onClick={() => handleRating(num)}
                                    >
                                        {num}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FichaDetalle;