let form = document.querySelector(".form");
let input = document.querySelector(".input-task");
let submit = document.querySelector(".submit");
let tasksDiv = document.querySelector(".tasks");
let deleteAll = document.querySelector(".delete-all");

// Empty Array To Store The Tasks
let arrayOfTasks = [];

// Check If Theres Tasks In Local Storage
if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}
// Trigger Get Data From Local Storage Function
getDataFromLocalStorage();

// Add Task
submit.onclick = function () {
  if (input.value !== "") {
    addTasksToArray(input.value); // Add Task To Array Of Tasks
    input.value = ""; // Empty Input Feild
  }
};

// Click On Task Element
tasksDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    // Remove Task From Local Storage
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
    // Remove Task From Page
    e.target.parentElement.remove();
  }
  // Task Element
  if (e.target.classList.contains("task")) {
    // Toggle Completed Boolean For The Task
    toggleCompletedTask(e.target.getAttribute("data-id"));
    // Toggle Done Class
    e.target.classList.toggle("done");
  }
});

// Function That Make A Task And Push It Into Array
const addTasksToArray = function (taskText) {
  // Task Data
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  // Push Task To Array
  arrayOfTasks.push(task);
  // Add Tasks To Page
  addTasksToPageFrom(arrayOfTasks);
  // Add Tasks To Local Storage
  addTasksToLocalStorage(arrayOfTasks);
};

function addTasksToPageFrom(arrayOfTasks) {
  // Empty Tasks Div
  tasksDiv.innerHTML = "";
  // Looping On Array Of Tasks
  arrayOfTasks.forEach((task) => {
    // Creat Main Div
    let div = document.createElement("div");
    div.className = "task";
    if (task.completed) {
      div.className = "task done";
    }
    div.setAttribute("data-id", task.id);
    let h2 = document.createElement("h2");
    div.appendChild(h2.appendChild(document.createTextNode(task.title)));
    // Creat Delete Button
    let delBtn = document.createElement("button");
    delBtn.className = "delete";
    let delIcon = document.createElement("i");
    delIcon.className = "fa-solid fa-trash";
    delBtn.appendChild(delIcon);
    // Append Button To Main Div
    div.appendChild(delBtn);
    // Add Task Div To Tasks Container
    tasksDiv.appendChild(div);
  });
}

function addTasksToLocalStorage(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let task = JSON.parse(data);
    addTasksToPageFrom(task);
  }
}

function deleteTaskWith(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addTasksToLocalStorage(arrayOfTasks);
}

function toggleCompletedTask(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed == false
        ? (arrayOfTasks[i].completed = true)
        : (arrayOfTasks[i].completed = false);
    }
  }
  addTasksToLocalStorage(arrayOfTasks);
}


deleteAll.onclick = function () {
    tasksDiv.innerHTML = "";
    window.localStorage.removeItem("tasks");
};
