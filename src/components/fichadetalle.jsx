import React from 'react';
import './fichaDetalle.css';
import { useParams } from 'react-router';

function FichaDetalle(props) {

    const parametros = useParams()
    console.log('Parámetros:');
    console.log(parametros);
    const titulo = props.titulo || "TITULO PELI";
    const genero = props.genero || "Acción";

    const handleRating = (rating) => {
        console.log(`Puntuación: ${rating}`);
    };

    return (
        <>
        <h1>slakjsdhflkdjhf {parametros.id}</h1>
            <div className="ficha-detalle-container">
                <div className="card ficha-detalle-card">
                    <div className="card-body">
                        <h2 className="card-title ficha-detalle-title">{titulo}</h2>
                        <p className="card-text ficha-detalle-genero"><strong>Género:</strong> {genero}</p>
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