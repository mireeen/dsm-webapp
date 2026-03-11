import './pelicula.css'


function Pelicula(props) {
    return (
        <div className='producto'>
            <div className='producto_descripcion'>
                <h2>Título: {props.pelicula.nombre}</h2>
                <div className="producto_genero">Género: {props.pelicula.genero}</div>
            </div>
        </div>
    )
}

export default Pelicula;