const add_button = document.querySelector("#add-button");

const assignButtonsFinish = (button) => {
    button.addEventListener("click", function() {
        finishTask((button.parentNode).parentNode);
    });
    return button;
}

const assignButtonsDrop = (button) => {
    button.addEventListener("click", function() {
        removeTask((button.parentNode).parentNode);
    });
    return button;
}

const clearInput = () => {
    const input_todo = document.querySelector("#input-todo");
    input_todo.value = "";
}

const createTask = (task) => {
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
    btn_finish.classList.add("btn_item");
    btn_finish.classList.add("btn_finish");
    btn_drop.classList.add("btn_item");
    btn_drop.classList.add("btn_drop");
    div_buttons.classList = "div_buttons";
    p_content.classList = "p_item";

    p_content.appendChild(document.createTextNode(task));
    div_content.appendChild(p_content);
    div_content.appendChild(div_buttons)
    li_content.appendChild(div_content);

    li_content = styleList(li_content);

    localStorage.setItem(task, li_content.innerHTML);

    return li_content;
}

const addOnList = (task) => {
    var list_todo = document.querySelector("#list-todo");
    var element = createTask(task);
    list_todo.appendChild(element);
}

const styleList = (element) => {
    element.style.backgroundColor = "#A78295";
    element.style.color = "white";
    element.style.width = "25em";
    return element;
}

const removeTask = (task) => {
    task.closest('.item').remove();
    const p = task.querySelector("p");
    localStorage.removeItem(p.innerText);
}

const finishTask = (task) => {
    task.classList.toggle('finished');
    const key = task.querySelector("p");
    updateItemLocalStorage(key.innerText, task);
}

const allowTask = (task) => {
    if(localStorage.length){
        for(let i = 0; i < localStorage.length; i++) {
            if(task === localStorage.key(i)){
                return true;
            }
        }
    }
    return false;
}

const deleteItemLocalStorage = (item) => {
    localStorage.removeItem(item);
}

const updateItemLocalStorage = (item, value) => {
    if(localStorage.length){
        for(let i = 0; i < localStorage.length; i++){
            if(item === localStorage.key(i)){
                localStorage.setItem(item, value.outerHTML);
                break;
            }
        }
    }
}

const setLocalStorage = () => {
    const ul = document.querySelector("#list-todo");
    if(localStorage.length){
        for (let i = 0; i < localStorage.length; i++) {
            if(localStorage.key(i)){
                const value = localStorage.getItem(localStorage.key(i));
                let li = document.createElement("li");
                li.classList.add("item");
                li.innerHTML = value;
                assignButtonsFinish(li.querySelector(".btn_finish"));
                assignButtonsDrop(li.querySelector(".btn_drop"));
                li = styleList(li);
                ul.appendChild(li);
            }
        }
    }
}

add_button.addEventListener("click", function(){
    let input_todo = document.querySelector("#input-todo").value;
    input_todo = input_todo.trim();

    if(input_todo.length <= 30) {
        if(input_todo === ""){
            alert("Por favor, insira corretamente a tarefa na caixa de texto!");
            clearInput();
        }else{
            if(!allowTask(input_todo)){
                addOnList(input_todo);
            }else{
                alert("Tarefa já adicionada!");
                clearInput();
            }
        }
    }else{
        alert("Tarefa com o nome muito grande! Por favor, diminua o nome da sua nova tarefa.");
        clearInput();
    }
});

setLocalStorage();