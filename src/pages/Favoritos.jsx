import axios from 'axios';
import Pelicula from '../components/Pelicula';
import './catalogo.css';
import { useState, useEffect, useContext } from "react";
import { Alert } from "react-bootstrap";
import AuthContext from '../components/store/AuthContext';

function Favoritos() {
    const { idToken, localId } = useContext(AuthContext);
    const [peliculasfavoritas, setPeliculasfavoritas] = useState([]);
    //console.log("Renderizando Favoritos con localId:", localId);
    useEffect(() => {
        if (!idToken) {
            setPeliculasfavoritas([]);
            return;
        }

        axios.get(`https://dsm-catalogo-default-rtdb.europe-west1.firebasedatabase.app/usuarios/${localId}/favoritos.json`)
            .then(response => {
                // 1️⃣ Mostrar los datos crudos que llegan de Firebase
                console.log("Datos crudos de Firebase (favoritos):", response.data);

                const arrayFavoritos = response.data ? Object.keys(response.data).filter(key => response.data[key] === true) : [];
                console.log("Array de IDs de películas favoritas (filtrado por true):", arrayFavoritos);
                if (arrayFavoritos.length === 0) {
                    setPeliculasfavoritas([]);
                    return;
                }

                axios.get('https://dsm-catalogo-default-rtdb.europe-west1.firebasedatabase.app/peliculas.json')
                    .then(response => {
                        // 1️⃣ Mostrar los datos crudos que llegan de Firebase
                        console.log("Datos crudos de Firebase (peliculas):", response.data);

                        const arrayPeliculas = [];
                        for (const key in response.data) {
                            // 2️⃣ Mostrar cada valor antes de usarlo
                            console.log(`Procesando key: ${key}`, response.data[key]);

                            // 3️⃣ Evitar que valores nulos rompan el código
                            if (response.data[key] != null) {
                                arrayPeliculas.push({
                                    id: key,
                                    nombre: response.data[key].nombre || "Nombre no disponible",
                                    genero: response.data[key].genero || "Género no disponible",
                                });
                            } else {
                                console.warn(`Valor nulo encontrado en key: ${key}`);
                            }
                        }

                        // 4️⃣ Mostrar el array final antes de setearlo

                        const peliculasFav = arrayPeliculas.filter(peli =>
                            arrayFavoritos.includes(peli.id)
                        );
                        console.log("Array de películas listo para renderizar:", peliculasFav);


                        setPeliculasfavoritas(peliculasFav);
                    })
                    .catch(error => {
                        console.error('Error fetching peliculas:', error);
                    });
            })
            .catch(error => {
                console.error('Error fetching favoritos:', error);
            });
    }, [idToken]);

    let contenido;

    if (!idToken) {
        contenido = (
            <div className="text-center mt-5">
                <Alert variant="warning" className="d-inline-block shadow-sm px-5 py-4 rounded-4">
                    <h4 className="mb-3">🔒 Acceso restringido</h4>
                    <p className="mb-0">Debes iniciar sesión para ver tus películas favoritas.</p>
                </Alert>
            </div>
        );
    } else if (peliculasfavoritas.length === 0) {
        contenido = (
            <div className="text-center mt-5 text-light opacity-75">
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🤍</div>
                <h4 className="fw-bold">Aún no tienes favoritos</h4>
                <p>Explora el catálogo y añade las películas que más te gusten.</p>
            </div>
        );
    } else {
        contenido = (
            <div className="peliculas_grid">
                {peliculasfavoritas.map((elemento) => (
                    <Pelicula key={elemento.id} pelicula={elemento} />
                ))}
            </div>
        );
    }

    return (
        <section className="catalogo_container">
            <h1 className="catalogo_titulo">Tus Favoritos</h1>
            {contenido}
        </section>
    );
}

export default Favoritos;
