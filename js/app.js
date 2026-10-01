import { EMPTY_MESSAGE, SAMPLE_TASKS } from "./modules/data.js";
import { createTaskId, isValidTaskText, normalizeTaskText } from "./modules/utils.js";
import { createTaskElement, renderTaskCounts } from "./modules/display.js";

const taskInput = document.getElementById("taskInput");
const taskForm = document.getElementById("taskForm");
const loadSamplesBtn = document.getElementById("loadSamplesBtn");
const taskList = document.getElementById("taskList");
const taskMessage = document.getElementById("taskMessage");
const emptyState = document.getElementById("emptyState");
const totalCount = document.getElementById("totalCount");
const pendingCount = document.getElementById("pendingCount");
const completedCount = document.getElementById("completedCount");

function showMessage(text) {
  taskMessage.textContent = text;
}

function clearMessage() {
  taskMessage.textContent = "";
}

export function updateTaskCounts() {
  renderTaskCounts({ taskList, totalCount, pendingCount, completedCount, emptyState });
}

export function addTask(taskText) {
  const text = normalizeTaskText(taskText);
  if (!isValidTaskText(text)) {
    showMessage(EMPTY_MESSAGE);
    taskInput.focus();
    return;
  }

  const taskId = createTaskId(taskList);
  taskList.append(createTaskElement(text, taskId));
  taskInput.value = "";
  clearMessage();
  updateTaskCounts();
  taskInput.focus();
}

export function toggleTaskComplete(taskItem) {
  const isCompleted = taskItem.classList.toggle("completed");
  taskItem.dataset.state = isCompleted ? "completed" : "pending";
  updateTaskCounts();
}

export function beginTaskEdit(taskItem) {
  const textSpan = taskItem.querySelector(".task-text");
  const editButton = taskItem.querySelector(".edit-btn");
  if (!textSpan || !editButton) return;

  const editInput = document.createElement("input");
  editInput.type = "text";
  editInput.classList.add("edit-input");
  editInput.value = textSpan.textContent;
  editInput.setAttribute("aria-label", "Edit task text");

  textSpan.replaceWith(editInput);
  editButton.textContent = "Save";
  editInput.focus();
  editInput.select();
}

export function saveTaskEdit(taskItem) {
  const editInput = taskItem.querySelector(".edit-input");
  const editButton = taskItem.querySelector(".edit-btn");
  if (!editInput || !editButton) return;

  const newText = normalizeTaskText(editInput.value);
  if (!isValidTaskText(newText)) {
    showMessage(EMPTY_MESSAGE);
    editInput.focus();
    return;
  }

  const textSpan = document.createElement("span");
  textSpan.classList.add("task-text");
  textSpan.textContent = newText;

  editInput.replaceWith(textSpan);
  editButton.textContent = "Edit";
  clearMessage();
}

export function removeTask(taskItem) {
  taskItem.remove();
  updateTaskCounts();
}

export function handleTaskListClick(event) {
  const clickedElement = event.target instanceof Element ? event.target : null;
  const button = clickedElement?.closest("button");
  if (!button) return;

  const taskItem = button.closest(".task-item");
  if (!taskItem || !taskList.contains(taskItem)) return;

  if (button.classList.contains("complete-btn")) {
    toggleTaskComplete(taskItem);
  } else if (button.classList.contains("edit-btn")) {
    if (taskItem.querySelector(".edit-input")) {
      saveTaskEdit(taskItem);
    } else {
      beginTaskEdit(taskItem);
    }
  } else if (button.classList.contains("remove-btn")) {
    removeTask(taskItem);
  }
}

export function loadSampleTasks() {
  const fragment = document.createDocumentFragment();
  SAMPLE_TASKS.forEach((sampleText) => {
    fragment.append(createTaskElement(sampleText, createTaskId(taskList)));
  });

  taskList.append(fragment);
  clearMessage();
  updateTaskCounts();
}

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addTask(taskInput.value);
});

loadSamplesBtn.addEventListener("click", loadSampleTasks);
taskList.addEventListener("click", handleTaskListClick);

updateTaskCounts();

Object.assign(window, {
  addTask,
  beginTaskEdit,
  createTaskElement,
  handleTaskListClick,
  loadSampleTasks,
  removeTask,
  saveTaskEdit,
  toggleTaskComplete,
  updateTaskCounts
});
