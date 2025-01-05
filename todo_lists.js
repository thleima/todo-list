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
  const editBtn = taskComponent.querySelector(".edit");
  const completeBtn = taskComponent.querySelector(".complete");
  const taskText = taskComponent.querySelector(`#task-${index}`);

  editBtn.addEventListener("click", (e) => {
    console.log("edit");
  });

  completeBtn.addEventListener("click", (e) => {
    const actions = document.querySelector(".actions");
    taskComponent.removeChild(actions);
    taskText.classList.add("done");
    toggleTaskStatut(index);
  });

  // taskComponent.addEventListener("click", (e) => {
  //   switch (e.target.className.toLowerCase()) {
  //     case "edit":
  //       const editBtn = document.querySelector(".edit");
  //       editBtn.innerText = "Save";
  //       const taskText = document.querySelector(`#task-${index}`);
  //       taskText.removeAttribute("readonly");
  //       taskText.focus();
  //       if ((editBtn.innerText = "Save")) {
  //         editBtn.addEventListener("click", () => {
  //           tasks[index].taskText = taskText.value;
  //           taskText.setAttribute("readonly", "readonly");
  //           editBtn.innerText = "Edit";
  //           displayTasks();
  //         });
  //       }

  //       break;
  //     default:
  //   }
  // });
  return taskComponent;
}

function toggleTaskStatut(index) {
  tasks[index].done = !tasks[index].done;
  console.log(tasks[index]);
}

function editTask(index) {}

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
                    class="text ${task.done ? "done" : ""}" 
                    value="${task.text}"
                    readonly>
                </div>
                ${task.done ? actionsComponent() : ""}

            `;
  return taskComponentHtml;
}

function actionsComponent() {
  const actionsComponent = `                <div class="actions">
                    <button class="edit">Edit</button>
                    <button class="complete">Complete</button>
                </div>`;
  return actionsComponent;
}
