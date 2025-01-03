const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const clearCompletedBtn = document.getElementById("clearCompletedBtn");

addTaskBtn.addEventListener("click", addTask);
clearCompletedBtn.addEventListener("click", clearCompletedTasks);

let tasks = [];

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
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
  taskComponent.innerHTML = `<input type="checkbox" id="task-${index}" ${
    task.done ? "checked" : ""
  }>
        <label for="task-${index}">${task.text}</label>
        `;
  taskComponent
    .querySelector("input")
    .addEventListener("change", () => toggleTask(index));
  return taskComponent;
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  console.log(tasks[index]);
  // displayTasks();
}

function clearCompletedTasks() {
  tasks = tasks.filter((task) => !task.done);
  displayTasks();
}
