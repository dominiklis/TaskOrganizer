import { Typography } from "@material-ui/core";
import React, { useState, useEffect, Fragment } from "react";
import Page from "./Page";
import TaskList from "./TaskList";
import { getTasks } from "../data/tasks";
import { makeStyles } from "@material-ui/core";
import { CircularProgress } from "@material-ui/core";
import Clock from "./Clock";

const useStyles = makeStyles((theme) => ({
  circularProgress: {
    color: "#0d7377",
  },
}));

function MainPage() {
  const classes = useStyles();
  const [tasks, setTasks] = useState([]);
  const [tasksLoaded, setTasksLoaded] = useState(false);

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
      {tasksLoaded ? (
        <Fragment>
          <Clock />
          <Typography variant="h6">recently added tasks: </Typography>
          <TaskList tasks={tasks}></TaskList>
        </Fragment>
      ) : (
        <CircularProgress className={classes.circularProgress} />
      )}
    </Page>
  );
}

export default MainPage;
