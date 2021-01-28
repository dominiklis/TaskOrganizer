export const constStrings = {
  activeTasks: "active tasks",
  overdueTasks: "overdue tasks",
  addNewTask: "add new task",
  completedTasks: "completed tasks",
  searchResults: "search results",
  sharedTasks: "shared tasks",
  noOverdueTasks: "no overdue tasks",
  noActiveTasks: "no active tasks",
  noTasksToShow: "no tasks to show",
};

export const priorityTexts = [
  "low priority",
  "medium priority",
  "high priority",
];

export const getPriorityText = (priority) => {
  if (priority > 2) {
    priority = 2;
  }

  return priorityTexts[priority];
};
