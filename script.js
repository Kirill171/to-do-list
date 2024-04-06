class ToDo {
    constructor(text) {
        this.text = text;
    }

    addTask(){
        let toDoList = document.querySelector(".list");
        let li = document.createElement('li');
        // text.textContent = this.text;
        
        let checkbox = document.createElement("input");
        checkbox.type = 'checkbox';
        checkbox.id = 'task';
        
        let label = document.createElement("label");
        label.textContent = this.text;
        label.setAttribute('for', 'task');

        li.append(checkbox);
        li.append(label);
        // <input type="checkbox" name="str" id="str">
        // <label for="str">teasda</label>
        toDoList.append(li);
    }
}

let btn = document.querySelector(".button");
let startMassage = document.querySelector(".start-massage");
let inputField  = document.querySelector("#to-do");

btn.addEventListener('click', addTaskHandler);

inputField.addEventListener('keydown', (e) => {
    if(e.code == 'Enter') addTaskHandler();
});

function addTaskHandler() {
    let text = inputField.value;
    if (text) {
        if(!startMassage.hidden) startMassage.hidden = true;

        let toDo = new ToDo(text);
        toDo.addTask();
        inputField.value = '';
    } else {
        alert("Сначала введите текст задачи.");
    }
}