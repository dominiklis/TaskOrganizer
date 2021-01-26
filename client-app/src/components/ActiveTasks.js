import { CircularProgress } from "@material-ui/core";
import React, { useEffect } from "react";
import { Fragment } from "react";
import { useState } from "react";
import { CheckUser } from "../apicalls/auth";
import { TaskRequestParams } from "../utils/params";
import { Tasks } from "../apicalls/requests";
import { useHistory } from "react-router-dom";
import TaskGroupsList from "./TaskGroupsList";

function ActiveTasks() {
  const history = useHistory();

  const [groupedTasks, setGroupedTasks] = useState({});
  const [tasksLoaded, setTasksLoaded] = useState(false);

  useEffect(() => {
    const user = CheckUser();
    if (!user) {
      history.push("/signin");
    }

    const params = {
      startDate: TaskRequestParams.today(),
      endDate: TaskRequestParams.nextWeek(),
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
        <TaskGroupsList tasks={groupedTasks} showGroupNames={true} />
      ) : (
        <CircularProgress color="primary" />
      )}
    </Fragment>
  );
}

export default ActiveTasks;
