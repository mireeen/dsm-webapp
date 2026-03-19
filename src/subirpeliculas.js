// Ejecuta con: node src/subirpeliculas.js
// O usando variable de entorno: FIREBASE_ID_TOKEN=<tu_token> node src/subirpeliculas.js

// 🔐 Token de Firebase (Reemplaza con tu token real o exporta FIREBASE_ID_TOKEN)
const ID_TOKEN = process.env.FIREBASE_ID_TOKEN || "TU_TOKEN_AQUI";

if (!ID_TOKEN || ID_TOKEN === "TU_TOKEN_AQUI") {
  console.error("❌ Debes configurar un token válido en FIREBASE_ID_TOKEN o en el archivo.");
  process.exit(1);
}

const url = `https://dsm-catalogo-default-rtdb.europe-west1.firebasedatabase.app/peliculas.json?auth=${ID_TOKEN}`;

// 🎬 CATÁLOGO COMPLETO (con IDs numéricos)
const peliculas = {
  "oppenheimer": {
    nombre: "Oppenheimer",
    genero: "Drama / Biografía",
    resumen: "La historia del físico J. Robert Oppenheimer y el desarrollo de la bomba atómica."
  },
  "sociedad_nieve": {
    nombre: "La sociedad de la nieve",
    genero: "Drama / Supervivencia",
    resumen: "Supervivientes de un accidente aéreo luchan por vivir en los Andes."
  },
  "as_bestas": {
    nombre: "As bestas",
    genero: "Thriller / Drama",
    resumen: "Un conflicto vecinal en una aldea gallega escala peligrosamente."
  },
  "alcarras": {
    nombre: "Alcarràs",
    genero: "Drama",
    resumen: "Una familia agricultora afronta el fin de su modo de vida."
  },
  "shawshank": {
    nombre: "The Shawshank Redemption",
    genero: "Drama",
    resumen: "Un hombre es condenado injustamente y encuentra esperanza en prisión."
  },
  "forrest_gump": {
    nombre: "Forrest Gump",
    genero: "Drama",
    resumen: "La vida de un hombre con discapacidad intelectual que vive momentos históricos."
  },
  "mar_adentro": {
    nombre: "Mar adentro",
    genero: "Drama",
    resumen: "La lucha de Ramón Sampedro por el derecho a morir dignamente."
  },
  "maixabel": {
    nombre: "Maixabel",
    genero: "Drama",
    resumen: "Una mujer se enfrenta al asesino de su marido en un proceso de reconciliación."
  },
  "abejas": {
    nombre: "20.000 especies de abejas",
    genero: "Drama",
    resumen: "Una niña explora su identidad durante un verano familiar."
  },
  "superbad": {
    nombre: "Superbad",
    genero: "Comedia",
    resumen: "Dos adolescentes intentan disfrutar de su última fiesta antes de la universidad."
  },
  "grand_budapest": {
    nombre: "The Grand Budapest Hotel",
    genero: "Comedia",
    resumen: "Las aventuras de un conserje y su aprendiz en un famoso hotel europeo."
  },
  "ocho_apellidos": {
    nombre: "Ocho apellidos vascos",
    genero: "Comedia",
    resumen: "Un sevillano intenta hacerse pasar por vasco por amor."
  },
  "campeones": {
    nombre: "Campeones",
    genero: "Comedia / Drama",
    resumen: "Un entrenador dirige a un equipo de jugadores con discapacidad intelectual."
  },
  "interstellar": {
    nombre: "Interstellar",
    genero: "Ciencia ficción",
    resumen: "Exploradores viajan por el espacio en busca de un nuevo hogar."
  },
  "dune": {
    nombre: "Dune",
    genero: "Ciencia ficción",
    resumen: "Un joven debe liderar en un planeta desértico lleno de peligros."
  },
  "matrix": {
    nombre: "The Matrix",
    genero: "Ciencia ficción",
    resumen: "Un hacker descubre la verdad sobre la realidad en la que vive."
  },
  "hoyo": {
    nombre: "El hoyo",
    genero: "Ciencia ficción / Thriller",
    resumen: "Una prisión vertical donde la comida se reparte de forma desigual."
  },
  "cronocrimenes": {
    nombre: "Los cronocrímenes",
    genero: "Ciencia ficción",
    resumen: "Un hombre queda atrapado en un bucle temporal."
  },
  "se7en": {
    nombre: "Se7en",
    genero: "Thriller",
    resumen: "Dos detectives investigan asesinatos basados en los siete pecados capitales."
  },
  "gone_girl": {
    nombre: "Gone Girl",
    genero: "Thriller",
    resumen: "Una mujer desaparece y su marido se convierte en sospechoso."
  },
  "isla_minima": {
    nombre: "La isla mínima",
    genero: "Thriller",
    resumen: "Dos policías investigan asesinatos en el sur de España."
  },
  "tesis": {
    nombre: "Tesis",
    genero: "Thriller",
    resumen: "Una estudiante descubre una red de snuff movies."
  },
  "gladiator": {
    nombre: "Gladiator",
    genero: "Acción / Aventura",
    resumen: "Un general romano busca venganza tras ser traicionado."
  },
  "mad_max": {
    nombre: "Mad Max: Fury Road",
    genero: "Acción",
    resumen: "Persecuciones en un mundo postapocalíptico."
  },
  "celda_211": {
    nombre: "Celda 211",
    genero: "Acción / Drama",
    resumen: "Un funcionario queda atrapado en un motín carcelario."
  },
  "spirited_away": {
    nombre: "Spirited Away",
    genero: "Animación",
    resumen: "Una niña entra en un mundo mágico lleno de espíritus."
  },
  "coco": {
    nombre: "Coco",
    genero: "Animación",
    resumen: "Un niño viaja al mundo de los muertos para descubrir su historia familiar."
  },
  "toy_story": {
    nombre: "Toy Story",
    genero: "Animación",
    resumen: "Los juguetes cobran vida cuando los humanos no están."
  },
  "robot_dreams": {
    nombre: "Robot Dreams",
    genero: "Animación",
    resumen: "La amistad entre un perro y un robot en Nueva York."
  },
  "rec": {
    nombre: "REC",
    genero: "Terror",
    resumen: "Un reportaje se convierte en una pesadilla en un edificio infectado."
  },
  "conjuring": {
    nombre: "The Conjuring",
    genero: "Terror",
    resumen: "Investigadores paranormales ayudan a una familia aterrorizada."
  },
  "hereditary": {
    nombre: "Hereditary",
    genero: "Terror",
    resumen: "Una familia sufre sucesos aterradores tras la muerte de la abuela."
  },
  "oldboy": {
    nombre: "Oldboy",
    genero: "Thriller",
    resumen: "Un hombre busca venganza tras años de cautiverio."
  },
  "amelie": {
    nombre: "Amélie",
    genero: "Romance / Comedia",
    resumen: "Una joven decide mejorar la vida de quienes la rodean."
  }
};

// Convertir a IDs numéricos (1, 2, 3, ...)
const peliculasPorId = Object.values(peliculas).reduce((acc, pelicula, index) => {
  acc[index + 1] = pelicula;
  return acc;
}, {});

// 🚀 SUBIR TODO
async function subirCatalogo() {
  try {
    const res = await fetch(url, {
      method: "PUT", // 🔥 clave: sustituye todo
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(peliculasPorId)
    });

    const data = await res.json();
    console.log("✅ Catálogo subido correctamente", data);
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

subirCatalogo();