import Pelicula from './Pelicula';
import './catalogo.css';

function Catalogo() {
    return (
        <section className="catalogo_container">
            <h1 className="catalogo_titulo">Catálogo de Películas</h1>
            <div className="peliculas_grid">
                <Pelicula />
                <Pelicula />
                <Pelicula />
                <Pelicula />
            </div>
        </section>
    );
}

export default Catalogo;