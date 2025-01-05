const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const clearCompletedBtn = document.getElementById("clearCompletedBtn");

addTaskBtn.addEventListener("click", addTaskInArray);
clearCompletedBtn.addEventListener("click", clearCompletedTasks);

let tasks = [];

function checkEmptyField(input) {
  return input === "" ? false : input;
}

function addTaskInArray() {
  const taskText = taskInput.value.trim();
  if (checkEmptyField(taskText)) {
    tasks.push({ text: taskText, done: false, editing: false });
    taskInput.value = "";
    displayTasks();
  } else {
    alert("Empty field");
  }
}

function displayTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    taskList.appendChild(taskComponent(task, index));
  });
}

function taskComponent(task, index) {
  const taskComponent = document.createElement("div");
  taskComponent.classList.add("task-component");
  taskComponent.innerHTML = createTaskComponentHtml(task, index);
  taskComponent.addEventListener("click", (e) => {
    switch (e.target.nodeName) {
      case "P":
        toggleTaskStatut(index, "editing");
        break;
      case "INPUT":
        toggleTaskStatut(index, "done");
        break;
      default:
    }
  });
  return taskComponent;
}

function toggleTaskStatut(index, statut) {
  tasks[index][statut] = !tasks[index][statut];
  console.log(tasks[index]);
  return tasks[index][statut];
}

function editTask(index) {
  if (toggleTaskStatut(index, "editing")) {
    addInputForEdit(index);
    const editInput = document.getElementById(`edit-task-${index}`);
    const editBtn = document.getElementById(`btn-edit-${index}`);
    editBtn.addEventListener("click", () => {
      tasks[index].text = editInput.value;
      displayTasks();
    });
  } else {
    console.log("hello");
  }
}

function addInputForEdit(index) {
  const thisTask = document.getElementById(`text-task-${index}`);
  thisTask.parentNode.innerHTML += `<input type="text" id="edit-task-${index}" placeholder="Edit task"> <button id="btn-edit-${index}">Edit Task</button>`;
}

function clearCompletedTasks() {
  tasks = tasks.filter((task) => !task.done);
  displayTasks();
}

function createTaskComponentHtml(task, index) {
  const taskComponentHtml = `<input type="checkbox" id="task-${index}" ${
    task.done ? "checked" : ""
  }>
        <p id="text-task-${index}">${task.text}</p>
        `;
  return taskComponentHtml;
}
