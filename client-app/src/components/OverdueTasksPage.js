import { CircularProgress, Grid, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Page from "../components/Page";
import { TaskRequestParams } from "../utils/params";
import { constStrings } from "../utils/constants";
import { useHistory } from "react-router-dom";
import { Tasks } from "../apicalls/requests";
import { CheckUser } from "../apicalls/auth";
import TaskGroupsList from "./TaskGroupsList";
import PageTitle from "./PageTitle";
import PriorityFilteringMenu from "./PriorityFilteringMenu";
import { filterTasksByPriority } from "../utils/utils";

function OverdueTasksPage() {
  const history = useHistory();

  const [groupedTasks, setGroupedTasks] = useState({});
  const [tasksLoaded, setTasksLoaded] = useState(false);
  const [priority, setPriority] = useState(null);

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

  if (tasksLoaded) {
    return (
      <Page>
        <Typography>priority:</Typography>
        <PriorityFilteringMenu setPriority={setPriority} />
        <Grid container>
          <Grid item xs={12} sm={11}>
            <PageTitle title={constStrings.overdueTasks} />
            <TaskGroupsList
              tasks={filterTasksByPriority(priority, groupedTasks)}
              showGroupNames={true}
              info={constStrings.noTasksToShow}
            />
          </Grid>
          <Grid item sm={1} display={{ xs: "none" }}></Grid>
        </Grid>
      </Page>
    );
  }

  return (
    <Page>
      <CircularProgress color="primary" />
    </Page>
  );
}

export default OverdueTasksPage;
