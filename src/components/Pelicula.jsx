import './pelicula.css'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router'

import FavoritoButton from './Añadirfavoritos';
import AuthContext from './store/AuthContext';
import { useContext } from 'react';

function Pelicula(props) {
    const nombre = props.pelicula.nombre;
    const auth = useContext(AuthContext);
    const idToken = auth.idToken;
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/pelicula/${props.pelicula.id}`);
    }

    // Intenta cargar una imagen con el mismo nombre que la película.
    // Si no existe, usa un placeholder genérico.
    let imgSrc;
    try {
        imgSrc = new URL(`../images/${nombre}.jpg`, import.meta.url).href;
    } catch {
        imgSrc = new URL(`../images/usuario.png`, import.meta.url).href;
    }

    return (
        <div className='producto' onClick={handleCardClick} title="Ver detalles o añadir a favoritos">
            <div className="producto_media">
                <img className="pelicula_img" src={imgSrc} alt={nombre} />
            </div>
            <div className='producto_info'>
                <h2 className="producto_titulo">{nombre}</h2>
                <div className="producto_genero">{props.pelicula.genero}</div>
            </div>
            {idToken && (
                <div className="producto_acciones">
                    <FavoritoButton peliculaId={props.pelicula.id} />
                </div>
            )}
        </div>
    )
}



export default Pelicula;