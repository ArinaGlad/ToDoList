const taskTemplate = document.querySelector('#task').content;
const taskInput = document.querySelector('input[name="task"]');
const buttonAdd = document.querySelector('.form-task__button');
const listTask = document.querySelector('.task__list');
const formSubmitTask = document.querySelector('.form-task');
const taskText = document.querySelector('.task__text');

let tasks = [];

function addDoneClass (array) {
    if (array.done) {
        taskText.classList.add('task__text_done');
    }
}

// добавление задачи
function createtask () {
    const taskElement = taskTemplate.querySelector('.task__item').cloneNode(true);
    const taskText = taskElement.querySelector('.task__text');

    const newTask = {
        id : "id" + Math.random().toString(16).slice(2),
        text: taskInput.value,
        done: false,
    };

    tasks.push(newTask);

    taskElement.querySelector('.task__text').textContent = taskInput.value;
    taskElement.id = newTask.id;

    // добавляем класс что задача сделана
    if (newTask.done) {
        taskText.classList.add('task__text_done');
    }
    

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

    const closestItem = event.target.closest('.task__item');
    closestItem.remove();

    const index = tasks.findIndex((item) => {
        if (item.id == closestItem.id) {
            return true;
        }
    });

    // удаляем из массива
    tasks.splice(index, 1);

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