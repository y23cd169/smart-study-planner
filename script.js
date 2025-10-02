let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const taskList = document.getElementById("tasks");
const addTaskBtn = document.getElementById("addTaskBtn");
const themeToggle = document.getElementById("themeToggle");

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    let li = document.createElement("li");

    // Task content
    li.innerHTML = `
      <div class="task-text">
  <strong>Subject:</strong> ${task.subject} <br>
  <strong>Topic:</strong> ${task.topic} <br>
  <small>Due: ${task.dueDate}</small>
</div>

      <div>
        <button onclick="markDone(${index})">✅ Done</button>
        <button onclick="deleteTask(${index})">🗑 Delete</button>
      </div>
    `;

    // Progress Bar
    let progressBar = document.createElement("div");
    progressBar.className = "progress-bar";
    progressBar.innerHTML = `<div class="progress" style="width:${task.completed ? '100%' : '0%'}"></div>`;
    li.appendChild(progressBar);

    taskList.appendChild(li);
  });

  updateOverallProgress();
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

// Mark as done
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

// Overall progress
function updateOverallProgress() {
  let completed = tasks.filter(t => t.completed).length;
  let total = tasks.length;
  let percent = total > 0 ? (completed / total) * 100 : 0;

  document.getElementById("overallProgress").style.width = percent + "%";
}

// Dark Mode
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

renderTasks();

