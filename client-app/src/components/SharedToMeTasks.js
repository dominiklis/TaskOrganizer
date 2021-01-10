import { CircularProgress, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Fragment } from 'react'
import { useHistory } from 'react-router-dom';
import { CheckUser } from '../apicalls/auth';
import { TaskRequestParams } from '../utils/params';
import CollapseTasksList from './CollapseTasksList';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { Tasks } from '../apicalls/requests';

const useStyles = makeStyles((theme) => ({
  circularProgress: {
    color: "#0d7377",
  },
  title: {
    color: "black",
  },
  icon: {
    marginRight: theme.spacing(1),
  },
}))

function SharedToMeTasks() {
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
      endDate: TaskRequestParams.nextWeek(),
      sortOrder: TaskRequestParams.sortOrderAsc,
      shared: "SharedTo",
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
              title={`TASKS SHARED TO ME (${
                groupedTasks.reduce((a, b) => ({
                  count: a.count + b.count,
                })).count
              })`}
              titleStyle={classes.title}
              icon={<ArrowForwardIcon className={classes.icon} />}
              showGroupNames={true}
            />
          ) : (
            <Typography variant="h5">{"nobody shared tasks with you"}</Typography>
          )}
        </Fragment>
      ) : (
        <CircularProgress className={classes.circularProgress} />
      )}
    </Fragment>
  )
}

export default SharedToMeTasks
    