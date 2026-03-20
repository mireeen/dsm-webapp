// FavoritoButton.js
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import AuthContext from "./store/AuthContext";

function FavoritoButton({ peliculaId }) {
  const auth = useContext(AuthContext);
  const idtoken = auth.idToken;
  const local = auth.localId;

  const [esFavorito, setEsFavorito] = useState(false);
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    console.log("Verificando si la película es favorita con token local:", local, "y películaId:", peliculaId);
    axios
      .get(
        `https://dsm-catalogo-default-rtdb.europe-west1.firebasedatabase.app/favoritos/${local}/${peliculaId}.json`
      )
      .then((response) => {
        if (response.data) setEsFavorito(true);
      });
  }, [idtoken, peliculaId]);

  const toggleFavoritoHandler = () => {
    if (!idtoken) {
      setShowModal(true);
      return;
    }

    if (esFavorito) {
      axios
        .delete(
          `https://dsm-catalogo-default-rtdb.europe-west1.firebasedatabase.app/favoritos/${local}/${peliculaId}.json`
        )
        .then(() => setEsFavorito(false));
    } else {
      axios
        .put(
          `https://dsm-catalogo-default-rtdb.europe-west1.firebasedatabase.app/favoritos/${local}/${peliculaId}.json`,
          true
        )
        .then(() => setEsFavorito(true));
    }
  };

  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleFavoritoHandler();
        }}
        className="btn-favorito"
        title={esFavorito ? "Quitar de favoritos" : "Añadir a favoritos"}
        style={{
          background: 'none',
          border: 'none',
          fontSize: '1.4rem',
          cursor: 'pointer',
          padding: '0',
          lineHeight: 1,
          transition: 'transform 0.2s',
          outline: 'none',
          color: esFavorito ? '#ef4444' : '#f8fafc'
        }}
        onMouseEnter={(e) => e.target.style.transform = 'scale(1.2)'}
        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
      >
        {esFavorito ? "❤️" : "🤍"}
      </button>

      <Modal show={showModal} onHide={(e) => {
        if (e && e.stopPropagation) e.stopPropagation();
        setShowModal(false);
      }} centered onClick={(e) => e.stopPropagation()}>
        <Modal.Header closeButton>
          <Modal.Title>Iniciar sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Es necesario iniciar sesión para agregar películas a favoritos.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default FavoritoButton;