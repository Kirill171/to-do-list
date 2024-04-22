class ToDo {
    static counter = ToDo.counter || 0;

    constructor(text, checked = false) {
        this.text = text;
        this.checked = checked;
    }

    addTask() {
        let obj = {}
        obj.id = ToDo.counter;
        let task = 'task' + ' ' + ToDo.counter;   // создание task с динамическим id

        let toDoList = document.querySelector(".list");  // поиск ul
        let li = document.createElement('li');      // создание li
        li.dataset.taskId = task;
        li.addEventListener('click', (event) => {    // создание события по клику на li
            event.stopPropagation();
            if (!event.target.matches('.deleteTaskBtn')) {
                li.classList.toggle('checked');
                checkbox.checked = !checkbox.checked;
        
                obj.checked = checkbox.checked;
                localStorage.setItem(task, JSON.stringify(obj));
            }
        });


        let checkbox = document.createElement("input");   // создание чекбокса
        checkbox.className = 'checkbox';
        checkbox.type = 'checkbox';
        checkbox.id = task;
        if (this.checked) {  // для сохранения состояния галочки после перезагрузки страницы
            li.classList.toggle('checked');
            checkbox.checked = true;
        }
        checkbox.addEventListener('change', (event) => { // добавление переключение чекбокса
            if (checkbox.checked) {
                checkbox.checked = false;
            } else {
                checkbox.checked = true;
            }
            
            obj.checked = checkbox.checked;
            localStorage.setItem(task, JSON.stringify(obj));
        });


        let label = document.createElement("label");   // создание текста в инпут поле
        label.textContent = this.text;
        label.setAttribute('for', task);    // связывание инпут поля с чекбоксом
        label.addEventListener('click', (event) => {
            event.stopPropagation();
        });


        let btn = document.createElement("button");    // создание крестика для удаления таски
        btn.className = 'deleteTaskBtn';
        btn.addEventListener("click", deleteTaskHandler);


        let btnChangeTask = document.createElement('button'); // создание изменения задачи
        btnChangeTask.className = 'changeTaskBtn';
        btnChangeTask.addEventListener('click', changeTaskHandler);


        li.append(checkbox);
        li.append(label);
        li.append(btn);
        li.append(btnChangeTask);
        toDoList.append(li);

        obj.text = this.text;
        if (!localStorage.getItem(task)) {
            localStorage.setItem(task, JSON.stringify(obj));
        }
        ToDo.counter++;
    }
}

let addTaskBtn = document.querySelector(".addTaskBtn");
let startMassage = document.querySelector(".start-massage");
let inputField = document.querySelector("#to-do");
let deleteTaskBtn = document.querySelectorAll(".deleteTaskBtn");

addTaskBtn.addEventListener('click', addTaskHandler);

document.addEventListener('DOMContentLoaded', () => {
    for (let key in localStorage) {
        if (!localStorage.hasOwnProperty(key)) {
            continue;
        }
        if (key) {
            if (!startMassage.hidden) startMassage.hidden = true; // прятать стандартный текст

            let json = localStorage.getItem(key);
            let obj = JSON.parse(json);
            let text = obj.text;
            let checked = obj.checked;
            ToDo.counter = obj.id;
            
            let toDo = new ToDo(text, checked);  // создание экземляра класса
            toDo.addTask(); // вызов метода класса с отрисовкой на страницу
        }
    }
});

inputField.addEventListener('keydown', (e) => { // Добавление задач на Enter
    if (e.code == 'Enter') addTaskHandler();
});

function addTaskHandler() { // Кнопка добавления задач
    let text = inputField.value;
    if (text) {
        if (!startMassage.hidden) startMassage.hidden = true;

        let toDo = new ToDo(text);
        toDo.addTask();
        inputField.value = '';
    } else {
        alert("Сначала введите текст задачи.");
    }
}

function changeTaskHandler(event) {
    event.stopPropagation();
    let li = this.parentNode;
    let label = li.querySelector('label');
    let currentText = label.textContent;
    
    let newText = prompt("Введите новый текст задачи:", currentText);
    if (newText !== null) {
        label.textContent = newText;

        let taskId = li.dataset.taskId;
        let obj = JSON.parse(localStorage.getItem(taskId));
        obj.text = newText;
        localStorage.setItem(taskId, JSON.stringify(obj));
    }
}

function deleteTaskHandler() { // Кнопка удаления задач
    let taskId = this.parentNode.dataset.taskId; // Получаем атрибут data-task-id
    localStorage.removeItem(taskId);  // Удаляем задачу из localStorage
    this.parentNode.remove();
    ToDo.counter--;
    if (ToDo.counter == 0) startMassage.hidden = false;
}