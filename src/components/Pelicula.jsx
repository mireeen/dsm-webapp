import './pelicula.css'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router'

import FavoritoButton from './Añadirfavoritos';


function Pelicula(props) {


    return (
        <div className='producto'>
            <div className='producto_descripcion'>
                <h2>Título: {props.pelicula.nombre}</h2>
                <div className="producto_genero">Género: {props.pelicula.genero}</div>
            </div>
            <div>  <Button variant='warning' >
                <Link to={`/pelicula/${props.pelicula.id}`}>Ver ficha técnica</Link>
            </Button>
            </div>
            <div>
                <FavoritoButton peliculaId={props.pelicula.id} />
            </div>
        </div>)
}



export default Pelicula;