import {
  Box,
  CircularProgress,
  Collapse,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { useHistory } from "react-router-dom";
import { CheckUser } from "../apicalls/auth";
import { Tasks } from "../apicalls/requests";
import { TaskRequestParams } from "../utils/params";
import TaskList from "./TaskList";
import EventBusyIcon from "@material-ui/icons/EventBusy";
import DetailsIcon from "@material-ui/icons/Details";
import ChangeHistoryIcon from "@material-ui/icons/ChangeHistory";

const useStyles = makeStyles((theme) => ({
  circularProgress: {
    color: "#0d7377",
  },
  title: {
    color: "#b00000",
  },
  icon: {
    marginRight: theme.spacing(1),
    color: "#b00000",
  },
  triangleIcon: {
    marginRight: theme.spacing(1),
    color: "#b00000",
  },
}));

function OverdueTasks() {
  const history = useHistory();
  const classes = useStyles();

  const [groupedTasks, setGroupedTasks] = useState({});
  const [tasksLoaded, setTasksLoaded] = useState(false);
  const [show, setShow] = useState(false);

  const handleClick = () => {
    let s = !show;
    setShow(s);
  };

  useEffect(() => {
    const user = CheckUser();
    if (!user) {
      history.push("/signin");
    }

    const params = {
      startDate: 0,
      endDate: TaskRequestParams.today(),
      sortOrder: TaskRequestParams.sortOrderAsc,
      completed: false,
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
          {groupedTasks.length ? (
            <Fragment>
              <Box display="flex">
                <Box>
                  <EventBusyIcon className={classes.icon} />
                </Box>
                <Box flexGrow={1}>
                  <Typography
                    variant="h5"
                    className={classes.title}
                    onClick={handleClick}
                  >
                    {`OVERDUE TASKS (${
                      groupedTasks.reduce((a, b) => ({
                        count: a.count + b.count,
                      })).count
                    })`}
                  </Typography>
                </Box>
                <Box>
                  {show ? (
                    <ChangeHistoryIcon className={classes.triangleIcon} />
                  ) : (
                    <DetailsIcon className={classes.triangleIcon} />
                  )}
                </Box>
              </Box>

              <Collapse in={show}>
                {groupedTasks.map((group) => {
                  return (
                    <Fragment key={group.key}>
                      <TaskList tasks={group.tasks} />
                    </Fragment>
                  );
                })}
              </Collapse>
            </Fragment>
          ) : (
            <Typography variant="h5">{"no overdue tasks"}</Typography>
          )}

          {/* {groupedTasks.map((group) => {
            return (
              <Fragment key={group.key}>
                <TaskList tasks={group.tasks} />
              </Fragment>
            );
          })} */}
        </Fragment>
      ) : (
        <CircularProgress className={classes.circularProgress} />
      )}
    </Fragment>
  );
}

export default OverdueTasks;
