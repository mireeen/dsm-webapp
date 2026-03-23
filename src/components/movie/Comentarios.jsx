import React, { useContext, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import { useEffect } from 'react';
import axios from 'axios';

function Comentarios(props) {
    const { idToken, nombre } = useContext(AuthContext);
    const [comentarios, setComentarios] = useState([]);
    console.log("Cargando comentarios de película:", props.pelicula.nombre);
    console.log("Cargando comentarios de usuario:", nombre);

    const idPelicula = props.pelicula.id;
    const [nuevoComentario, setNuevoComentario] = useState('');

    useEffect(() => {
        if (!idPelicula) {
            setComentarios([]);
            return;
        }
        axios.get(`https://dsm-catalogo-default-rtdb.europe-west1.firebasedatabase.app/peliculas/${idPelicula}/comentarios.json`)
            .then(response => {
                console.log("Datos crudos de Firebase (comentarios):", response.data);
                if (!response.data) {
                    setComentarios([]);
                    return;
                }
                // Firebase devuelve un objeto con keys, convertirlo a array
                const arrayComentarios = Object.keys(response.data).map(key => ({
                    id: key,
                    ...response.data[key]
                }));
                setComentarios(arrayComentarios);
            })
            .catch(error => {
                console.error('Error fetching comentarios:', error);
                setComentarios([]);
            });
    }, [idPelicula]);


    const handleSubmit = async (e) => { //Función asíncrona que maneja el envío del formulario
        e.preventDefault();
        if (nuevoComentario.trim() && idToken && nombre) {
            try {
                const comentarioNuevo = {
                    usuario: nombre,
                    comentario: nuevoComentario,
                    fecha: new Date().toISOString()
                };

                // Guardar en Firebase
                await axios.post(`https://dsm-catalogo-default-rtdb.europe-west1.firebasedatabase.app/peliculas/${idPelicula}/comentarios.json?auth=${idToken}`,
                    comentarioNuevo
                );

                setComentarios([...comentarios, { id: Date.now().toString(), ...comentarioNuevo }]);
                setNuevoComentario('');
            } catch (error) {
                console.error('Error guardando comentario:', error);
                alert('Error al guardar el comentario. Inténtalo de nuevo.');
            }
        } else if (!idToken) {
            alert('Debes iniciar sesión para comentar.');
        }
    };

    return (
        <div className="mt-4">
            <h4 className="mb-3">Comentarios de usuarios</h4>
            {comentarios.length > 0 ? (
                <div className="list-group mb-4">
                    {comentarios.map((comentario) => {
                        const fecha = comentario.fecha ? new Date(comentario.fecha) : null;
                        const fechaFormateada = fecha ? fecha.toLocaleString('es-ES', {
                            day: '2-digit', month: '2-digit', year: 'numeric',
                            hour: '2-digit', minute: '2-digit'
                        }) : 'Fecha no disponible';

                        return (
                            <div key={comentario.id} className="list-group-item">
                                <div className="d-flex w-100 justify-content-between">
                                    <h6 className="mb-1 fw-bold">{comentario.usuario || "Usuario Anónimo"}</h6>
                                    <small className="text-muted">{fechaFormateada}</small>
                                </div>
                                <p className="mb-1">{comentario.comentario || "Sin comentario"}</p>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p className="text-muted mb-4">Aún no hay comentarios para esta película.</p>
            )}

            <h5 className="mb-3">Agregar un comentario</h5>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <textarea
                        className="form-control"
                        rows="3"
                        placeholder="Escribe tu comentario aquí..."
                        value={nuevoComentario}
                        onChange={(e) => setNuevoComentario(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Enviar comentario</button>
            </form>
        </div>
    );
}

export default Comentarios;