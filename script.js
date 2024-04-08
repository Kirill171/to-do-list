class ToDo {
    static counter = 0;

    constructor(text) {
        this.text = text;
    }

    addTask() {
        ToDo.counter++;
        let task = 'task' + ' ' + ToDo.counter;
        let toDoList = document.querySelector(".list");
        let li = document.createElement('li');
        li.addEventListener('click', (event) => {
            event.stopPropagation();
            li.classList.toggle('checked');
            checkbox.checked = !checkbox.checked;
        })

        let checkbox = document.createElement("input");
        checkbox.type = 'checkbox';
        checkbox.id = task;
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                checkbox.checked = false;
            } else {
                checkbox.checked = true;
            }
        });

        let label = document.createElement("label");
        label.textContent = this.text;
        label.setAttribute('for', task);
        label.addEventListener('click', (event) => {
            event.stopPropagation();
        })

        let btn = document.createElement("button");
        btn.className = 'deleteTaskBtn';
        btn.textContent = 'X';
        btn.addEventListener("click", deleteTaskHandler);

        li.append(checkbox);
        li.append(label);
        li.append(btn);
        toDoList.append(li);
    }
}

let addTaskBtn = document.querySelector(".addTaskBtn");
let startMassage = document.querySelector(".start-massage");
let inputField = document.querySelector("#to-do");
let deleteTaskBtn = document.querySelectorAll(".deleteTaskBtn");

addTaskBtn.addEventListener('click', addTaskHandler);

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

function deleteTaskHandler(e) { // Кнопка удаления задач
    this.parentNode.remove();
    ToDo.counter--;
    if (ToDo.counter == 0) startMassage.hidden = false;
}