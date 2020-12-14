const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector("#filter-todo");

todoButton.addEventListener("click", addTodo);
filterOption.addEventListener("change", filterTodo);

function deleteTask (evt) {
    evt.preventDefault();
    const todo = evt.target.closest(".todo");
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

function addTodo (evt) {
    evt.preventDefault();
    if (!todoInput.value) return;
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo = document.createElement("li");
    newTodo.classList.add("todo-item");
    newTodo.textContent = todoInput.value;
    const completeButton = document.createElement("button");
    completeButton.innerHTML = "<i class=\"fas fa-check\"></i>";
    completeButton.classList.add("complete-btn");
     
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "<i class=\"fas fa-trash\"></i>";
    deleteButton.classList.add("delete-btn");

    todoDiv.appendChild(newTodo);
    todoDiv.appendChild(completeButton);
    todoDiv.appendChild(deleteButton);

    todoList.appendChild(todoDiv);
    todoInput.value = "";

    deleteButton.addEventListener("click", deleteTask);
    completeButton.addEventListener("click", completeTask);

}