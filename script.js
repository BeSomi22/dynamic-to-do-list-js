document.addEventListener("DOMContentLoaded", () => {
  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  // Load tasks from localStorage
  loadTasks();

  // Function to add a task
  function addTask(taskText = null, save = true) {
    const text = taskText ?? taskInput.value.trim();
    if (text === "") {
      alert("Please enter a task");
      return;
    }

    const li = document.createElement("li");
    li.textContent = text;
    li.classList.add("task-item"); // <-- using classList.add

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("remove-btn"); // <-- using classList.add

    removeBtn.onclick = () => {
      taskList.removeChild(li);
      removeFromLocalStorage(text);
    };

    li.appendChild(removeBtn);
    taskList.appendChild(li);

    if (!taskText) {
      taskInput.value = "";
    }

    if (save) {
      saveToLocalStorage(text);
    }
  }

  // Save task to localStorage
  function saveToLocalStorage(task) {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Remove task from localStorage
  function removeFromLocalStorage(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks = tasks.filter((t) => t !== task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Load tasks from localStorage
  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks.forEach((task) => addTask(task, false)); // don't re-save
  }

  // Event listener for add button
  addButton.addEventListener("click", () => addTask());

  // Event listener for Enter key
  taskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  });
});
