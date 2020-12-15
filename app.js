const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector("#filter-todo");
let savedTodosLocally = !localStorage.getItem("savedTodosLocally") ?
                        [] :
                        JSON.parse(localStorage.getItem("savedTodosLocally"));

document.addEventListener("DOMContentLoaded", getLocalTodos);
todoButton.addEventListener("click", addTodo);
filterOption.addEventListener("change", filterTodo);

function deleteTask (evt) {
    evt.preventDefault();

    const todo = evt.target.closest(".todo");

    deleteTodoFromStorage(todo);
    todo.classList.add("falling");
    todo.addEventListener("transitionend", function() {
        todo.remove();
    });
}

function completeTask (evt) {
    evt.preventDefault();
    evt.target.closest(".todo").classList.toggle("completed");
}

function filterTodo(evt) {
    const todos = todoList.childNodes;

    todos.forEach(todo => {
        switch (evt.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";                        
                } else {
                    todo.style.display = "none";                        
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";                        
                } else {
                    todo.style.display = "none";                        
                }
                break;
        }
    });
}

function saveTodosLocally(todo) {
    savedTodosLocally.push(todo);
    localStorage.setItem("savedTodosLocally", JSON.stringify(savedTodosLocally));
}

function getLocalTodos() {
    savedTodosLocally.forEach(function(todo) {
        renderTodo(todo);
    });
}

function renderTodo(newTodo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const todoItem = document.createElement("li");
    todoItem.classList.add("todo-item");
    todoItem.textContent = newTodo;
    const completeButton = document.createElement("button");
    completeButton.innerHTML = "<i class=\"fas fa-check\"></i>";
    completeButton.classList.add("complete-btn");
     
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "<i class=\"fas fa-trash\"></i>";
    deleteButton.classList.add("delete-btn");

    todoDiv.appendChild(todoItem);
    todoDiv.appendChild(completeButton);
    todoDiv.appendChild(deleteButton);

    deleteButton.addEventListener("click", deleteTask);
    completeButton.addEventListener("click", completeTask);

    todoList.appendChild(todoDiv);
}

function addTodo (evt) {
    const todoValue = todoInput.value;

    evt.preventDefault();
    if (!todoValue) return;

    renderTodo(todoValue);
    saveTodosLocally(todoValue);
    todoInput.value = "";
}

function deleteTodoFromStorage(todo) {
    const todoIndex = todo.querySelector(".todo-item").textContent;
    savedTodosLocally.splice(savedTodosLocally.indexOf(todoIndex), 1);
    localStorage.setItem("savedTodosLocally", JSON.stringify(savedTodosLocally));
}