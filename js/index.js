const div_search = document.getElementById('search');
const input_addTask = document.getElementById('addTaskInput');
const addForm = document.getElementById('addForm');
const section_Addtask = document.getElementById('sectionAddTodo');
const date = new Date()
const todos = [];

function addTodotoArray(obj) {
    todos.push(obj);
    createTask(obj, todos.length);
}

function createTask(obj, id) {
    const div_task = document.createElement('div');
    div_task.classList.add('task');
    if (obj.completed == true) {
        div_task.classList.add('tachado');
    }
    div_task.innerHTML = `
        <input class="ckeck" type="checkbox" name="" id="">
        <p class="title-task">${obj.title}</p>
        <div class="options">
            <span class="id-task">id: ${id}</span>
            <button class="edit-button">
                <i class="fas fa-pen"></i>
            </button>
            <button class="delete-button">
                <i class="fas fa-trash-alt"></i>
            </button>
        </div>`

    document.getElementById('todoContainer').appendChild(div_task);
}

function validarInputs(input) {
    if (input.value.trim() == '') {
        alert('Campo vazio');
        return false;
    }
    return true;

}


div_search.addEventListener('click', function (e) {
    document.getElementById('searchInput').classList.add('active');
});

div_search.addEventListener('focusout', function (e) {
    document.getElementById('searchInput').classList.remove('active');
});

input_addTask.addEventListener('focus', function (e) {
    document.getElementById('extras').classList.add('active');
    document.getElementById('data').value = date.toLocaleDateString();
});

input_addTask.addEventListener('keydown', function (e) {
    while (input_addTask.scrollHeight > input_addTask.offsetHeight) {
        input_addTask.rows += 1;
    }
});

document.addEventListener('click', function (e) {
    if (!e.target.closest('#sectionAddTodo')) {
        document.getElementById('extras').classList.remove('active');
        input_addTask.rows = 2;
    }

});

addForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const inputsValido = Array.from(addForm.querySelectorAll('input, textarea')).every(input => validarInputs(input));
    if (inputsValido) {
        const form = e.target;
        const formData = new FormData(form);
        const obj = {};
        formData.forEach((value, key) => obj[key] = value);
        addTodotoArray(obj);
        form.reset();
    }
});
