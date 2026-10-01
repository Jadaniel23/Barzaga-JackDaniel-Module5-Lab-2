let taskCounter = 0;

export function normalizeTaskText(value) {
  return String(value ?? "").trim();
}

export function isValidTaskText(value) {
  return normalizeTaskText(value).length > 0;
}

export function createTaskId(taskList) {
  let taskId;
  do {
    taskCounter += 1;
    taskId = `task-${taskCounter}`;
  } while (taskList.querySelector(`[data-task-id="${taskId}"]`));
  return taskId;
}
