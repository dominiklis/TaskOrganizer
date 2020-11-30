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
import { TaskRequestParams } from "../utils/params";
import Clock from "../components/Clock";
import { constStrings } from "../utils/constants";
import { useHistory } from "react-router-dom";
import { Tasks } from "../apicalls/requests";

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
  const history = useHistory();
  const classes = useStyles();
  const [groupedTasks, setGroupedTasks] = useState({});
  const [tasksLoaded, setTasksLoaded] = useState(false);

  useEffect(() => {
    const params = {
      startDate: 0,
      endDate: TaskRequestParams.today(),
      sortOrder: TaskRequestParams.sortOrderDesc,
    };

    Tasks.list(params).then((response) => {
      if (response.status === 200) {
        setGroupedTasks(response.data);
        setTasksLoaded(true);
      } else {
        history.push("/NotFound");
      }
    });
  }, [history]);

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
          {groupedTasks.map((group) => {
            return (
              <Fragment key={group.key}>
                <Box display="flex" className={classes.dayDate}>
                  <Box>
                    <TodayIcon className={classes.todayIcon} />
                  </Box>
                  <Box>
                    <Typography variant="h5">
                      {" "}
                      {new Date(group.key).toLocaleDateString()}{" "}
                    </Typography>
                  </Box>
                </Box>

                <TaskList tasks={group.tasks} />
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
