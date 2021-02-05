const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);

function addTodo(e){
    e.preventDefault();
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    if(todoInput.value === "" ){
        return alert("Please, write your To Do item.")
    }
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    saveLocal(todoInput.value);

    const completedButton = document.createElement("button");
    completedButton.innerHTML = "<i class='fas fa-check'></i>"
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = "<i class='fas fa-trash'></i>"
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);

    todoInput.value = "";
}

function deleteCheck(e){
    const item = e.target;
    if(item.classList[0] === "trash-btn"){
        const todo = item.parentElement;
        todo.classList.add("trash");
        removeLocal(todo);
        todo.addEventListener("transitionend",function(){
            todo.remove();
        })
    }
    if(item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed")
    }
}

function saveLocal(todo){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(todo => {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
    
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;

        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
    
        const completedButton = document.createElement("button");
        completedButton.innerHTML = "<i class='fas fa-check'></i>"
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
    
        const trashButton = document.createElement("button");
        trashButton.innerHTML = "<i class='fas fa-trash'></i>"
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
    
        todoList.appendChild(todoDiv);
    });
}

function removeLocal(todo){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}