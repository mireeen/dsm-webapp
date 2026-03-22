import React from "react";
import "./contacto.css";

function Contacto() {
    return (
        <div className="contacto-page">
            <h1 className="text-center mb-4 text-info">Contacto</h1>
            <p className="text-center">¿Tienes alguna duda sobre nuestro catálogo? ¡Escríbenos!</p>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Nombre</label>
                            <input type="text" className="form-control" placeholder="Tu nombre..." />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Correo Electrónico</label>
                            <input type="email" className="form-control" placeholder="nombre@gmail.com" />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Mensaje</label>
                            <textarea className="form-control" rows="4" placeholder="¿En qué podemos ayudarte?"></textarea>
                        </div>

                        <button type="submit" className="btn btn-info w-100 fw-bold">Enviar Mensaje</button>
                    </form>
                </div>
            </div>
            <div className="mt-5 text-center">
                <h5>Otras formas de contacto:</h5>
                <p>📧 soporte@peliculeras.com | 📍 Campus Arrosadia, UPNA</p>
            </div>
        </div>
    );
}

export default Contacto;