//Variable declaration section
addTask = document.getElementById('add-task');
inputTask = document.getElementById('input-task');
taskContainer = document.getElementById('task-container');

//Creating event listeners and creating and appending the lists

function addTaskFn() {
    let task = document.createElement('div');
    task.classList.add('task');

    let li = document.createElement('li');
    li.innerText = `${inputTask.value}`;
    task.appendChild(li);

    let checkButton = document.createElement("button");
    checkButton.innerHTML = '<i class = "fa-solid fa-check"></i>';
    checkButton.classList.add('checkTask');
    task.appendChild(checkButton);

    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fa-sharp fa-solid fa-trash"></i>';
    deleteButton.classList.add('deleteTask');
    task.appendChild(deleteButton);

    if (inputTask.value !== '') {
        taskContainer.appendChild(task);
        inputTask.value = '';
    }
    // Save the task to LocalStorage
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(li.innerText);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    deleteButton.addEventListener('click', e => {
        taskContainer = document.getElementById('task-container');
        taskContainer.removeChild(task);
        let index = tasks.indexOf(li.innerText);
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    });

    checkButton.addEventListener('click', function () {
        checkButton.parentElement.style.textDecoration = "line-through";
    });
}

document.addEventListener('DOMContentLoaded', function () {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(function (task) {
        let li = document.createElement("li");
        li.innerText = task;
        let div = document.createElement("div");
        div.classList.add("task");
        div.appendChild(li);
        let checkButton = document.createElement("button");
        checkButton.innerHTML = '<i class = "fa-solid fa-check"></i>';
        checkButton.classList.add('checkTask');
        div.appendChild(checkButton);
        let deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<i class="fa-sharp fa-solid fa-trash"></i>';
        deleteButton.classList.add('deleteTask');
        div.appendChild(deleteButton);
        taskContainer.appendChild(div);
        checkButton.addEventListener('click', function () {
            checkButton.parentElement.style.textDecoration = "line-through";
        });
        deleteButton.addEventListener('click', e => {
            taskContainer.removeChild(div);
            let index = tasks.indexOf(li.innerText);
            tasks.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(tasks));
        });
    });
});




addTask.addEventListener('click', addTaskFn);
inputTask.addEventListener('keydown', e => {
    if (e.keyCode === 13) addTaskFn();
});