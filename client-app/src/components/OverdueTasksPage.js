import { CircularProgress, makeStyles } from "@material-ui/core";
import React, { useState, useEffect, Fragment } from "react";
import Page from "../components/Page";
import { TaskRequestParams } from "../utils/params";
import { constStrings } from "../utils/constants";
import { useHistory } from "react-router-dom";
import { Tasks } from "../apicalls/requests";
import { CheckUser } from "../apicalls/auth";
import TaskGroupsList from "./TaskGroupsList";
import PageTitle from "./PageTitle";

const useStyles = makeStyles((theme) => ({
  circularProgress: {
    color: "#0d7377",
  },
}));

function OverdueTasksPage() {
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
      sortOrder: TaskRequestParams.sortOrderDesc,
      completed: false,
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
    <Page>
      {tasksLoaded ? (
        <Fragment>
          <PageTitle title={constStrings.overdueTasks} />
          <TaskGroupsList tasks={groupedTasks} showGroupNames={true} />
        </Fragment>
      ) : (
        <CircularProgress className={classes.circularProgress} />
      )}
    </Page>
  );
}

export default OverdueTasksPage;
