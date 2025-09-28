const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');


let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
renderTasks();


addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', e => { if(e.key==='Enter') addTask(); });

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;
  const task = { text, completed: false };
  tasks.push(task);
  saveTasks();
  renderTasks();
  taskInput.value = '';
}


function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');

    const span = document.createElement('span');
    span.textContent = task.text;
    if (task.completed) span.classList.add('completed-text');

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'deleteBtn';
    deleteBtn.addEventListener('click', e => {
      e.stopPropagation();
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);

    if (task.completed) li.classList.add('completed');

   
    li.addEventListener('click', () => {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
    });

    taskList.appendChild(li);
  });
}


function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
