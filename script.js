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



