import React from "react";
import TaskCard from "./TaskCard";
import { makeStyles } from "@material-ui/core";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    "&:hover": {
      textDecoration: "none",
    },
  },
}));

function TaskList({ tasks }) {
  const classes = useStyles();

  return (
    <div>
      {tasks.map((task, index) => {
        return (
          <NavLink 
            to={`/task/${task.TaskId}`}
            key={task.TaskId}
            className={classes.link}
          >
            <TaskCard task={task} />
          </NavLink>
        );
      })}
    </div>
  );
}

export default TaskList;
