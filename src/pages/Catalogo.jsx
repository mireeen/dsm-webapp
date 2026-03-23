import axios from 'axios';
import Pelicula from '../components/movie/Pelicula';
import './catalogo.css';
import { useState, useEffect } from "react"
import { Alert } from "react-bootstrap"
import PeliculasFiltro from '../components/movie/peliculafiltro';
import { useNavigate } from 'react-router';

function Catalogo() {
    const navigate = useNavigate();

    const [peliculas, setPeliculas] = useState([]);


    useEffect(() => {
        axios.get('https://dsm-catalogo-default-rtdb.europe-west1.firebasedatabase.app/peliculas.json')
            .then(response => {

                // 1️⃣ Mostrar los datos crudos que llegan de Firebase
                console.log("Datos crudos de Firebase:", response.data);

                let arrayPeliculas = [];

                for (let key in response.data) {

                    // 2️⃣ Mostrar cada valor antes de usarlo
                    console.log(`Procesando key: ${key}`, response.data[key]);

                    // 3️⃣ Evitar que valores nulos rompan el código
                    if (response.data[key] != null) {
                        let media = 0;
                        let count = 0;
                        let puntuacionesObj = response.data[key].puntuaciones;
                        if (puntuacionesObj) {
                            for (let userKey in puntuacionesObj) {
                                let val = puntuacionesObj[userKey]?.puntuacion;
                                if (typeof val === 'number') {
                                    media += val;
                                    count++;
                                }
                            }
                            if (count > 0) media = parseFloat((media / count).toFixed(1));
                        }

                        arrayPeliculas.push({
                            id: key,
                            nombre: response.data[key].nombre || "Nombre no disponible",
                            genero: response.data[key].genero || "Género no disponible",
                            media: media
                        });
                    } else {
                        console.warn(`Valor nulo encontrado en key: ${key}`);
                    }
                }

                // 4️⃣ Mostrar el array final antes de setearlo
                console.log("Array de películas listo para renderizar:", arrayPeliculas);

                setPeliculas(arrayPeliculas);
            })
            .catch(error => {
                console.error('Error fetching peliculas:', error);
            });
    }, []);

    const [genero, setGenero] = useState('');
    const [busqueda, setBusqueda] = useState('');

    const peliculasFiltradas = peliculas.filter((pelicula) => {
        const coincideGenero = genero === '' || pelicula.genero.toLowerCase().includes(genero.toLowerCase());
        const coincideBusqueda = busqueda === '' || pelicula.nombre.toLowerCase().includes(busqueda.toLowerCase());

        return coincideGenero && coincideBusqueda;
    });
    let contenido;
    if (peliculasFiltradas.length > 0) {
        contenido = (
            <div className="peliculas_grid">
                {peliculasFiltradas.map((elemento) => (
                    <Pelicula key={elemento.id} pelicula={elemento} />
                ))}
            </div>
        );
    } else {
        contenido = (
            <div className="text-center mt-5 opacity-75" style={{ color: 'var(--text-color)' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>😕</div>
                <h5 className="fw-bold">No hay películas que coincidan con tu búsqueda.</h5>
                <p>Intenta buscar con otro nombre o limpiar el filtro de género.</p>
            </div>
        );
    }

    const handleRandomMovie = () => {
        if (peliculas.length > 0) {
            const randomIndex = Math.floor(Math.random() * peliculas.length);
            const randomMovie = peliculas[randomIndex];
            navigate(`/pelicula/${randomMovie.id}`);
        }
    };

    return (
        <section className="catalogo_container">
            <h1 className="catalogo_titulo">Catálogo de Películas</h1>

            <div className="text-center mb-4">
                <button
                    onClick={handleRandomMovie}
                    className="btn btn-primary-custom fw-bold fs-5 px-4 py-2"
                    style={{ borderRadius: '30px', boxShadow: '0 4px 15px rgba(13, 110, 253, 0.35)', transition: 'transform 0.2s', border: 'none', color: '#fff' }}
                    onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                >
                    🎲 ¿No sabes qué ver? (Sorpréndeme)
                </button>
            </div>

            <PeliculasFiltro setGenero={setGenero} genero={genero} busqueda={busqueda} setBusqueda={setBusqueda} />
            {contenido}
        </section>
    )
}

export default Catalogo;