import React, { useState, useEffect, Fragment } from "react";
import Page from "./Page";
import { getTodaysTasks } from "../data/tasks";
import { makeStyles } from "@material-ui/core";
import { CircularProgress } from "@material-ui/core";
import { constStrings } from "../data/constants";
import TaskPage from "./TaskPage";

const useStyles = makeStyles((theme) => ({
  circularProgress: {
    color: "#0d7377",
  },
}));

function TodaysTasksPage() {
  const classes = useStyles();
  const [tasks, setTasks] = useState([]);
  const [tasksLoaded, setTasksLoaded] = useState(false);

  useEffect(() => {
    const f = async () => {
      let tasks = await getTodaysTasks();
      tasks = tasks.sort((a, b) => b.Added - a.Added);
      setTasks(tasks);
      setTasksLoaded(true);
    };
    f();
  }, []);

  return (
    <Fragment>
      {tasksLoaded ? (
        <TaskPage tasks={tasks} title={constStrings.todaysTasks}></TaskPage>
      ) : (
        <Page>
          <CircularProgress className={classes.circularProgress} />
        </Page>
      )}
    </Fragment>
  );
}

export default TodaysTasksPage;
