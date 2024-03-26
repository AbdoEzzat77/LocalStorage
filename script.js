let input = document.querySelector('.input');
let submit = document.querySelector('.add');
let tasksDiv = document.querySelector('.tasks');
let arrayofTasks = [];
if (localStorage.getItem('tasks')) {
    arrayofTasks = JSON.parse(localStorage.getItem('tasks'));
}
submit.onclick = function () {
    if (input.value !== '') {
        addTaskToArray(input.value);
        input.value = '';
    }
};
function addTaskToArray(taskText) {
    const task = {
        id: Date.now(),
        text: taskText,
        isCompleted: false
    };
    arrayofTasks.push(task);
    addElementToDOM(arrayofTasks);
    addElementToLocalStorage(arrayofTasks);
}
function addElementToDOM(arrayofTasks) {
    tasksDiv.innerHTML = '';
    arrayofTasks.forEach((task) => {
        let taskDiv = document.createElement('div');
        taskDiv.classList.add('task');
        let taskText = document.createElement('p');
        taskText.textContent = task.text;
        taskText.classList.add('task-text');
        taskDiv.appendChild(taskText);
        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete');
        deleteButton.onclick = function () {
            deleteTask(task.id);
            deleteElementFromLocalStorage(task.id);
        }
        deleteButton.style.backgroundColor = 'red';
        deleteButton.style.color = 'white';
        deleteButton.style.border = 'none';
        deleteButton.style.padding = '5px';
        deleteButton.style.margin = '5px';
        deleteButton.style.cursor = 'pointer';
        deleteButton.style.fontWeight = 'bold';
        deleteButton.style.borderRadius = '5px';
        taskDiv.appendChild(deleteButton);
        tasksDiv.appendChild(taskDiv);
        if (task.isCompleted) {
            taskDiv.className = 'task done';
        }
    });
}
function deleteTask(id) {
    arrayofTasks = arrayofTasks.filter((task) => task.id !== id);
    addElementToDOM(arrayofTasks);
}
function addElementToLocalStorage(arrayofTasks) {
    localStorage.setItem('tasks', JSON.stringify(arrayofTasks));
}
function deleteElementFromLocalStorage(id) {
    arrayofTasks = arrayofTasks.filter((task) => task.id !== id);
    addElementToLocalStorage(arrayofTasks);
}
tasksDiv.addEventListener('click', (e) => {
    if (e.target.classList.contains('task')) {
        e.target.classList.toggle('done');
        toggleStatus(e.target.getAttribute('data-id'));
    }
});
function toggleStatus(id) {
    for (let i = 0; i < arrayofTasks.length; i++) {
        if (arrayofTasks[i].id == id) {
            arrayofTasks[i].isCompleted == false ? arrayofTasks[i].isCompleted = true : arrayofTasks[i].isCompleted = false;
        }
    } 
    addElementToLoaclStorage(arrayofTasks);
}
function addElementToLoaclStorage(arrayofTasks) {
    localStorage.setItem('tasks', JSON.stringify(arrayofTasks));
}
function getTasksFromLocalStorage() {
    const tasks = localStorage.getItem('tasks');
    if (tasks) {
        Data = JSON.parse(tasks);
        addElementToDOM(Data);
    }
}
getTasksFromLocalStorage();

