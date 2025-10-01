// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskList = document.getElementById("tasks");
const addTaskBtn = document.getElementById("addTaskBtn");
const themeToggle = document.getElementById("themeToggle");

// Render tasks
function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    let li = document.createElement("li");
    li.innerHTML = `
      <strong>${task.subject}</strong> - ${task.topic} (Due: ${task.dueDate})
      <button onclick="markDone(${index})">✅ Done</button>
      <button onclick="deleteTask(${index})">🗑 Delete</button>
    `;
    if (task.completed) {
      li.style.textDecoration = "line-through";
    }
    taskList.appendChild(li);
  });
}

// Add new task
addTaskBtn.addEventListener("click", () => {
  let subject = document.getElementById("subject").value;
  let topic = document.getElementById("topic").value;
  let dueDate = document.getElementById("dueDate").value;

  if (subject && topic && dueDate) {
    tasks.push({ subject, topic, dueDate, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
  }
});

// Mark task as done
function markDone(index) {
  tasks[index].completed = true;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// Delete task
function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// Dark mode toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Initial render
renderTasks();
