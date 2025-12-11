const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
document.addEventListener("DOMContentLoaded", loadTasks);

function loadTasks() {
  const tasks = getTasksFromLocalStorage();
  tasks.forEach((task) => {
    addTaskToDOM(task);
  });
}

todoForm.addEventListener("submit", addTask);

function addTask(event) {
  event.preventDefault();

  const taskText = todoInput.value.trim();

  if (taskText !== "") {
    const task = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };

    addTaskToDOM(task);
    saveTaskToLocalStorage(task);

    todoInput.value = "";
  }
}
function addTaskToDOM(task) {
  const li = document.createElement("li");
  li.className = `todo-item${task.completed ? " completed" : ""}`;
  li.dataset.id = task.id;
  li.innerHTML = `
        <input type="checkbox" class="complete-checkbox" ${
          task.completed ? "checked" : ""
        }>
        <span class="task">${task.text}</span>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
    `;
  todoList.appendChild(li);
  attachEvenListener(li, task);
}
function attachEvenListener(li, task) {
  const deleteBtn = li.querySelector(".delete-btn");
  const editBtn = li.querySelector(".edit-btn");
  const checkBox = li.querySelector(".complete-checkbox");
  deleteBtn.addEventListener("click", function () {
    handleDelete(task.id, li);
  });
  editBtn.addEventListener("click", function () {
    handleEdit(task.id, li);
  });
  checkBox.addEventListener("change", function () {
    toggleTaskCompletion(task.id, li, checkBox.checked);
  });
}
function toggleTaskCompletion(taskId, li, isCompleted) {
  const tasks = getTasksFromLocalStorage();
  const task = tasks.find((task) => task.id == taskId);
  if (task) {
    task.completed = isCompleted;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    li.classList.toggle("completed", isCompleted);
  }
}
function handleDelete(id, li) {
  let tasks = getTasksFromLocalStorage();
  tasks = tasks.filter((task) => task.id != id);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  li.remove();
}
function handleEdit(taskId, li) {
  const textSpan = li.querySelector(".task");
  const updateTask = prompt("update task:", textSpan.textContent);
  if (updateTask !== null && updateTask.trim() !== "") {
    updatedTask(taskId, updateTask);
    textSpan.textContent = updateTask;
  }
}
function updatedTask(id, updateTask) {
  const tasks = getTasksFromLocalStorage();
  const task = tasks.find((task) => task.id == id);
  if (task) {
    task.text = updateTask;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}
function saveTaskToLocalStorage(task) {
  const allTasks = getTasksFromLocalStorage();
  allTasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(allTasks));
}
function getTasksFromLocalStorage() {
  const allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  return allTasks;
}
