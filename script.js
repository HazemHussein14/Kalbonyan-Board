const addBtnStart = document.getElementById("add-button-started");
const addBtnProgress = document.getElementById("add-button-progress");
const addBtnCompleted = document.getElementById("add-button-completed");

function updateLocalStorage(data) {
  localStorage.setItem("Tasks", JSON.stringify(data));
}

// Create task item
function CreateTask() {
  const task = document.createElement("li");
  task.classList.add("task");
  task.draggable = true;
  task.id = generateId();
  task.innerHTML = `
  <div contentEditable="true" class="input-area">Type a name...</div>
  <div class="btns">
  <button id="edit-button" class="small-btn edit" onclick="editTask(event)">
      <i class="fa-regular fa-pen-to-square"></i>
      </button>
      <button id="remove-button" onclick="removeTask('${task.id}')" class="small-btn remove">
        <i class="fa-solid fa-trash"></i>
      </button>
  </div>
  `;

  // set dataTransfer object with id of dragged element
  task.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", e.target.id);
    dragAndDrop();
  });
  return task;
}

// Create dropzone element
function createDropZoneEl(taskId) {
  const dropZoneEl = document.createElement("div");
  dropZoneEl.classList.add("dropzone");
  dropZoneEl.id = `dropzone-${taskId}`;
  return dropZoneEl;
}

function dragAndDrop() {
  const dropzones = document.querySelectorAll(".dropzone");
  dropzones.forEach((dropzone) => {
    dropzone.addEventListener("dragover", (e) => {
      e.preventDefault();
      dropzone.classList.add("active");
    });

    dropzones.forEach((dropzone) => {
      dropzone.addEventListener("dragleave", () => {
        dropzone.classList.remove("active");
      });
    });

    dropzone.addEventListener("drop", (e) => {
      e.preventDefault();
      dropzone.classList.remove("active");

      // Get the ID of the dragged element
      const draggedTaskId = e.dataTransfer.getData("text/plain");

      // Get the dragged task element
      const draggedTask = document.getElementById(draggedTaskId);

      // Insert the dragged task element after the drop zone element
      dropzone.after(draggedTask, draggedTask.nextElementSibling);
    });
  });
}

// Generate random ID
function generateId() {
  return Math.floor(Math.random() * 100000);
}

// add task to DOM
function addTaskDOM(parentId) {
  const parentList = document.getElementById(parentId);
  const taskEl = CreateTask();
  const taskId = taskEl.id;
  const dropzoneEl = createDropZoneEl(taskId);
  parentList.lastElementChild.before(taskEl);
  taskEl.after(dropzoneEl);
}

// Select task text
function selectTaskInputText(taskInput) {
  const range = document.createRange();
  range.selectNodeContents(taskInput);
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
}

// Edit task
function editTask(e) {
  const taskInput = e.target.closest(".task").querySelector(".input-area");
  selectTaskInputText(taskInput);
}

// Remove task by ID
function removeTask(id) {
  const taskId = id;
  const taskEl = document.getElementById(taskId.toString());
  const dropzoneEl = document.getElementById(`dropzone-${taskId}`);
  taskEl.remove();
  dropzoneEl.remove();
}

// Event Listeners
addBtnStart.addEventListener("click", addTaskDOM.bind(null, "not-started"));
addBtnProgress.addEventListener("click", addTaskDOM.bind(null, "in-progress"));
addBtnCompleted.addEventListener("click", addTaskDOM.bind(null, "completed"));
