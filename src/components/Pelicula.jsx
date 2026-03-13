import './pelicula.css'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router'

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

        </div >
    )
}

export default Pelicula;