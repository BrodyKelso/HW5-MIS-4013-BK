// script.js

document.addEventListener('DOMContentLoaded', () => {
  loadTasks();
});

// Function to add a new task
function addTask() {
  let taskInput = document.getElementById('new-task');
  let newTask = taskInput.value.trim();
  
  if (newTask) {
    let li = document.createElement('li');
    li.className = 'list-group-item';
    li.appendChild(document.createTextNode(newTask));
    li.addEventListener('click', toggleTaskStatus);
    document.getElementById('tasks').appendChild(li);
    
    taskInput.value = '';
    saveTasks();
  }
}

// Function to toggle the completion status of a task
function toggleTaskStatus() {
  this.classList.toggle('completed');
  saveTasks();
}

// Function to save tasks to local storage
function saveTasks() {
  let tasks = [];
  document.querySelectorAll('#tasks li').forEach(task => {
    tasks.push({
      text: task.textContent,
      completed: task.classList.contains('completed')
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasks() {
  let storedTasks = JSON.parse(localStorage.getItem('tasks'));
  
  if (storedTasks) {
    storedTasks.forEach(task => {
      let li = document.createElement('li');
      li.className = 'list-group-item';
      if (task.completed) {
        li.classList.add('completed');
      }
      li.appendChild(document.createTextNode(task.text));
      li.addEventListener('click', toggleTaskStatus);
      document.getElementById('tasks').appendChild(li);
    });
  }
}

// Function to filter tasks based on their status
function filterTasks(status) {
  let lis = document.querySelectorAll('#tasks li');
  lis.forEach(li => {
    switch(status) {
      case 'completed':
        li.style.display = li.classList.contains('completed') ? '' : 'none';
        break;
      case 'incomplete':
        li.style.display = !li.classList.contains('completed') ? '' : 'none';
        break;
      default:
        li.style.display = '';
        break;
    }
  });
}

// Function to download tasks as a .txt file
function downloadTasks() {
  let tasks = [];
  document.querySelectorAll('#tasks li').forEach(task => {
    tasks.push((task.classList.contains('completed') ? '[x] ' : '[ ] ') + task.textContent);
  });
  
  const blob = new Blob([tasks.join('\n')], { type: 'text/plain;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'tasks.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// Event listener for the 'Add Task' button
document.getElementById('add-task-btn').addEventListener('click', addTask);

// Event listener for the 'Download Tasks' button
document.getElementById('download-tasks-btn').addEventListener('click', downloadTasks);

// Ensure that the 'Enter' key also triggers task addition
document.getElementById('new-task').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    addTask();
  }
});
