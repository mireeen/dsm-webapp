// FavoritoButton.js
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import AuthContext from "./store/AuthContext";

function FavoritoButton({ peliculaId }) {
  const auth = useContext(AuthContext);
  const idtoken = auth.idToken;
  const local= auth.localId;

  const [esFavorito, setEsFavorito] = useState(false);
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    console.log("Verificando si la película es favorita con token local:", local, "y películaId:", peliculaId);
    axios
      .get(
        `https://dsm-catalogo-default-rtdb.europe-west1.firebasedatabase.app/usuarios/${local}/favoritos/${peliculaId}.json`
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
          `https://dsm-catalogo-default-rtdb.europe-west1.firebasedatabase.app/usuarios/${local}/favoritos/${peliculaId}.json`
        )
        .then(() => setEsFavorito(false));
    } else {
      axios
        .put(
          `https://dsm-catalogo-default-rtdb.europe-west1.firebasedatabase.app/usuarios/${local}/favoritos/${peliculaId}.json`,
          true
        )
        .then(() => setEsFavorito(true));
    }
  };

  return (
    <>
      <button onClick={toggleFavoritoHandler}>
        {esFavorito ? "💔 Quitar de favoritos" : "❤️ Añadir a favoritos"}
      </button>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
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