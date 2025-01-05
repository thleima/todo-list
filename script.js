const input = document.querySelector("#taskInput");
const tasks_list = document.querySelector("#taskList");
const add_task_btn = document.querySelector("#addTaskBtn");
const clear_completed_btn = document.querySelector("#clearCompletedBtn");

let tasks_array = [];

add_task_btn.addEventListener("click", add_task_array);
clear_completed_btn.addEventListener("click", clear_completed_tasks);

function clear_completed_tasks() {
  tasks_array = tasks_array.filter((task) => !task.complete);
  display_tasks();
}

function add_task_array() {
  const text = input.value.trim();
  if (text !== "") {
    tasks_array.push({ text: text, complete: false });
    display_tasks();
  } else {
    alert("Empty Field");
  }
  input.value = "";
}

function display_tasks() {
  tasks_list.innerHTML = "";
  console.log("array :", tasks_array);
  tasks_array.forEach((element, id) => {
    create_task_component(element, id);
  });
}

function create_task_component(task, id) {
  const task_element = document.createElement("div");
  task_element.classList.add("task-component");
  task_element.setAttribute("id", `task-${id}`);

  const task_content = document.createElement("div");
  task_content.classList.add("content");

  task_element.appendChild(task_content);

  const task_input = document.createElement("input");
  task_input.classList.add("text");
  task_input.type = "text";
  task_input.value = task.text;
  task_input.setAttribute("readonly", "readonly");

  task_content.appendChild(task_input);

  const task_actions = document.createElement("div");
  task_actions.classList.add("actions");

  const task_complete_btn = document.createElement("button");
  task_complete_btn.classList.add("complete");
  task_complete_btn.innerText = "Complete";

  const task_edit_btn = document.createElement("button");
  task_edit_btn.classList.add("edit");
  task_edit_btn.innerText = "Edit";

  task_actions.appendChild(task_complete_btn);
  task_actions.appendChild(task_edit_btn);

  task_element.appendChild(task_actions);

  tasks_list.appendChild(task_element);

  if (tasks_array[id].complete) {
    task_input.classList.add("done");
    task_complete_btn.innerText = "Uncomplete";
    task_actions.removeChild(task_edit_btn);
  }

  task_edit_btn.addEventListener("click", (e) => {
    if (task_edit_btn.innerText.toLowerCase() === "edit") {
      task_edit_btn.innerText = "Save";
      task_input.removeAttribute("readonly");
      task_input.focus();
    } else {
      task_edit_btn.innerText = "Edit";
      task_input.setAttribute("readonly", "readonly");
      tasks_array[id].text = task_input.value;
    }
  });

  task_complete_btn.addEventListener("click", (e) => {
    if (task_complete_btn.innerText.toLowerCase() === "complete") {
      task_input.classList.add("done");
      task_complete_btn.innerText = "Uncomplete";
      tasks_array[id].complete = true;
      task_actions.removeChild(task_edit_btn);
    } else {
      task_input.classList.remove("done");
      task_complete_btn.innerText = "Complete";
      tasks_array[id].complete = false;
      task_actions.appendChild(task_edit_btn);
    }
  });
}
