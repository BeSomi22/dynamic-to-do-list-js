// document.addEventListener("DOMContentLoaded", () => {
//   const addButton = document.getElementById("add-task-btn");
//   const taskInput = document.getElementById("task-input");
//   const taskList = document.getElementById("task-list");

//   // Load tasks from Local Storage on page load
//   function loadTasks() {
//     const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
//     storedTasks.forEach((taskText) => addTask(taskText, false));
//   }

//   // Add task to the list and optionally save to Local Storage
//   function addTask(taskText = "", save = true) {
//     if (!taskText) {
//       taskText = taskInput.value.trim();
//       if (taskText === "") {
//         alert("Please enter a task");
//         return;
//       }
//     }

//     const li = document.createElement("li");
//     li.textContent = taskText;

//     const removeBtn = document.createElement("button");
//     removeBtn.textContent = "Remove";
//     removeBtn.className = "remove-btn";

//     // Remove task from DOM and Local Storage
//     removeBtn.onclick = () => {
//       taskList.removeChild(li);
//       removeTaskFromStorage(taskText);
//     };

//     li.appendChild(removeBtn);
//     taskList.appendChild(li);

//     if (save) {
//       const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
//       storedTasks.push(taskText);
//       localStorage.setItem("tasks", JSON.stringify(storedTasks));
//     }

//     taskInput.value = "";
//   }

//   // Remove task from Local Storage
//   function removeTaskFromStorage(taskText) {
//     let storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
//     storedTasks = storedTasks.filter((task) => task !== taskText);
//     localStorage.setItem("tasks", JSON.stringify(storedTasks));
//   }

//   // Event listener for Add Task button
//   addButton.addEventListener("click", () => addTask());

//   // Event listener for Enter key
//   taskInput.addEventListener("keypress", (event) => {
//     if (event.key === "Enter") {
//       addTask();
//     }
//   });

//   // Load existing tasks on page load
//   loadTasks();
// });
document.addEventListener("DOMContentLoaded", () => {
  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  // Load tasks from localStorage on page load
  loadTasks();

  // Add a new task and optionally save to localStorage
  function addTask(taskText = null, save = true) {
    const text = taskText ?? taskInput.value.trim();
    if (text === "") {
      alert("Please enter a task");
      return;
    }

    const li = document.createElement("li");
    li.textContent = text;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.className = "remove-btn";

    removeBtn.onclick = () => {
      taskList.removeChild(li);
      removeFromLocalStorage(text);
    };

    li.appendChild(removeBtn);
    taskList.appendChild(li);

    if (!taskText) taskInput.value = "";

    if (save) {
      saveToLocalStorage(text);
    }
  }

  // Save a new task to localStorage
  function saveToLocalStorage(task) {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Remove a task from localStorage
  function removeFromLocalStorage(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks = tasks.filter((t) => t !== task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Load and display all tasks from localStorage
  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks.forEach((task) => addTask(task, false)); // false: don't re-save on load
  }

  // Event listener: Add button click
  addButton.addEventListener("click", () => addTask());

  // Event listener: Press Enter key in input
  taskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  });
});
