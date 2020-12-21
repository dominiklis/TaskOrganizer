import { CircularProgress, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { Box, Button, Typography } from "@material-ui/core";
import React, { useEffect, useState, Fragment } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import Page from "./Page";
import AddStepForm from "./AddStepForm";
import ListOfSteps from "./ListOfSteps";
// import AddNoteForm from "./AddNoteForm";
// import NoteCard from "./NoteCard";
import { format } from "date-fns";
import { Tasks } from "../apicalls/requests";
import EditTaskTitleForm from "./EditTaskTitleForm";
import EditTaskDescriptionForm from "./EditTaskDescriptionForm";
import EditTaskDates from "./EditTaskDates";
import EditIcon from "@material-ui/icons/Edit";
import ClearIcon from "@material-ui/icons/Clear";
import EditTagsForm from "./EditTagsForm";

const useStyles = makeStyles((theme) => ({
  timeBox: {
    width: "100%",
    borderRadius: "10px",
    padding: theme.spacing(1),
    backgroundColor: "#f0f0f0",
  },
  circularProgress: {
    color: "#0d7377",
  },
  button: {
    marginBottom: theme.spacing(1),
  },
  tagLink: {
    marginRight: theme.spacing(1),
    color: "#0d5537",
    textDecoration: "none",
    "&:hover": {
      color: "#037c81",
      textDecoration: "none",
    },
  },
}));

function TaskDetailsPage({ match }) {
  const classes = useStyles();
  const [task, setTask] = useState({});
  const [taskLoaded, setTaskLoaded] = useState(false);
  const [taskCompleted, setTaskCompleted] = useState(false);
  const [added, setAdded] = useState(false);
  const [startDate, setStartDate] = useState(false);
  const [endDate, setEndDate] = useState(false);
  const [tags, setTags] = useState([]);

  const [editTitle, setEditTitle] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [editDates, setEditDates] = useState(false);
  const [editTags, setEditTags] = useState(false);

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
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
        setTags(response.data.tags)
        setTaskLoaded(true);
      } else {
        history.push("/NotFound");
      }
    });
  }, [id, history]);

  const handleDeleteButtonClick = () => {
    Tasks.delete(id);
    history.goBack();
  };

  const changeTitleEditState = () => {
    const e = !editTitle;
    setEditTitle(e);
  };

  const handleSaveEditTitleButton = (newTitle) => {
    const editedTask = {
      ...task,
      title: newTitle,
    };
    setTask(editedTask);
    changeTitleEditState();
  };

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

  const handleSaveEditDatesButton = (startDate, hasStartTime, endDate) => {
    const editedTask = { ...task, startDate, hasStartTime, endDate };

    const sd = new Date(startDate);
    setStartDate(sd);

    const ed = new Date(endDate);
    setEndDate(ed);

    setTask(editedTask);
    changeEditDatesState();
  };

  const changeEditDatesState = () => {
    const e = !editDates;
    setEditDates(e);
  };

  const handleAddStep = (step) => {
    const taskWithNewSteps = {
      ...task,
      steps: [...task.steps, step],
    };
    setTask(taskWithNewSteps);

    console.log(step);
  };

  const handleDeleteStep = (id) => {
    const taskWithNewSteps = {
      ...task,
      steps: task.steps.filter((x) => x.id !== id),
    };

    setTask(taskWithNewSteps);
  };

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

  const changeEditTagsState = () => {
    const edit = !editTags;
    setEditTags(edit);
  };

  const handleSaveEditTagButton = (newTags) => {
    console.log(newTags);
    // const editedTask = {
    //   ...task,
    //   title: newTitle,
    // };

    setTags(newTags);
    changeEditTagsState();
  };

  return (
    <Page>
      {taskLoaded ? (
        <Fragment>
          <Box display="flex">
            <Box textAlign="left" flexGrow={1}>
              {editTitle ? (
                <EditTaskTitleForm
                  title={task.title}
                  id={task.id}
                  afterSubmit={handleSaveEditTitleButton}
                  handleCancel={changeTitleEditState}
                />
              ) : (
                <Typography variant="h4" onClick={changeTitleEditState}>
                  {task.title}
                </Typography>
              )}
            </Box>
            <Box textAlign="right">
              <form onSubmit={handleCompletedFormSubmit}>
                <Button color="primary" type="submit">
                  {taskCompleted ? "undone task" : "done"}
                </Button>
              </form>
            </Box>
          </Box>

          <Fragment>
            <Box display="flex" className={classes.timeBox}>
              <Box textAlign="left">
                {editDates ? (
                  <EditTaskDates
                    task={task}
                    afterSubmit={handleSaveEditDatesButton}
                    handleCancel={changeEditDatesState}
                  />
                ) : (
                  <Typography variant="h5" onClick={changeEditDatesState}>
                    {format(startDate, "dd.MM.yyyy")}
                    {task.hasStartTime && " " + format(startDate, "HH:mm")}
                    {task.endDate && " - " + format(endDate, "HH:mm")}{" "}
                  </Typography>
                )}

                <Typography variant="subtitle1">
                  {`added: ${format(added, "dd.MM.yyyy HH:mm")}`}
                </Typography>
              </Box>
              <Box textAlign="right" flexGrow={1}>
                <Button color="secondary" onClick={handleDeleteButtonClick}>
                  delete
                </Button>
                <Button>share</Button>
              </Box>
            </Box>

            <Box display="flex">
              <Typography variant="subtitle1">tags:</Typography>
              <IconButton
                aria-label="edit tags"
                size="small"
                onClick={changeEditTagsState}
              >
                {editTags ? <ClearIcon /> : <EditIcon />}
              </IconButton>
            </Box>
            {editTags ? (
              <EditTagsForm task={task} afterSubmit={handleSaveEditTagButton} handleCancel={changeEditTagsState}/>
            ) : (
              <Box display="flex" flexWrap="wrap">
                {tags.map((tag) => (
                  <Box key={tag}>
                    <Link to={`/tag/${tag}`} className={classes.tagLink}>
                      {tag}
                    </Link>
                  </Box>
                ))}
              </Box>
            )}

            <Typography variant="subtitle2">description:</Typography>
            {editDescription || task.description === "" ? (
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
          </Fragment>

          <AddStepForm taskId={task.id} onAddStep={handleAddStep} />
          {task.steps && task.steps.length > 0 && (
            <ListOfSteps
              steps={task.steps}
              handleDeleteStep={handleDeleteStep}
            />
          )}

          {/* <AddNoteForm />
          {task.notes &&
            task.notes.length > 0 &&
            task.notes.map((note) => <NoteCard note={note} key={note.Id} />)} */}
        </Fragment>
      ) : (
        <CircularProgress className={classes.circularProgress} />
      )}
    </Page>
  );
}

export default TaskDetailsPage;
