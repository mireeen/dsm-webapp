import React from 'react';
import './legal.css';

function Legal() {
    return (
        <div className="legal-page">
            <div className="container mt-5 p-4">
                <h1 className="text-center mb-4">Información Legal</h1>

                <div className="row">
                    <div className="col-12">
                        <section className="mb-5">
                            <h2 className="mb-3">Términos y Condiciones</h2>
                            <p className="text-light">
                                Bienvenido a nuestra plataforma de streaming de películas. Al acceder y utilizar nuestros servicios,
                                aceptas cumplir con los siguientes términos y condiciones.
                            </p>
                            <ul className="text-light">
                                <li>El contenido está destinado únicamente para uso personal y no comercial.</li>
                                <li>No se permite la descarga, copia o distribución de películas sin autorización.</li>
                                <li>Debes tener al menos 18 años o contar con supervisión parental para acceder al contenido.</li>
                                <li>Nos reservamos el derecho de suspender o cancelar cuentas por violación de estos términos.</li>
                            </ul>
                        </section>

                        <section className="mb-5">
                            <h2 className="mb-3">Política de Privacidad</h2>
                            <p className="text-light">
                                Nos comprometemos a proteger tu privacidad. Recopilamos información personal únicamente para
                                proporcionar nuestros servicios y mejorar tu experiencia.
                            </p>
                            <h5>Información que recopilamos:</h5>
                            <ul className="text-light">
                                <li>Nombre y dirección de correo electrónico para registro.</li>
                                <li>Datos de uso para analizar preferencias y mejorar el servicio.</li>
                                <li>Información de pago segura a través de proveedores certificados.</li>
                            </ul>
                            <p className="text-light">
                                No compartimos tu información personal con terceros sin tu consentimiento, salvo cuando sea
                                requerido por ley.
                            </p>
                        </section>

                        <section className="mb-5">
                            <h2 className="mb-3">Derechos de Autor</h2>
                            <p className="text-light">
                                Todo el contenido disponible en nuestra plataforma está protegido por derechos de autor.
                                Respetamos los derechos de propiedad intelectual y esperamos que nuestros usuarios hagan lo mismo.
                            </p>
                            <p className="text-light">
                                Si crees que tu contenido ha sido utilizado sin autorización, por favor contáctanos
                                a través de nuestro formulario de contacto.
                            </p>
                        </section>

                        <section className="mb-5">
                            <h2 className="mb-3">Contacto Legal</h2>
                            <p className="text-light">
                                Para consultas legales o reportes de infracciones, puedes contactarnos en:
                            </p>
                            <ul className="text-light">
                                <li><strong>Email:</strong> legal@peliculeras.com</li>
                                <li><strong>Dirección:</strong> Campus Arrosadia, Pamplona</li>
                                <li><strong>Teléfono:</strong> +34 123 456 789</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="mb-3">Última actualización</h2>
                            <p className="text-light">Esta información legal fue actualizada por última vez el 20 de marzo de 2026.</p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Legal;