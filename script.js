

document.addEventListener('DOMContentLoaded', () => {
  loadTasks();
});


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


function toggleTaskStatus() {
  this.classList.toggle('completed');
  saveTasks();
}


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


document.getElementById('add-task-btn').addEventListener('click', addTask);

document.getElementById('download-tasks-btn').addEventListener('click', downloadTasks);

document.getElementById('new-task').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    addTask();
  }
});
