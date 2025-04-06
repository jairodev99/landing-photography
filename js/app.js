//Variables
const formulario = document.querySelector("#formulario");
const listComments = document.querySelector("#comment-list ul");
let comments = [];

//Event listeners
eventlisteners();

function eventlisteners() {
  //Cuando se envía el formulario
  formulario.addEventListener("submit", addComment);

  //Borrando el comentario
  listComments.addEventListener("click", deleteComment);

  //Cargar los comentarios de localStorage
  document.addEventListener("DOMContentLoaded", () => {
    //Obtener el localStorage los comentarios
    comments = JSON.parse(localStorage.getItem("comments")) || [];
    console.log(comments);

    //Cargar html con comments guardados
    crearHTML();
  });
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
      //Crear botón para eliminar el comentario
      const btnDelete = document.createElement("i");
      btnDelete.classList.add("fa-solid", "fa-trash-can");

      //Crear elemento y añadirlo al contenido de la lista
      const li = document.createElement("li");

      //Añadir el texto del comentario
      li.innerHTML = `<p class="comment-hour">${comment.hour}</p> 
      <div class="comment-container"><p>${comment.comment}</p>
      ${btnDelete.outerHTML}</div>
      `;

      //Añadir el id al li
      li.id = comment.id;

      //Añadir el comentario al DOM
      listComments.appendChild(li);
    });
  }

  sincronizarStorage();
}

//Limpiar el HTML
function limpiarHTML() {
  while (listComments.children[0]) {
    listComments.removeChild(listComments.firstChild);
  }
}

//Eliminar comentario
function deleteComment(e) {
  if (e.target.classList.contains("fa-trash-can")) {
    //Obtenemos el id del comentario
    const commentId = e.target.parentElement.parentElement.id;

    //Filtramos los comentarios
    comments = comments.filter((comment) => comment.id != commentId);

    //Volvemos a renderizar el HTML
    crearHTML();
  }
}

function sincronizarStorage() {
  localStorage.setItem("comments", JSON.stringify(comments));
}
