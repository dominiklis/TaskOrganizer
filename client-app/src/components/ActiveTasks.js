import {
  Button,
  ButtonGroup,
  CircularProgress,
  Typography,
} from "@material-ui/core";
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

  const [allTasks, setAllTasks] = useState({});
  const [groupedTasks, setGroupedTasks] = useState({});
  const [tasksLoaded, setTasksLoaded] = useState(false);
  const [chosenButton, setChosenButton] = useState(0);

  const filter = (button) => {
    if (button !== 0) {
      let newTasks = [];
      const priority = button - 1;
      allTasks.forEach((group) => {
        const grp = {
          ...group,
          tasks: group.tasks.filter((task) => task.priority === priority),
        };
        grp.count = grp.tasks.length;
        if (grp.count > 0) {
          newTasks.push(grp);
        }
      });

      setGroupedTasks(newTasks);
    } else {
      setGroupedTasks(allTasks);
    }

    setChosenButton(button);
  };

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
        setAllTasks(response.data);
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
          <Typography>priority:</Typography>
          <ButtonGroup
            color="primary"
            size="small"
            aria-label="small outlined button group"
          >
            <Button disabled={chosenButton === 0} onClick={() => filter(0)}>
              All
            </Button>
            <Button disabled={chosenButton === 1} onClick={() => filter(1)}>
              Normal
            </Button>
            <Button disabled={chosenButton === 2} onClick={() => filter(2)}>
              High
            </Button>
            <Button disabled={chosenButton === 3} onClick={() => filter(3)}>
              Very High
            </Button>
          </ButtonGroup>

          <TaskGroupsList tasks={groupedTasks} showGroupNames={true} />
        </Fragment>
      ) : (
        <CircularProgress color="primary" />
      )}
    </Fragment>
  );
}

export default ActiveTasks;
