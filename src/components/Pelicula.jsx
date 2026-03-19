import './pelicula.css'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router'

import FavoritoButton from './Añadirfavoritos';


function Pelicula(props) {
    const nombre = props.pelicula.nombre;

    // Intenta cargar una imagen con el mismo nombre que la película.
    // Si no existe, usa un placeholder genérico.
    let imgSrc;
    try {
        imgSrc = new URL(`../images/${nombre}.jpg`, import.meta.url).href;
    } catch {
        imgSrc = new URL(`../images/usuario.png`, import.meta.url).href;
    }

    return (
        <div className='producto'>
            <div className="producto_media">
                <img className="pelicula_img" src={imgSrc} alt={nombre} />
                <h2 className="producto_titulo">{nombre}</h2>
            </div>
            <div className='producto_info'>
                <div className="producto_genero">Género: {props.pelicula.genero}</div>
                <div className="producto_acciones">
                    <Button variant='warning'>
                        <Link to={`/pelicula/${props.pelicula.id}`}>Ver ficha técnica</Link>
                    </Button>
                    <FavoritoButton peliculaId={props.pelicula.id} />
                </div>
            </div>
        </div>)
}



export default Pelicula;