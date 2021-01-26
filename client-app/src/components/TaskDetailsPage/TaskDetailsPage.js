import { CircularProgress, Grid, IconButton, Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { Box, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Page from "../Page";
import { CheckUser, IsAuthor, GetUserName } from "../../apicalls/auth";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import TaskTitle from "./TaskTitle";
import { Tasks, Users, UserTasks } from "../../apicalls/requests";
import TaskDates from "./TaskDates";
import TaskTags from "./TaskTags";
import TaskDescription from "./TaskDescription";
import TaskDetailsTabs from "./TaskDetailsTabs";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  completedText: {
    color: "#c0c0c0",
  },
  notCompletedText: {
    color: "#808080",
  },
  sharedText: {
    color: "#6e0110",
  },
}));

function TaskDetailsPage({ match }) {
  const classes = useStyles();
  const { id } = useParams();
  const history = useHistory();

  const [task, setTask] = useState({});
  const [taskLoaded, setTaskLoaded] = useState(false);
  const [taskCompleted, setTaskCompleted] = useState(false);
  const [added, setAdded] = useState(false);
  const [startDate, setStartDate] = useState(false);
  const [endDate, setEndDate] = useState(false);
  const [tags, setTags] = useState([]);

  // completing tasks
  const handleCompletedFormSubmit = (e) => {
    e.preventDefault();
    const t = !taskCompleted;
    setTaskCompleted(t);

    Tasks.patch(task.id, [
      {
        op: "replace",
        path: "/Completed",
        value: t,
      },
    ]);
  };

  // cancel sharing
  const submitCancelSharing = (e) => {
    e.preventDefault();
    UserTasks.unshare({ email: GetUserName(), taskId: id }).then((response) => {
      if (response.status === 204) {
        history.push("/");
        history.go();
      }
    });
  };

  const handleDeleteButtonClick = () => {
    Tasks.delete(id);
    history.goBack();
  };

  // users with access to this task
  const [usersToList, setUsersToList] = useState([]);

  // author info
  const [author, setAuthor] = React.useState(false);

  useEffect(() => {
    const user = CheckUser();
    if (!user) {
      history.push("/signin");
    }

    Tasks.details(id).then((response) => {
      if (response.status === 200) {
        setTask(response.data);
        setAdded(new Date(response.data.added));
        setStartDate(new Date(response.data.startDate));
        if (response.data.endDate) {
          setEndDate(new Date(response.data.endDate));
        }
        setTaskCompleted(response.data.completed);
        setTags(response.data.tags);
        setAuthor(IsAuthor(response.data.authorName));
        setTaskLoaded(true);
      } else {
        history.push("/NotFound");
      }
    });

    Users.listUsersWithTask(id).then((response) => {
      if (response.status === 200) {
        setUsersToList(response.data);
      }
    });
  }, [id, history]);

  return (
    <Page>
      {taskLoaded ? (
        <Grid container spacing={1} className={classes.root}>
          <Grid item xs={1}>
            {IsAuthor(task.authorName) ? (
              <Box textAlign="center">
                <Tooltip
                  title={
                    taskCompleted ? "mark as incomplete" : "mark as completed"
                  }
                >
                  <form onSubmit={handleCompletedFormSubmit}>
                    <IconButton color="primary" type="submit">
                      {taskCompleted ? <ClearIcon /> : <CheckIcon />}
                    </IconButton>
                  </form>
                </Tooltip>
                <Tooltip title="delete">
                  <div>
                    <IconButton
                      color="secondary"
                      onClick={handleDeleteButtonClick}
                    >
                      <DeleteForeverIcon />
                    </IconButton>
                  </div>
                </Tooltip>
              </Box>
            ) : (
              <form onSubmit={submitCancelSharing}>
                <Tooltip title="cancel sharing">
                  <IconButton edge="end" aria-label="delete" type="submit">
                    <ClearIcon />
                  </IconButton>
                </Tooltip>
              </form>
            )}
          </Grid>

          <Grid item xs={11} sm={10}>
            {!IsAuthor(task.authorName) && (
              <Typography
                variant="caption"
                className={classes.sharedText}
              >{`task shared by ${task.authorName}`}</Typography>
            )}

            <TaskTitle
              isAuthor={author}
              taskId={task.id}
              taskTitle={task.title}
            />

            {taskCompleted ? (
              <Typography variant="body1" className={classes.completedText}>
                completed
              </Typography>
            ) : (
              <Typography variant="body1" className={classes.notCompletedText}>
                not completed
              </Typography>
            )}

            <TaskDates
              isAuthor={author}
              taskId={task.id}
              added={added}
              sDate={startDate}
              eDate={endDate}
              startTime={task.hasStartTime}
            />

            <TaskTags isAuthor={author} taskId={task.id} taskTags={tags} />

            <TaskDescription
              isAuthor={author}
              taskId={task.id}
              taskDescription={task.description}
            />

            <TaskDetailsTabs
              isAuthor={author}
              taskId={task.id}
              steps={task.steps}
              notes={task.notes}
              usersToList={usersToList}
            />
          </Grid>

          <Grid item sm={1} display={{ xs: "none" }}></Grid>
        </Grid>
      ) : (
        <CircularProgress color="primary" />
      )}
    </Page>
  );
}

export default TaskDetailsPage;
