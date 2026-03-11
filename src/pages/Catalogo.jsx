import axios from 'axios';
import Pelicula from '../components/Pelicula';
import './catalogo.css';
import { useState, useEffect } from "react"
import { Alert } from "react-bootstrap"
import PeliculasFiltro from '../components/peliculafiltro';

function Catalogo() {


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
            console.log("Array de películas listo para renderizar:", arrayPeliculas);

            setPeliculas(arrayPeliculas);
        })
        .catch(error => {
            console.error('Error fetching peliculas:', error);
        });
}, []);

    const [genero, setGenero] = useState('');
    const peliculasFiltradas = peliculas.filter((pelicula) => {
        if (genero !== '') {
            return pelicula.genero === genero
        }
        return true
    })


    let contenido = <Alert>NO HAY PELICULAS DE {genero}</Alert>
    if (peliculasFiltradas.length > 0) {
        contenido = peliculasFiltradas.map((elemento) => {
            return <Pelicula key={elemento.id} pelicula={elemento} />
        })
    }

   return (
    <>
    <section className="catalogo_container">
        <h1 className="catalogo_titulo">Catálogo de Películas</h1>
        <PeliculasFiltro setGenero={setGenero} genero={genero} />
        <div className="peliculas_grid">
            {contenido}
        </div>
    </section>
    </>
)}

export default Catalogo;