import React, { useState, useEffect, Fragment } from "react";
import Page from "./Page";
import { getTasks } from "../data/tasks";
import { Box, makeStyles, Typography } from "@material-ui/core";
import { CircularProgress } from "@material-ui/core";
import { constStrings } from "../data/constants";
import Clock from "./Clock";
import TaskList from "./TaskList";
import TodayIcon from "@material-ui/icons/Today";

const useStyles = makeStyles((theme) => ({
  circularProgress: {
    color: "#0d7377",
  },
  dayDate: {
    marginTop: theme.spacing(2),
  },
  todayIcon: {
    marginRight: theme.spacing(1),
  },
}));

function MainPage() {
  const classes = useStyles();
  const [groupedTasks, setGroupedTasks] = useState({});
  const [tasksLoaded, setTasksLoaded] = useState(false);

  useEffect(() => {
    const f = async () => {
      let groupedTasks = await getTasks();
      setGroupedTasks(JSON.parse(groupedTasks));
      setTasksLoaded(true);
    };
    f();
  }, []);

  return (
    <Fragment>
      {tasksLoaded ? (
        <Page>
          <Box display="flex" textAlign="right">
            <Box>
              <Typography variant="h6">{constStrings.activeTasks}</Typography>
            </Box>
            <Box flexGrow={1}>
              <Clock />
            </Box>
          </Box>

          {Object.keys(groupedTasks).map((key) => {
            return (
              <Fragment key={key}>
                <Box display="flex" className={classes.dayDate}>
                  <Box>
                    <TodayIcon className={classes.todayIcon} />
                  </Box>
                  <Box>
                    <Typography variant="h5">
                      {" "}
                      {new Date(key).toLocaleDateString()}{" "}
                    </Typography>
                  </Box>
                </Box>

                <TaskList tasks={groupedTasks[key]} />
              </Fragment>
            );
          })}
        </Page>
      ) : (
        <Page>
          <CircularProgress className={classes.circularProgress} />
        </Page>
      )}
    </Fragment>
  );
}

export default MainPage;
