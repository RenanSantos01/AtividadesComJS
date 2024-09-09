const courses = [
    { 
        id: 1, 
        name: "Introdução à Programação", 
        description: "Este curso abrange os conceitos básicos de programação, incluindo variáveis, loops e funções, usando a linguagem Python.",
        completed: false 
    },
    { 
        id: 2, 
        name: "Desenvolvimento Web com HTML, CSS e JavaScript", 
        description: "Aprenda a construir páginas web do zero, com HTML para estrutura, CSS para estilo e JavaScript para interatividade.",
        completed: false 
    },
    { 
        id: 3, 
        name: "Fundamentos de Banco de Dados", 
        description: "Entenda como funcionam os bancos de dados, os fundamentos de SQL, e como gerenciar e consultar dados de forma eficiente.",
        completed: false 
    }
];

// Função para carregar os cursos na página
function loadCourses() {
    const courseList = document.getElementById('course-list');

    courses.forEach(course => {
        const listItem = document.createElement('li');
        listItem.className = 'course-item';
        listItem.innerHTML = `
            <h3>${course.name}</h3>
            <p class="course-description">${course.description}</p>
            <button onclick="markAsCompleted(${course.id})" ${course.completed ? 'class="completed" disabled' : ''}>
                ${course.completed ? 'Concluído' : 'Concluir Curso'}
            </button>
        `;
        courseList.appendChild(listItem);
    });
}

// Função para marcar um curso como concluído
function markAsCompleted(courseId) {
    const course = courses.find(c => c.id === courseId);
    if (course) {
        course.completed = true;
        updateCourses();
    }
}

// Função para atualizar a lista de cursos após marcar como concluído
function updateCourses() {
    const courseList = document.getElementById('course-list');
    courseList.innerHTML = ''; // Limpa a lista atual
    loadCourses(); // Recarrega a lista com o curso atualizado
}

// Carrega os cursos quando a página é carregada
document.addEventListener('DOMContentLoaded', loadCourses);
