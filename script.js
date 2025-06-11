document.addEventListener("DOMContentLoaded", () => {
  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  // Load tasks from Local Storage on page load
  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    storedTasks.forEach((taskText) => addTask(taskText, false));
  }

  // Add task to the list and optionally save to Local Storage
  function addTask(taskText = "", save = true) {
    if (!taskText) {
      taskText = taskInput.value.trim();
      if (taskText === "") {
        alert("Please enter a task");
        return;
      }
    }

    const li = document.createElement("li");
    li.textContent = taskText;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.className = "remove-btn";

    // Remove task from DOM and Local Storage
    removeBtn.onclick = () => {
      taskList.removeChild(li);
      removeTaskFromStorage(taskText);
    };

    li.appendChild(removeBtn);
    taskList.appendChild(li);

    if (save) {
      const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      storedTasks.push(taskText);
      localStorage.setItem("tasks", JSON.stringify(storedTasks));
    }

    taskInput.value = "";
  }

  // Remove task from Local Storage
  function removeTaskFromStorage(taskText) {
    let storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    storedTasks = storedTasks.filter((task) => task !== taskText);
    localStorage.setItem("tasks", JSON.stringify(storedTasks));
  }

  // Event listener for Add Task button
  addButton.addEventListener("click", () => addTask());

  // Event listener for Enter key
  taskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  });

  // Load existing tasks on page load
  loadTasks();
});
