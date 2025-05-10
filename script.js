let taskList = document.getElementById("taskList");

document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
  let taskInput = document.getElementById("taskInput");
  let task = taskInput.value.trim();

  if (task === "") return;

  createTaskElement(task);
  saveTask(task);
  taskInput.value = "";
}

function createTaskElement(task, completed = false) {
  let li = document.createElement("li");
  if (completed) li.classList.add("completed");

  li.textContent = task;

  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    updateTasks();
  });

  let deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.onclick = () => {
    li.remove();
    updateTasks();
  };

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

function saveTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: task, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(t => createTaskElement(t.text, t.completed));
}

function updateTasks() {
  let items = taskList.querySelectorAll("li");
  let tasks = [];

  items.forEach(li => {
    let taskText = li.childNodes[0].nodeValue;
    let completed = li.classList.contains("completed");
    tasks.push({ text: taskText, completed: completed });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}
