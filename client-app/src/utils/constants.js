export const constStrings = {
  activeTasks: "active tasks",
  overdueTasks: "overdue tasks",
  addNewTask: "add new task",
  completedTasks: "completed tasks",
  searchResults: "search results",
  sharedTasks: "shared tasks",
  noOverdueTasks: "no overdue tasks",
  noActiveTasks: "no active tasks",
};

export const priorityTexts = [
  "normal priority",
  "high priority",
  "very high priority"
]

export const getPriorityText = (priority) => {
  if (priority > 2) {
    priority = 2;
  }

  return priorityTexts[priority];
};