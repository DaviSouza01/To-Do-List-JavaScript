var add_button = document.querySelector("#add-button");

add_button.addEventListener("click", function(){
    var input_todo = document.querySelector("#input-todo").value;
    input_todo = input_todo.trim();

    if(input_todo.length <= 30) {
        if(input_todo === ""){
            alert("Por favor, insira corretamente a tarefa na caixa de texto!");
            clearInput();
        }else{
            addOnList(input_todo);
        }
    }else{
        alert("Tarefa com o nome muito grande! Por favor, diminua o nome da sua nova tarefa.");
        clearInput();
    }
});

let assignButtonsFinish = (button) => {
    button.addEventListener("click", function() {
        finishTask((button.parentNode).parentNode);
    });
    return button;
}

let assignButtonsDrop = (button) => {
    button.addEventListener("click", function() {
        removeTask((button.parentNode).parentNode);
    });
    return button;
}

let clearInput = () => {
    let input_todo = document.querySelector("#input-todo");
    input_todo.value = "";
}

let createTask = (task) => {
    clearInput();
    let li_content = document.createElement('li');
    let div_content = document.createElement('div');
    let p_content = document.createElement('p');
    let btn_finish = document.createElement('button');
    let btn_drop = document.createElement('button');
    let div_buttons = document.createElement('div');

    btn_finish.appendChild(document.createTextNode("✔️"));
    btn_drop.appendChild(document.createTextNode("❌"));

    btn_finish = assignButtonsFinish(btn_finish);
    btn_drop = assignButtonsDrop(btn_drop);

    div_buttons.appendChild(btn_finish);
    div_buttons.appendChild(btn_drop);

    li_content.classList = "item";
    div_content.classList = "div_item";
    btn_finish.classList = "btn_item";
    btn_finish.classList = "btn_finish";
    btn_drop.classList = "btn_item";
    btn_drop.classList = "btn_drop";
    div_buttons.classList = "div_buttons";
    p_content.classList = "p_item";

    p_content.appendChild(document.createTextNode(task));
    div_content.appendChild(p_content);
    div_content.appendChild(div_buttons)
    li_content.appendChild(div_content);

    li_content = styleList(li_content);
    return li_content;
}

let addOnList = (task) => {
    var list_todo = document.querySelector("#list-todo");
    var element = createTask(task);
    list_todo.appendChild(element);
}

let styleList = (element) => {
    element.style.backgroundColor = "#A78295";
    element.style.color = "white";
    element.style.width = "25em";
    return element;
}

let removeTask = (task) => {
    task.closest('.item').remove();
}

let finishTask = (task) => {
    task.classList.toggle('finished');
}