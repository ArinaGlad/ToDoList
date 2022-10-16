const taskTemplate = document.querySelector('#task');
const taskInput = document.querySelector('input[name="task"]');
const buttonAdd = document.querySelector('.form-task__button');
const sectionTask = document.querySelector('.task');
const formSubmitTask = document.querySelector('.form-task');


function addTask (event) {
    event.preventDefault();
    const taskElement = taskTemplate.querySelector('.task__item').cloneNode(true);
    console.log(taskElement);
    taskElement.querySelector('.task__text').textContent = taskInput.value;
    sectionTask.prepend(taskElement);
}

formSubmitTask.addEventListener('submit', addTask);