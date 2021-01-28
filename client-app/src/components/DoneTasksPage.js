import {
  Box,
  CircularProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Page from "../components/Page";
import { TaskRequestParams } from "../utils/params";
import Clock from "../components/Clock";
import { constStrings } from "../utils/constants";
import { useHistory } from "react-router-dom";
import { Tasks } from "../apicalls/requests";
import { CheckUser } from "../apicalls/auth";
import TaskGroupsList from "./TaskGroupsList";
import PriorityFilteringMenu from "./PriorityFilteringMenu";
import { filterTasksByPriority } from "../utils/utils";

const useStyles = makeStyles((theme) => ({
  circularProgress: {
    color: "#0d7377",
  },
}));

function DoneTasksPage() {
  const classes = useStyles();
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
      completed: true,
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
        <Box display="flex" textAlign="right">
          <Box>
            <Typography variant="h6">{constStrings.completedTasks}</Typography>
          </Box>
          <Box flexGrow={1}>
            <Clock />
          </Box>
        </Box>

        <Typography>priority:</Typography>
        <PriorityFilteringMenu setPriority={setPriority} />

        <TaskGroupsList
          tasks={filterTasksByPriority(priority, groupedTasks)}
          showGroupNames={true}
          info={constStrings.noTasksToShow}
        />
      </Page>
    );
  }

  return (
    <Page>
      <CircularProgress className={classes.circularProgress} />
    </Page>
  );
}

export default DoneTasksPage;
