import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Tooltip,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { Box, Button, Typography, List } from "@material-ui/core";
import React, { useEffect, useState, Fragment } from "react";
import { useHistory, useParams } from "react-router-dom";
import Page from "./Page";
import AddStepForm from "./AddStepForm";
import ListOfStepsItem from "./ListOfStepsItem";
import { format } from "date-fns";
import { Tasks, Users, UserTasks } from "../apicalls/requests";
import EditTaskTitleForm from "./EditTaskTitleForm";
import EditTaskDescriptionForm from "./EditTaskDescriptionForm";
import EditTaskDates from "./EditTaskDates";
import EditTagsForm from "./EditTagsForm";
import TagChip from "./TagChip";
import { CheckUser, IsAuthor, GetUserName } from "../apicalls/auth";
import EditIcon from "@material-ui/icons/Edit";
import TodayIcon from "@material-ui/icons/Today";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import ShareIcon from "@material-ui/icons/Share";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import UsersWithTask from "./UsersWithTask";

const useStyles = makeStyles((theme) => ({
  timeBox: {
    width: "100%",
    borderRadius: "10px",
    padding: theme.spacing(1),
  },
  circularProgress: {
    color: "#0d7377",
  },
  coloredText: {
    color: "#0d7377",
  },
  iconSpacing: {
    marginRight: theme.spacing(1),
  },
  partName: {
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(1),
  },
  errorMsg: {
    color: "red",
  },
  textWithIcon: {
    display: "flex",
    alignItems: "center",
    "flex-wrap": "wrap",
    color: "#0d7377",
  },
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

  // edit task fields
  //    edit title
  const [editTitle, setEditTitle] = useState(false);

  const changeTitleEditState = () => {
    if (IsAuthor(task.authorName)) {
      const e = !editTitle;
      setEditTitle(e);
    }
  };

  const handleSaveEditTitleButton = (newTitle) => {
    const editedTask = {
      ...task,
      title: newTitle,
    };
    setTask(editedTask);
    changeTitleEditState();
  };

  //    edit description
  const [editDescription, setEditDescription] = useState(false);

  const setDescriptionEditStateTrue = () => setEditDescription(true);
  const setDescriptionEditStateFalse = () => setEditDescription(false);

  const handleSaveEditDescriptionButton = (newDescription) => {
    const editedTask = {
      ...task,
      description: newDescription,
    };
    setTask(editedTask);
    setDescriptionEditStateFalse();
  };

  //    edit dates
  const [editDates, setEditDates] = useState(false);

  const changeEditDatesState = () => {
    if (IsAuthor(task.authorName)) {
      const e = !editDates;
      setEditDates(e);
    }
  };

  const handleSaveEditDatesButton = (startDate, hasStartTime, endDate) => {
    const editedTask = { ...task, startDate, hasStartTime, endDate };

    const sd = new Date(startDate);
    setStartDate(sd);

    const ed = new Date(endDate);
    setEndDate(ed);

    setTask(editedTask);
    changeEditDatesState();
  };

  // adding and deleting steps
  const handleAddStep = (step) => {
    const taskWithNewSteps = {
      ...task,
      steps: [...task.steps, step],
    };
    setTask(taskWithNewSteps);
  };

  const handleDeleteStep = (id) => {
    const taskWithNewSteps = {
      ...task,
      steps: task.steps.filter((x) => x.id !== id),
    };

    setTask(taskWithNewSteps);
  };

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

  //    edit tags
  const [editTags, setEditTags] = useState(false);

  const changeEditTagsState = () => {
    if (IsAuthor(task.authorName)) {
      const edit = !editTags;
      setEditTags(edit);
    }
  };

  const handleSaveEditTagButton = (newTags) => {
    setTags(newTags);
    changeEditTagsState();
  };

  // cancel sharing
  const submitCancelSharing = (e) => {
    e.preventDefault();
    UserTasks.unshare({ email: GetUserName(), taskId: id }).then((response) => {
      if (response.status === 204) {
        history.push('/');
        history.go();
      }
    });
  };

  // share task modal
  const [open, setOpen] = useState(false);
  const [shareInput, SetShareInput] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handlekOpenShareModal = () => {
    setOpen(true);
  };

  const handleCloseShareModal = () => {
    setIsError(false);
    setErrorMsg("");
    setOpen(false);
  };

  const changeShareInput = (e) => {
    let input = e.target.value;
    SetShareInput(input);
  };

  const handleShareFormSubmit = (e) => {
    e.preventDefault();
    UserTasks.share({ email: shareInput, taskId: id }).then((response) => {
      if (response.status === 200) {
        const utl = [...usersToList, { userName: shareInput }];
        setUsersToList(utl);
        handleCloseShareModal();
        SetShareInput("");
      } else if (response.status === 204) {
        setIsError(true);
        setErrorMsg("user already has access to this task");
      } else {
        setIsError(true);
        setErrorMsg("user not found or you are not the author of the task");
      }
    });
  };

  const handleDeleteButtonClick = () => {
    Tasks.delete(id);
    history.goBack();
  };

  // users with access to this task
  const [usersToList, setUsersToList] = useState([]);

  const handleUnshare = (users) => {
    console.log(users);
    setUsersToList(users);
  };

  useEffect(() => {
    const user = CheckUser();
    if (!user) {
      history.push("/signin");
    }

    Tasks.details(id).then((response) => {
      if (response.status === 200) {
        setTask(response.data);
        if (response.data.description === "") {
          setEditDescription(true);
        }
        setAdded(new Date(response.data.added));
        setStartDate(new Date(response.data.startDate));
        if (response.data.endDate) {
          setEndDate(new Date(response.data.endDate));
        }
        setTaskCompleted(response.data.completed);
        setTags(response.data.tags);
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
        <div className={classes.root}>
          <Grid container spacing={1}>
            <Grid item xs={1}>
              {IsAuthor(task.authorName) && (
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
                  <Tooltip title="share">
                    <div>
                      <IconButton onClick={handlekOpenShareModal}>
                        <ShareIcon />
                      </IconButton>
                    </div>
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
              )}
              {!IsAuthor(task.authorName) && (
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
              {editTitle ? (
                <EditTaskTitleForm
                  title={task.title}
                  id={task.id}
                  afterSubmit={handleSaveEditTitleButton}
                  handleCancel={changeTitleEditState}
                />
              ) : (
                <Typography variant="h5" onClick={changeTitleEditState}>
                  {task.title}
                </Typography>
              )}

              {taskCompleted ? (
                <Typography variant="caption" className={classes.completedText}>
                  completed
                </Typography>
              ) : (
                <Typography
                  variant="caption"
                  className={classes.notCompletedText}
                >
                  not completed
                </Typography>
              )}

              <Box display="flex" className={classes.timeBox}>
                <Box textAlign="left">
                  {editDates ? (
                    <EditTaskDates
                      task={task}
                      afterSubmit={handleSaveEditDatesButton}
                      handleCancel={changeEditDatesState}
                    />
                  ) : (
                    <Fragment>
                      <div
                        className={classes.textWithIcon}
                        onClick={changeEditDatesState}
                      >
                        <TodayIcon className={classes.iconSpacing} />
                        <Typography variant="h6">
                          {format(startDate, "dd.MM.yyyy")}
                          {task.hasStartTime &&
                            ", " + format(startDate, "HH:mm")}
                          {task.endDate && " - " + format(endDate, "HH:mm")}
                        </Typography>
                      </div>
                    </Fragment>
                  )}

                  <Typography
                    variant="subtitle1"
                    className={classes.coloredText}
                  >
                    {`added: ${format(added, "dd.MM.yyyy HH:mm")}`}
                  </Typography>
                </Box>
                <Box textAlign="right" flexGrow={1}>
                  <Box textAlign="right">
                    <Box></Box>
                    <Box></Box>
                  </Box>
                </Box>
              </Box>

              <Box display="flex">
                <Typography variant="subtitle1">tags:</Typography>
                {IsAuthor(task.authorName) && (
                  <Tooltip title="edit tags">
                    <IconButton
                      aria-label="edit tags"
                      size="small"
                      onClick={changeEditTagsState}
                    >
                      {editTags ? <ClearIcon /> : <EditIcon />}
                    </IconButton>
                  </Tooltip>
                )}
              </Box>
              {editTags ? (
                <EditTagsForm
                  task={task}
                  afterSubmit={handleSaveEditTagButton}
                  handleCancel={changeEditTagsState}
                />
              ) : (
                <Box display="flex" flexWrap="wrap">
                  {tags.map((tag) => (
                    <TagChip key={tag} tag={tag} />
                  ))}
                </Box>
              )}

              <Typography variant="subtitle2" className={classes.partName}>
                description:
              </Typography>
              {(editDescription || task.description === "") &&
              IsAuthor(task.authorName) ? (
                <EditTaskDescriptionForm
                  description={task.description}
                  id={task.id}
                  afterSubmit={handleSaveEditDescriptionButton}
                  handleCancel={setDescriptionEditStateFalse}
                  hideCancel={task.description === ""}
                />
              ) : (
                task.description.split(/\r?\n/).map((line, index) => (
                  <Typography
                    key={index}
                    variant="body1"
                    onClick={setDescriptionEditStateTrue}
                  >
                    {line}
                  </Typography>
                ))
              )}

              <Typography variant="subtitle2" className={classes.partName}>
                steps:
              </Typography>
              {IsAuthor(task.authorName) && (
                <AddStepForm taskId={task.id} onAddStep={handleAddStep} />
              )}
              {task.steps && task.steps.length > 0 && (
                <List>
                  {task.steps.map((step) => {
                    return (
                      <ListOfStepsItem
                        step={step}
                        key={step.id}
                        handleDeleteStep={handleDeleteStep}
                        canEdit={IsAuthor(task.authorName)}
                      />
                    );
                  })}
                </List>
              )}

              {usersToList.length > 0 && IsAuthor(task.authorName) && (
                <UsersWithTask
                  taskId={id}
                  usersToList={usersToList}
                  handleUnshare={handleUnshare}
                />
              )}
            </Grid>

            <Grid item sm={1} display={{ xs: "none" }}></Grid>
          </Grid>

          <Dialog
            open={open}
            onClose={handleCloseShareModal}
            aria-labelledby="form-dialog-title"
          >
            <form onSubmit={handleShareFormSubmit}>
              <DialogTitle id="form-dialog-title">Share</DialogTitle>
              <DialogContent>
                {isError && (
                  <Typography className={classes.errorMsg} variant="h6">
                    {errorMsg}
                  </Typography>
                )}
                <DialogContentText>
                  Share this task with other users.
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Email Address"
                  type="email"
                  fullWidth
                  value={shareInput}
                  onChange={changeShareInput}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseShareModal} color="secondary">
                  Cancel
                </Button>
                <Button type="submit">Share</Button>
              </DialogActions>
            </form>
          </Dialog>
        </div>
      ) : (
        <CircularProgress className={classes.circularProgress} />
      )}
    </Page>
  );
}

export default TaskDetailsPage;
