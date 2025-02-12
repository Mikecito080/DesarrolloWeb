// Función para mostrar una sección específica y ocultar las demás
function showContent(sectionId) {
    document.querySelectorAll('.content').forEach(section => { // Selecciona todas las secciones con la clase 'content'
        section.classList.remove('active'); // Remueve la clase 'active' para ocultarlas
    });
    document.getElementById(sectionId).classList.add('active'); // Agrega la clase 'active' a la sección seleccionada para mostrarla
}

document.getElementById('menu-toggle').addEventListener('click', function () {
    document.querySelector('.nav-links').classList.toggle('active');
});



// Función para agregar un nuevo comentario al foro
function addComment() {
    let commentInput = document.getElementById("commentInput"); // Obtiene el elemento del textarea donde el usuario escribe su comentario
    let commentText = commentInput.value.trim(); // Obtiene el texto ingresado y elimina espacios en blanco al inicio y final

    if (commentText !== "") { // Verifica que el comentario no esté vacío
        let commentContainer = document.getElementById("comments-container"); // Obtiene el contenedor donde se mostrarán los comentarios
        let newComment = document.createElement("div"); // Crea un nuevo div para el comentario
        newComment.classList.add("comment"); // Le agrega la clase 'comment' para estilizarlo
        
        let commentTextElement = document.createElement("p"); // Crea un párrafo para contener el texto del comentario
        commentTextElement.textContent = commentText; // Asigna el texto del comentario al párrafo
        
        let deleteButton = document.createElement("button"); // Crea un botón de eliminar
        deleteButton.textContent = "Eliminar"; // Agrega el texto "Eliminar" al botón
        deleteButton.classList.add("delete-btn"); // Le agrega la clase 'delete-btn' para su estilo
        deleteButton.onclick = function () { // Asigna una función al hacer clic en el botón
            deleteComment(newComment, commentText); // Llama a la función para eliminar el comentario
        };
        
        newComment.appendChild(commentTextElement); // Agrega el texto del comentario al div
        newComment.appendChild(deleteButton); // Agrega el botón de eliminar al div
        commentContainer.appendChild(newComment); // Agrega el comentario completo al contenedor

        // Guardar en LocalStorage
        saveComment(commentText); // Guarda el comentario en el almacenamiento local
        
        // Limpiar el campo de entrada
        commentInput.value = ""; // Borra el texto del textarea después de enviar el comentario
    }
}

// Función para guardar comentarios en LocalStorage
function saveComment(comment) {
    let comments = JSON.parse(localStorage.getItem("comments")) || []; // Obtiene los comentarios almacenados o un array vacío si no hay
    comments.push(comment); // Agrega el nuevo comentario al array
    localStorage.setItem("comments", JSON.stringify(comments)); // Guarda el array actualizado en el almacenamiento local
}

// Función para cargar comentarios al iniciar la página
function loadComments() {
    let comments = JSON.parse(localStorage.getItem("comments")) || []; // Obtiene los comentarios almacenados o un array vacío
    let commentContainer = document.getElementById("comments-container"); // Obtiene el contenedor de comentarios

    comments.forEach(comment => { // Recorre todos los comentarios almacenados
        let newComment = document.createElement("div"); // Crea un div para el comentario
        newComment.classList.add("comment"); // Le agrega la clase 'comment'

        let commentTextElement = document.createElement("p"); // Crea un párrafo para el texto del comentario
        commentTextElement.textContent = comment; // Asigna el texto almacenado al párrafo
        
        let deleteButton = document.createElement("button"); // Crea un botón de eliminar
        deleteButton.textContent = "Eliminar"; // Agrega el texto "Eliminar" al botón
        deleteButton.classList.add("delete-btn"); // Le agrega la clase 'delete-btn'
        deleteButton.onclick = function () { // Asigna una función al hacer clic en el botón
            deleteComment(newComment, comment); // Llama a la función para eliminar el comentario
        };
        
        newComment.appendChild(commentTextElement); // Agrega el texto del comentario al div
        newComment.appendChild(deleteButton); // Agrega el botón de eliminar al div
        commentContainer.appendChild(newComment); // Agrega el comentario al contenedor
    });
}

// Función para eliminar un comentario
function deleteComment(commentElement, commentText) {
    commentElement.remove(); // Elimina el comentario visualmente de la página
    
    let comments = JSON.parse(localStorage.getItem("comments")) || []; // Obtiene los comentarios almacenados o un array vacío
    let updatedComments = comments.filter(c => c !== commentText); // Filtra y elimina el comentario seleccionado
    localStorage.setItem("comments", JSON.stringify(updatedComments)); // Guarda la lista actualizada en el almacenamiento local
}

// Cargar los comentarios cuando se carga la página
document.addEventListener("DOMContentLoaded", loadComments); // Ejecuta la función loadComments al cargar la página

