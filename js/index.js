const taskTemplate = document.querySelector('#task').content;
const taskInput = document.querySelector('input[name="task"]');
const buttonAdd = document.querySelector('.form-task__button');
const listTask = document.querySelector('.task__list');
const formSubmitTask = document.querySelector('.form-task');

// добавление задачи
function createtask () {
    const taskElement = taskTemplate.querySelector('.task__item').cloneNode(true);
    taskElement.querySelector('.task__text').textContent = taskInput.value;
    return taskElement;
}

function addTask (event) {
    event.preventDefault();
    listTask.prepend(createtask(taskInput));
    taskInput.value = '';
    taskInput.focus();
    if (listTask.children.length > 1) {
        listTask.querySelector('.task__empty').classList.add('task__empty_active');
    }
}

formSubmitTask.addEventListener('submit', addTask);

// удаление задачи
function deleteTask (event) {
    if(!event.target.classList.contains('task__delete')) {
        return;
    }
    event.target.closest('.task__item').remove();
    if (listTask.children.length === 2) {
        listTask.querySelector('.task__empty').classList.remove('task__empty_active');
    }
}

listTask.addEventListener('click', deleteTask);

// отмечаем выполненной
function doneTask (event) {
    if (!event.target.classList.contains('task__done')) {
        return;
    }
    event.target.parentElement.previousElementSibling.classList.add('task__text_done');
    
}

listTask.addEventListener('click', doneTask);