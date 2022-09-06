let input = document.querySelector('.input');
let submit = document.querySelector('.add');
let tasksDiv = document.querySelector('.tasks');

// emty array to store the tasks
let arrayOfTasks = [];

// check if theres tasks in local storage
if(localStorage.getItem('tasks')) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

// Trigger get Data
getDataLocalStorage();

submit.onclick = function () {
  if (input.value !== '') {
    addTaskToArray(input.value); // add task to array of tasks
    input.value = ''; // emty the input
  }
}

// click on task element
tasksDiv.addEventListener("click",(e)=> {
  if(e.target.classList.contains('del')) {
    // remove tasks from loacl storage
    deleteTask(e.target.parentElement.getAttribute('data-id'));
    // remove element from page
    e.target.parentElement.remove();

  }
})

function addTaskToArray(taskText) {
  // task data
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false
  };
  // push task to array of tasks
  arrayOfTasks.push(task);
  // console.log(arrayOfTasks);

  // add tasks to page
  addElementToPage(arrayOfTasks);

  // add tasks to localstorage
  addDataLocalStorage(arrayOfTasks);
}

function addElementToPage(arrayOfTasks) {
  // emty the tasks div
  tasksDiv.innerHTML = '';

  // looping on array of tasks
  arrayOfTasks.forEach((task) => {
    // create main div
    let div = document.createElement('div');
    div.className = 'task';
    // ckeck if task is done
    if (task.completed) {
      div.className = 'task done';
    }

    div.setAttribute('data-id', task.id);
    div.appendChild(document.createTextNode(task.title));
    // console.log(div);

    // create button delete
    let span = document.createElement('span');
    span.className = 'del';
    span.appendChild(document.createTextNode('Delete'));

    // appent button to main div 
    div.appendChild(span);
    // console.log(div);

    // add tasks div to task page
    tasksDiv.appendChild(div);
  });

}

function addDataLocalStorage(arrayOfTasks) {
  window.localStorage.setItem('tasks', JSON.stringify(arrayOfTasks));
}

function getDataLocalStorage() {
  let data = window.localStorage.getItem('tasks');
  if (data) {
    let tasks = JSON.parse(data);
    // console.log(tasks);
    addElementToPage(tasks);
  }
}
function deleteTask(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addDataLocalStorage(arrayOfTasks);
}