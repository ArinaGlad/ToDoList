const taskTemplate = document.querySelector('#task').content;
const taskInput = document.querySelector('input[name="task"]');
const buttonAdd = document.querySelector('.form-task__button');
const listTask = document.querySelector('.task__list');
const formSubmitTask = document.querySelector('.form-task');
const taskText = document.querySelector('.task__text');
const subtitle = document.querySelector('.header__subtitle');
const today = document.querySelector('.date');

let tasks = [];

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    
    tasks.forEach((item) => {
    
        const taskElement = taskTemplate.querySelector('.task__item').cloneNode(true);
        const taskText = taskElement.querySelector('.task__text');
        taskText.textContent = item.text;
        taskElement.id = item.id;
        if (item.done) {
            taskText.classList.add('task__text_done');
        }
        listTask.prepend(taskElement);
        
    });
}

subtitle.textContent = `Задач в списке: ${tasks.length}`;

let date = new Date();

let options = {
  /* era: 'long', */
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long',
  /* timezone: 'UTC',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric' */
};

today.textContent = date.toLocaleString("ru", options);

addEmptyItem();

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

    saveToLocalStorage();

    taskElement.querySelector('.task__text').textContent = taskInput.value;
    taskElement.id = newTask.id;

    // добавляем класс что задача сделана
    if (newTask.done) {
        taskText.classList.add('task__text_done');
    }
    subtitle.textContent = `Осталось задач: ${tasks.length}`;
    return taskElement;
}

function addTask (event) {
    event.preventDefault();
    listTask.prepend(createtask(taskInput));
    taskInput.value = '';
    taskInput.focus();
    addEmptyItem();
}

formSubmitTask.addEventListener('submit', addTask);

// удаление задачи
function deleteTask (event) {
    if(!event.target.classList.contains('task__delete-button')) {
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

    saveToLocalStorage();

    addEmptyItem();

    subtitle.textContent = `Осталось задач: ${tasks.length}`;
}

listTask.addEventListener('click', deleteTask);

// отмечаем выполненной
function doneTask (event) {
    if (!event.target.classList.contains('task__done-button')) {
        return;
    }
    const closestItem = event.target.closest('.task__item');
    const task = tasks.find((task) => {
        if (task.id == closestItem.id) {
            return true;
        }
    });

    task.done = !task.done;

    saveToLocalStorage();

    closestItem.querySelector('.task__text').classList.toggle('task__text_done');
}

listTask.addEventListener('click', doneTask);

function addEmptyItem() {
    if (tasks.length === 0) {
        const emptyItemHTML = `<li class="task__empty">
                Список дел пуст
            </li>`;
        listTask.insertAdjacentHTML('afterbegin', emptyItemHTML);
    }

    if (tasks.length > 0) {
        document.querySelector('.task__empty') ? document.querySelector('.task__empty').remove() : null;
    }
}

function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}