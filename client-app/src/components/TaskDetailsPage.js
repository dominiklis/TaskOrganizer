import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { Box, Button, Typography } from "@material-ui/core";
import React, { useEffect, useState, Fragment } from "react";
import { useHistory, useParams } from "react-router-dom";
import Page from "./Page";
import AddStepForm from "./AddStepForm";
import ListOfSteps from "./ListOfSteps";
import AddNoteForm from "./AddNoteForm";
import NoteCard from "./NoteCard";
import { format } from "date-fns";
import { Tasks } from "../apicalls/requests";
import EditTaskTitleForm from "./EditTaskTitleForm";
import EditTaskDescriptionForm from "./EditTaskDescriptionForm";
import EditTaskDates from "./EditTaskDates";

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
}));

function TaskDetailsPage({ match }) {
  const classes = useStyles();
  const [task, setTask] = useState({});
  const [taskLoaded, setTaskLoaded] = useState(false);
  const [added, setAdded] = useState(false);
  const [startDate, setStartDate] = useState(false);
  const [endDate, setEndDate] = useState(false);

  const [editTitle, setEditTitle] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [editDates, setEditDates] = useState(false);

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

  return (
    <Page>
      {taskLoaded ? (
        <Fragment>
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
              <Typography
                variant="body1"
                component="div"
                onClick={setDescriptionEditStateTrue}
              >
                {task.description}
              </Typography>
            )}
          </Fragment>

          <AddStepForm />
          {task.steps && task.steps.length > 0 && (
            <ListOfSteps steps={task.steps} />
          )}

          <AddNoteForm />
          {task.notes &&
            task.notes.length > 0 &&
            task.notes.map((note) => <NoteCard note={note} key={note.Id} />)}
        </Fragment>
      ) : (
        <CircularProgress className={classes.circularProgress} />
      )}
    </Page>
  );
}

export default TaskDetailsPage;
