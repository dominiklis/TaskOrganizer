import {
  Box,
  CircularProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { Fragment } from "react";
import TodayIcon from "@material-ui/icons/Today";
import { useState } from "react";
import { CheckUser } from "../apicalls/auth";
import { TaskRequestParams } from "../utils/params";
import { Tasks } from "../apicalls/requests";
import { useHistory } from "react-router-dom";
import TaskList from "./TaskList";
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

function ActiveTasks() {
  const history = useHistory();
  const classes = useStyles();

  const [groupedTasks, setGroupedTasks] = useState({});
  const [tasksLoaded, setTasksLoaded] = useState(false);

  useEffect(() => {
    const user = CheckUser();
    if (!user) {
      history.push("/signin");
    }

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
        console.log("ERROR" + response);
      }
    });
  }, [history]);

  return (
    <Fragment>
      {tasksLoaded ? (
        <Fragment>
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
        </Fragment>
      ) : (
        <CircularProgress className={classes.circularProgress} />
      )}
    </Fragment>
  );
}

export default ActiveTasks;
