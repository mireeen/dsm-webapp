import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import { Modal, Button } from "react-bootstrap";

function Puntuacion({ peliculaId, soloLectura }) {
    const auth = useContext(AuthContext);
    const idtoken = auth.idToken;
    const local = auth.localId;

    const [userRating, setUserRating] = useState(-1);
    const [averageRating, setAverageRating] = useState(0);
    const [totalVotes, setTotalVotes] = useState(0);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (!peliculaId) return;
        axios.get(`https://dsm-catalogo-default-rtdb.europe-west1.firebasedatabase.app/peliculas/${peliculaId}/puntuaciones.json`)
            .then(response => {
                const data = response.data;
                if (data) {
                    let sum = 0;
                    let count = 0;
                    for (let key in data) {
                        const val = data[key]?.puntuacion;
                        if (typeof val === 'number') {
                            sum += val;
                            count++;
                            if (local && key === local) {
                                setUserRating(val);
                            }
                        }
                    }
                    setAverageRating((sum / count).toFixed(1));
                    setTotalVotes(count);
                } else {
                    setAverageRating(0);
                    setTotalVotes(0);
                    setUserRating(-1);
                }
            })
            .catch(err => console.error(err));
    }, [peliculaId, local]);

    const handleRate = (score, event) => {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }

        if (soloLectura) return;

        if (!idtoken) {
            setShowModal(true);
            return;
        }

        axios.put(`https://dsm-catalogo-default-rtdb.europe-west1.firebasedatabase.app/peliculas/${peliculaId}/puntuaciones/${local}.json`, { puntuacion: score })
            .then(() => {
                const oldTotalVotes = totalVotes;
                const oldAverage = parseFloat(averageRating) || 0;

                const isNew = userRating === -1;
                const newSum = (oldAverage * oldTotalVotes) - (isNew ? 0 : userRating) + score;
                const newCount = isNew ? oldTotalVotes + 1 : oldTotalVotes;

                setUserRating(score);
                setAverageRating((newSum / newCount).toFixed(1));
                setTotalVotes(newCount);
            })
            .catch(err => console.error("Error guardando puntuación", err));
    };

    return (
        <div className="puntuacion-container" onClick={(e) => { if (soloLectura) e.stopPropagation(); }}>
            <div className="d-flex align-items-center mb-1 justify-content-center">
                <span className="me-2 fw-bold" style={{ color: '#fbbf24', fontSize: soloLectura ? '1rem' : '1.2rem' }}>
                    ⭐️ {averageRating > 0 ? averageRating : 'Sin votos'}
                </span>
                <span className="text-muted small">({totalVotes})</span>
            </div>

            {!soloLectura && (
                <div className="rating-buttons mt-2 d-flex justify-content-center flex-nowrap" style={{ gap: '2px' }}>
                    {Array.from({ length: 11 }, (_, i) => i).map(num => (
                        <button
                            key={num}
                            type="button"
                            className={`btn ${userRating >= num && userRating !== -1 ? 'btn-warning text-dark' : 'btn-outline-warning text-warning'}`}
                            onClick={(e) => handleRate(num, e)}
                        >
                            {num}
                        </button>
                    ))}
                </div>
            )}

            <Modal show={showModal} onHide={(e) => {
                if (e) e.stopPropagation();
                setShowModal(false);
            }} centered onClick={(e) => e.stopPropagation()}>
                <Modal.Header closeButton>
                    <Modal.Title>Iniciar sesión</Modal.Title>
                </Modal.Header>
                <Modal.Body>Es necesario iniciar sesión para puntuar la película.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cerrar</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Puntuacion;
