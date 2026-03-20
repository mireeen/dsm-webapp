import axios from 'axios';
import Pelicula from '../components/Pelicula';
import './catalogo.css';
import { useState, useEffect, useContext } from "react";
import { Alert } from "react-bootstrap";
import AuthContext from '../components/store/AuthContext';

function Favoritos() {
    const { idToken, localId} = useContext(AuthContext);
    const [peliculasfavoritas, setPeliculasfavoritas] = useState([]);
    console.log("Renderizando Favoritos con localId:", localId);
    useEffect(() => {
        if (!idToken) {
            setPeliculasfavoritas([]);
            return;
        }

        axios.get(`https://dsm-catalogo-default-rtdb.europe-west1.firebasedatabase.app/favoritos/${localId}.json`)
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
        contenido = <Alert>Debes iniciar sesión para ver tus películas favoritas.</Alert>;
    } else if (peliculasfavoritas.length === 0) {
        contenido = <Alert>NO HAY PELÍCULAS EN FAVORITOS</Alert>;
    } else {
        contenido = peliculasfavoritas.map((elemento) => {
            return <Pelicula key={elemento.id} pelicula={elemento} />;
        });
    }

    return (
        <>
            <section className="catalogo_container">
                <h1 className="catalogo_titulo">Catálogo de Películas</h1>
                <div className="peliculas_grid">
                    {contenido}
                </div>
            </section>
        </>
    );
}

export default Favoritos;
