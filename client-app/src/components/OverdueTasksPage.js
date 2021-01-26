import { CircularProgress, Grid } from "@material-ui/core";
import React, { useState, useEffect, Fragment } from "react";
import Page from "../components/Page";
import { TaskRequestParams } from "../utils/params";
import { constStrings } from "../utils/constants";
import { useHistory } from "react-router-dom";
import { Tasks } from "../apicalls/requests";
import { CheckUser } from "../apicalls/auth";
import TaskGroupsList from "./TaskGroupsList";
import PageTitle from "./PageTitle";

function OverdueTasksPage() {
  const history = useHistory();
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
        <Grid container>
          <Grid item xs={12} sm={11}>
            <PageTitle title={constStrings.overdueTasks} />
            <TaskGroupsList tasks={groupedTasks} showGroupNames={true} />
          </Grid>
          <Grid item sm={1} display={{ xs: "none" }}></Grid>
        </Grid>
      ) : (
        <CircularProgress color="primary" />
      )}
    </Page>
  );
}

export default OverdueTasksPage;
