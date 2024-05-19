let cngBackground = () => {
  document.body.style.backgroundColor = "black";
};

let V = document.getElementById("dot");
let movingAnimatedBox = () => {
  let E = document.getElementById("forwardicon");
  let M = document.querySelector(".animatedButton");
  let T = document.getElementById("secondTextBox");

  V.style.transition = "0.5s";
  V.style.width = "24px";
  V.style.translate = "20px";

  E.style.translate = "30px";
  M.style.width = "190px";
  M.style.transition = "0.5s";
  E.style.transition = "0.5s";
  // E.style.rotate = "360deg";
  T.style.transition = "0.5s";
  T.style.translate = "45px";
  T.style.transition = "0.5s";
};

let backToNormalPosition = () => {
  let E = document.getElementById("forwardicon");
  let G = document.querySelector(".animatedButton");
  let T = document.getElementById("secondTextBox");

  V.style.translate = "0px";
  V.style.transition = "0.5s";
  V.style.width = "0px";
  G.style.translate = "0px";
  G.style.transition = "0.5s";
  G.style.width = "40px";
  E.style.translate = "0px";
  E.style.rotate = "0deg";
  T.style.transition = "0.5s";
  T.style.translate = "0px";
};
// creating Notes on click
// let count = 0;
let notes = [];
// Check if notes exist in local storage

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("notes")) {
    notes = JSON.parse(localStorage.getItem("notes"));
    displayNotes();
  }
});

// let createNewNotes = () => {
let displayNotes = () => {
  let createbox = document.querySelector(".NoteBoxContainer");
  createbox.innerHTML = "";
  notes.forEach((note, index) => {
    let e = document.createElement("div");
    e.className = "BoxInNoteBox1";
    e.innerHTML = `
    <div class="SaveDelBox">
      <img src="images/save.png" class="saveImg" onclick="saveNote(${index})">
      <img src="images/delete.png" class="deleteImg" onclick="deleteNote(${index})">
      </div>
   <textarea class="noteBox1">${note}</textarea>
    
`;

    createbox.appendChild(e);
    // createbox.appendChild(textarea);
    // e.appendChild(createimg);

    // count++;
    // console.log(count);
  });
};
let createNewNotes = () => {
  notes.push("");
  displayNotes();
};

// Function to edit a note
let whiteBox = true;

function saveNote(index) {
  let a = document.querySelectorAll(".noteBox1");
  notes[index] = a[index].value;
  localStorage.setItem("notes", JSON.stringify(notes));

  if (whiteBox == true) {
    a[index].style.backgroundColor = "#00006b";
    a[index].style.color = "white";
    a[index].readOnly = "true";
    whiteBox = false;
  } else {
    a[index].style.backgroundColor = "white";
    a[index].style.color = "black";
    a[index].readOnly = false;
    whiteBox = true;
  }
}

// Function to delete a note
function deleteNote(index) {
  notes.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  displayNotes();
}

// for Discoveries  ---- //
function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    const taskList = document.getElementById("taskList");
    const newTask = document.createElement("li");
    newTask.innerHTML = `
          <div>${taskText}</div>
          <div class="task-actions">
              <button class="edit-task" onclick="editTask(this)">Edit</button>
              <button class="delete-task" onclick="deleteTask(this)">Delete</button>
          </div>
      `;
    newTask.style.marginBottom = "10px";
    newTask.style.padding = "10px";
    newTask.style.borderRadius = "4px";
    newTask.style.backgroundColor = "#f7f7f7";
    taskList.appendChild(newTask);
    taskInput.value = "";

    // Save tasks to local storage
    saveTasksToLocalStorage();
  } else {
    alert("Please enter a task.");
  }
}

function editTask(button) {
  const taskElement = button.parentElement.parentElement;
  const taskTextElement = taskElement.querySelector("div:first-child");
  const taskText = taskTextElement.textContent.trim();
  const newTaskText = prompt("Edit task:", taskText);
  if (newTaskText !== null && newTaskText.trim() !== "") {
    taskTextElement.textContent = newTaskText.trim();
    saveTasksToLocalStorage();
  }
}

function deleteTask(button) {
  const taskElement = button.parentElement.parentElement;
  taskElement.remove();
  saveTasksToLocalStorage();
}

function saveTasksToLocalStorage() {
  const taskList = document.getElementById("taskList");
  const tasks = Array.from(taskList.children).map((task) =>
    task.querySelector("div:first-child").textContent.trim()
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  if (tasks) {
    const taskList = document.getElementById("taskList");
    tasks.forEach((taskText) => {
      const newTask = document.createElement("li");
      newTask.innerHTML = `
              <div class="box">${taskText}</div>
              <div class="task-actions">
                  <button class="edit-task" onclick="editTask(this)">Edit</button>
                  <button class="delete-task" onclick="deleteTask(this)">Delete</button>
              </div>
          `;
      newTask.style.marginBottom = "10px";
      newTask.style.padding = "10px";
      newTask.style.borderRadius = "4px";
      // newTask.style.background = "linear-gradient(to right, #4a47a3, #ffffff)";

      taskList.appendChild(newTask);
    });
  }
}

// Load tasks from local storage when the page loads
loadTasksFromLocalStorage();
