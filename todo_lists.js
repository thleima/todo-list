const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const clearCompletedBtn = document.getElementById("clearCompletedBtn");

addTaskBtn.addEventListener("click", addTask);
clearCompletedBtn.addEventListener("click", clearCompletedTasks);

let tasks = [];

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("Empty field");
  } else {
    tasks.push({ text: taskText, done: false });
    taskInput.value = "";
    displayTasks();
  }
}

function displayTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    taskList.appendChild(createTaskComponent(task, index));
  });
}

function createTaskComponent(task, index) {
  const taskComponent = document.createElement("div");
  taskComponent.classList.add("task-component");
  taskComponent.innerHTML = taskComponentHtml(task, index);
  taskComponent
    .querySelector("input")
    .addEventListener("change", () => toggleTaskStatut(index));
  taskComponent
    .querySelector("label")
    .addEventListener("click", () => editTask(index));
  return taskComponent;
}

function toggleTaskStatut(index) {
  tasks[index].done = !tasks[index].done;
  console.log(tasks[index]);
}

function addInputForEdit(index) {
  const thisTask = document.getElementById(`text-task-${index}`);
  thisTask.parentNode.innerHTML += `<input type="text" id="edit-task-${index}" placeholder="Edit task"> <button id="btn-edit-${index}">Edit Task</button>`;
}

function editTask(index) {
  addInputForEdit(index);
  const editInput = document.getElementById(`edit-task-${index}`);
  const editBtn = document.getElementById(`btn-edit-${index}`);
  editBtn.addEventListener("click", () => {
    tasks[index].text = editInput.value;
    displayTasks();
  });
}

function clearCompletedTasks() {
  tasks = tasks.filter((task) => !task.done);
  displayTasks();
}

function taskComponentHtml(task, index) {
  const taskComponentHtml = `<input type="checkbox" id="task-${index}" ${
    task.done ? "checked" : ""
  }>
        <label id="text-task-${index}" for="task-${index}">${task.text}</label>
        `;
  return taskComponentHtml;
}
