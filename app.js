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
    const parent = todo.parentNode;
    const index = [...parent.children].indexOf(todo);

    deleteTodoFromStorage(todo, index);
    todo.classList.add("falling");
    todo.addEventListener("transitionend", function() {
        todo.remove();
    });
}

function completeTask (evt) {
    evt.preventDefault();

    const todo = evt.target.closest(".todo");
    const parent = todo.parentNode;
    const index = [...parent.children].indexOf(todo);

    todo.classList.toggle("completed");
    updateTodoStorage(todo, index);
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
    savedTodosLocally.push({"value" : todo});
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

    if (newTodo.status) {
        todoDiv.classList.add("completed");
    }
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
    const todo = todoInput.value;
    evt.preventDefault();

    if (!todo) {
        return
    };

    renderTodo(todo);
    saveTodosLocally(todo);
    todoInput.value = "";
}

function deleteTodoFromStorage(todo, index) {
    const todoIndex = todo.querySelector(".todo-item").textContent;
    savedTodosLocally.splice(index, 1);
    localStorage.setItem("savedTodosLocally", JSON.stringify(savedTodosLocally));
}

function updateTodoStorage(todo, index) {
    if (todo.classList.contains("completed")) {
        savedTodosLocally[index].status = "completed";
        console.log("completed", savedTodosLocally);
    } else {
        savedTodosLocally[index].status = "";
        console.log("not completed", savedTodosLocally);
    }

    localStorage.setItem("savedTodosLocally", JSON.stringify(savedTodosLocally));

}