import { CircularProgress, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { useHistory } from "react-router-dom";
import { CheckUser } from "../apicalls/auth";
import { Tasks } from "../apicalls/requests";
import { TaskRequestParams } from "../utils/params";
import EventBusyIcon from "@material-ui/icons/EventBusy";
import CollapseTasksList from "./CollapseTasksList";
import { constStrings } from "../utils/constants";

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
}));

function OverdueTasks() {
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
            <CollapseTasksList
              tasks={groupedTasks}
              title={`OVERDUE TASKS (${
                groupedTasks.reduce((a, b) => ({
                  count: a.count + b.count,
                })).count
              })`}
              titleStyle={classes.title}
              icon={<EventBusyIcon className={classes.icon} />}
              showGroupNames={false}
            />
          ) : (
            <Typography variant="h5">{constStrings.noOverdueTasks}</Typography>
          )}
        </Fragment>
      ) : (
        <CircularProgress className={classes.circularProgress} />
      )}
    </Fragment>
  );
}

export default OverdueTasks;
