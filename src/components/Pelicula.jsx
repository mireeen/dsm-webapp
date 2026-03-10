import './pelicula.css'
function Pelicula() {
    const titulo = 'La novia';
    const genero = 'Drama';
    const duracion = 126;
    return (
        <div className='producto'>
            <div className='producto_descripcion'>
                <h2>Título: {titulo}</h2>
                <div className="producto_genero">Género: {genero}</div>
                <div className='producto_duracion'>Duración: {duracion} min.</div>
            </div>
        </div>

    )
}

export default Pelicula;