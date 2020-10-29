import { Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Page from "./Page";
import TaskList from "./TaskList";
import { getTasks } from "../data/tasks";

function MainPage() {
  const [date, setDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [tasksLoaded, setTasksLoaded] = useState(false);

  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, [date]);

  useEffect(() => {
    const f = async () => {
      const tasks = await getTasks();
      setTasks(tasks);
      setTasksLoaded(true);
    };
    f();
  }, []);

  return (
    <Page>
      <Typography variant="h5">
        {date.toLocaleDateString()} - {date.toLocaleTimeString()}
      </Typography>
      <Typography variant="h6">recently added tasks: </Typography>
      {tasksLoaded ? <TaskList tasks={tasks}></TaskList> : "loading..."}
    </Page>
  );
}

export default MainPage;
