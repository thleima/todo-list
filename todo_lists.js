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
    tasks.push({ text: taskText, done: false });
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
    switch (e.target.className.toLowerCase()) {
      case "edit":
        console.log("edit");
        break;
      case "complete":
        const actions = document.querySelector(".actions");
        const taskText = document.querySelector(`#task-${index}`);
        taskComponent.removeChild(actions);
        taskText.classList.add("done");
        toggleTaskStatut(index);
        break;
      default:
    }
  });
  return taskComponent;
}

function toggleTaskStatut(index) {
  tasks[index].done = !tasks[index].done;
}

function editTask(index) {}

// function editTask(index) {
//   if (toggleTaskStatut(index, "editing")) {
//     addInputForEdit(index);
//     const editInput = document.getElementById(`edit-task-${index}`);
//     const editBtn = document.getElementById(`btn-edit-${index}`);
//     editBtn.addEventListener("click", () => {
//       tasks[index].text = editInput.value;
//       displayTasks();
//     });
//   } else {
//     console.log("hello");
//   }
// }

function clearCompletedTasks() {
  tasks = tasks.filter((task) => !task.done);
  displayTasks();
}

function createTaskComponentHtml(task, index) {
  const taskComponentHtml = `
                <div class="content">
                 <input 
                    id="task-${index}"
                    type="text" 
                    class="text" 
                    value="${task.text}"
                    readonly>
                </div>
                <div class="actions">
                    <button class="edit">Edit</button>
                    <button class="complete">Complete</button>
                </div>
            `;
  return taskComponentHtml;
}
