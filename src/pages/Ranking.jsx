import axios from 'axios';
import Pelicula from '../components/movie/Pelicula';
import './ranking.css';
import { useState, useEffect } from "react"

function Ranking() {
    const [peliculas, setPeliculas] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        axios.get('https://dsm-catalogo-default-rtdb.europe-west1.firebasedatabase.app/peliculas.json', {
            headers: {
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'Expires': '0',
            }
        })
            .then(response => {
                let arrayPeliculas = [];

                for (let key in response.data) {
                    if (response.data[key] != null) {
                        let media = 0;
                        let count = 0;
                        let puntuacionesObj = response.data[key].puntuaciones;

                        if (puntuacionesObj) {
                            for (let userKey in puntuacionesObj) {
                                let val = puntuacionesObj[userKey]?.puntuacion;
                                let numVal = Number(val);
                                if (!isNaN(numVal) && val !== null && val !== undefined && val !== '') {
                                    media += numVal;
                                    count++;
                                }
                            }
                            if (count > 0) media = parseFloat((media / count).toFixed(1));
                        }

                        arrayPeliculas.push({
                            id: key,
                            nombre: response.data[key].nombre || "Nombre no disponible",
                            genero: response.data[key].genero || "Género no disponible",
                            media: media,
                            votos: count
                        });
                    }
                }

                // Filtrar las que no tienen media y ordenar
                let pelisPuntuadas = arrayPeliculas.filter(p => p.media > 0);
                pelisPuntuadas.sort((a, b) => b.media - a.media);

                // Coger solo el TOP 10
                setPeliculas(pelisPuntuadas.slice(0, 10));
                setCargando(false);
            })
            .catch(error => {
                console.error('Error fetching peliculas:', error);
                setCargando(false);
            });
    }, []);

    let contenido;

    if (cargando) {
        contenido = <div className="text-center mt-5"><span className="loader-text">Cargando Ranking...</span></div>;
    } else if (peliculas.length > 0) {
        contenido = (
            <div className="ranking-podium-container">
                {peliculas.map((elemento, index) => (
                    <div key={elemento.id} className="ranking-item">
                        <div className={`ranking-position pos-${index + 1}`}>
                            {index === 0 && '👑'}
                            {index === 1 && '🥈'}
                            {index === 2 && '🥉'}
                            {index > 2 && `${index + 1}º`}
                        </div>
                        <Pelicula pelicula={elemento} />
                    </div>
                ))}
            </div>
        );
    } else {
        contenido = (
            <div className="text-center mt-5 opacity-75" style={{ color: 'var(--text-color)' }}>
                <h5 className="fw-bold">Aún no hay películas puntuadas en el catálogo.</h5>
            </div>
        );
    }

    return (
        <section className="ranking-page-container">
            <div className="ranking-header text-center">
                <h1 className="ranking-title">🏆 Top 10 Películas</h1>
                <p className="ranking-subtitle">Las películas mejor valoradas por nuestra comunidad</p>
            </div>
            {contenido}
        </section>
    )
}

export default Ranking;
