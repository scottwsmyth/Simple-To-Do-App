// UI elements

const form = document.querySelector(".taskForm");
const taskList = document.querySelector(".list-group-flush");
const clearBtn = document.querySelector("#btn2");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#newTask");

loadEventListeners();

function loadEventListeners() {
    form.addEventListener("submit", addTask);

    //Add listener to delete button -- using delegation due to dynamic element
    taskList.addEventListener("click", deleteTask);

}

function deleteTask(e) {
    console.log(e.target.parentElement.parentElement.className); //We added a div to it so we need to go up three levels

    if (e.target.parentElement.classList.contains("delete-item")) {
        e.target.parentElement.parentElement.parentElement.remove();
    }

}

function addTask(e) {

    e.preventDefault();

    if (taskInput.value === '') {
        alert("Enter a task.");
    } else {
        // Create li element 
        const li = document.createElement("li");

        const text = document.createTextNode(taskInput.value);

        const link = document.createElement("a");

        const div = document.createElement("div");

        div.className = "right";

        link.className = "delete-item secondary-content";

        link.href = "#";

        link.innerHTML = "<i class='fa fa-remove' aria-hidden='true'></i>";

        div.appendChild(link);

        li.appendChild(text);
        li.appendChild(div);

        li.className = "list-group-item";

        taskList.appendChild(li);

        taskInput.value = '';

    }

}