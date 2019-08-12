// UI elements

const form = document.querySelector(".taskForm");
const taskList = document.querySelector(".list-group-flush");
const clearBtn = document.querySelector("#btn2");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#newTask");

loadEventListeners();

function loadEventListeners() {

    // Submit event
    form.addEventListener("submit", addTask);

    //Add listener to delete button -- using delegation due to dynamic element
    taskList.addEventListener("click", deleteTask);

    //Clear button event
    clearBtn.addEventListener("click", clearTasks);

    // Filter tasks event
    filter.addEventListener("keyup", filterTasks);

    // DOM load event

    document.addEventListener("DOMContentLoaded", getTasks);
}

function filterTasks(e) {

    const text = e.target.value.toLowerCase();

    console.log(e.target.value);

    //Can use a foreach here because queryselectorall returns a node list
    document.querySelectorAll(".list-group-item").forEach(
        function (task) {
            const item = task.firstChild.textContent;
            if (item.toLowerCase().indexOf(text) != -1) {
                task.style.display = "block";
            } else {
                task.style.display = "none";
            }
        }
    );
}

function clearTasks() {
    taskList.innerHTML = '';
}

function deleteTask(e) {

    tasks = JSON.parse(localStorage.getItem("tasks")); //If it does exists then we parse the JSON array back to normal and set it to tasksvariable

    for (let i = 0; i < tasks.length; i++) {

        if (tasks[i] === e.target.parentElement.parentElement.parentElement.textContent) {
            tasks.splice(i, 1);
        }
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));

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

        storeTaskInLocalStorage(taskInput.value); //After the value is added we save it to the local storage

        taskInput.value = '';

        // LOCAL STORAGE - Part of JS, no need for 3rd party plugin


    }
}

function storeTaskInLocalStorage(task) {

    // Initializing tasks variable

    let tasks;

    // Check local storage for key -> tasks

    if (localStorage.getItem("tasks") === null) {
        tasks = []; //If it doesn't exist we create a new array
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks")); //If it does exists then we parse the JSON array back to normal and set it to tasksvariable
    }

    tasks.push(task); //Here we push the new task into the tasks array

    localStorage.setItem("tasks", JSON.stringify(tasks)); //Convert tasks array back to JSON and add it to local storage

}

// Get tasks from LS

function getTasks() {

    // Again below we are just grabbing the tasks array from LS

    let tasks;

    if (localStorage.getItem("tasks") === null) {
        tasks = []; //If it doesn't exist we create a new array
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks")); //If it does exists then we parse the JSON array back to normal and set it to tasksvariable
    }

    //For each task we are going to make a list item again and add it to the ul

    tasks.forEach(function (task) {

        console.log(task);

        const li = document.createElement("li");

        const text = document.createTextNode(task);

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

    });

}



