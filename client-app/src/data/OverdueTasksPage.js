import {
  Box,
  CircularProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useState, useEffect, Fragment } from "react";
import Page from "../components/Page";
import TodayIcon from "@material-ui/icons/Today";
import TaskList from "../components/TaskList";
import { getTasks } from "../data/tasks";
import Clock from "../components/Clock";
import { constStrings } from "./constants";

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

function OverdueTasksPage() {
  const classes = useStyles();
  const [groupedTasks, setGroupedTasks] = useState({});
  const [tasksLoaded, setTasksLoaded] = useState(false);

  useEffect(() => {
    const f = async () => {
      let today = new Date(Date.now());
      today = new Date(
        Date.UTC(
          today.getUTCFullYear(),
          today.getUTCMonth(),
          today.getUTCDate(),
          0,
          0,
          0,
          0
        )
      );
      let groupedTasks = await getTasks(new Date(-8640000000000000), today);
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
              <Typography variant="h6">{constStrings.overdueTasks}</Typography>
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

export default OverdueTasksPage;
