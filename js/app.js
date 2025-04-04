//Variables
const formulario = document.querySelector("#formulario");
const listComments = document.querySelector("#comment-list ul");
let comments = [];

//Event listeners
eventlisteners();

function eventlisteners() {
  //Cuando se envía el formulario
  formulario.addEventListener("submit", addComment);
}

//Añadir comentario
function addComment(e) {
  e.preventDefault();
  //Obtenemos la hora actual
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  //Leer el valor del comentario
  const comment = document.querySelector("#comment").value;

  //Validar que el comentario no sea vacío
  if (comment === "") {
    console.log("Comentario vacío");
    return;
  }

  //Crear un objeto comments
  const commentObj = {
    id: Date.now(),
    comment,
    hour: `${hours}:${minutes}`,
  };

  //Añadir commentario a lista de comentarios
  comments = [...comments, commentObj];

  //Una vez agregado a la lista, mandamos a renderizar el HTML
  crearHTML();

  //Reiniciar el formulario
  formulario.reset();
}

function crearHTML() {
  //Limpiar el HTML
  limpiarHTML();

  if (comments.length > 0) {
    comments.forEach((comment) => {
      //Crear elemento y añadirlo al contenido de la lista
      const li = document.createElement("li");

      //Añadir el texto del comentario
      li.innerHTML = `<strong>${comment.hour}:</strong> ${comment.comment}`;

      //Añadir el comentario al DOM
      listComments.appendChild(li);
    });
  }
}

//Limpiar el HTML
function limpiarHTML() {
  while (listComments.children[0]) {
    listComments.removeChild(listComments.firstChild);
  }
}
