export function createButton(className, label) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = className;
  button.textContent = label;
  return button;
}

export function createTaskElement(taskText, taskId) {
  const taskItem = document.createElement("li");
  taskItem.classList.add("task-item");
  taskItem.dataset.taskId = taskId;
  taskItem.dataset.state = "pending";

  const textSpan = document.createElement("span");
  textSpan.classList.add("task-text");
  textSpan.textContent = taskText;

  taskItem.append(
    textSpan,
    createButton("complete-btn", "Complete"),
    createButton("edit-btn", "Edit"),
    createButton("remove-btn", "Remove")
  );

  return taskItem;
}

export function renderTaskCounts({ taskList, totalCount, pendingCount, completedCount, emptyState }) {
  const tasks = Array.from(taskList.querySelectorAll(".task-item"));
  const completed = tasks.filter((task) => task.dataset.state === "completed").length;
  const pending = tasks.filter((task) => task.dataset.state === "pending").length;

  totalCount.textContent = String(tasks.length);
  pendingCount.textContent = String(pending);
  completedCount.textContent = String(completed);
  emptyState.hidden = tasks.length > 0;
}
