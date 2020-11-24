import React from "react";
import TaskCard from "./TaskCard";

function TaskList({ tasks }) {
  return (
    <div>
      {tasks.map((task, index) => {
        return <TaskCard task={task} key={task.id} />;
      })}
    </div>
  );
}

export default TaskList;
