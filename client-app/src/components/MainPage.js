import React, { useState, useEffect, Fragment } from "react";
import Page from "./Page";
import { TaskRequestParams } from "../utils/params";
import { Box, makeStyles, Typography } from "@material-ui/core";
import { CircularProgress } from "@material-ui/core";
import { constStrings } from "../utils/constants";
import Clock from "./Clock";
import TaskList from "./TaskList";
import TodayIcon from "@material-ui/icons/Today";
import { Tasks } from "../apicalls/requests";
import { useHistory } from "react-router-dom";
import { format } from "date-fns";

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
  const history = useHistory();

  const classes = useStyles();
  const [groupedTasks, setGroupedTasks] = useState({});
  const [tasksLoaded, setTasksLoaded] = useState(false);

  useEffect(() => {
    const params = {
      startDate: TaskRequestParams.today(),
      endDate: TaskRequestParams.twoDaysAfterTomorrow(),
      sortOrder: TaskRequestParams.sortOrderAsc,
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
              <Typography variant="h6">{constStrings.activeTasks}</Typography>
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
                      {format(new Date(group.key), "dd.MM.yyyy")}
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

export default MainPage;
