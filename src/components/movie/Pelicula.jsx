import './pelicula.css'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router'

import FavoritoButton from './Añadirfavoritos';
import AuthContext from '../../context/AuthContext';
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
        imgSrc = new URL(`../../assets/images/${nombre}.jpg`, import.meta.url).href;
    } catch {
        imgSrc = new URL(`../../assets/images/usuario.png`, import.meta.url).href;
    }

    return (
        <div className='producto' onClick={handleCardClick} title="Ver detalles o añadir a favoritos">
            <div className="producto_media">
                {props.pelicula.media >= 8 && (
                    <div className="badge-top" title={`Puntuación media: ${props.pelicula.media}/10`}>
                        🌟 RECOMENDADA
                    </div>
                )}
                <img className="pelicula_img" src={imgSrc} alt={nombre} />
            </div>
            <div className='producto_info'>
                <h2 className="producto_titulo">{nombre}</h2>
                <div className="mb-2" style={{ color: '#fbbf24', fontWeight: 'bold', fontSize: '0.95rem' }}>
                    ⭐️ {props.pelicula.media > 0 ? `${props.pelicula.media} / 10` : 'Sin nota'}
                </div>
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