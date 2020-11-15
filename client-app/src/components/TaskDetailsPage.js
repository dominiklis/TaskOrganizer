import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { Box, Button, Typography } from "@material-ui/core";
import React, { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import { getTaskById } from "../data/tasks";
import Page from "./Page";
import AddStepForm from "./AddStepForm";
import ListOfSteps from "./ListOfSteps";
import AddNoteForm from "./AddNoteForm";
import NoteCard from "./NoteCard";

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

  const { id } = useParams();

  useEffect(() => {
    const f = async () => {
      const t = await getTaskById(id);
      setTask(t);
      setTaskLoaded(true);
    };
    f();
  }, [id]);

  return (
    <Page>
      {taskLoaded ? (
        <Fragment>
          <Box display="flex">
            <Box textAlign="left" flexGrow={1}>
              <Typography variant="h4">{task.Title}</Typography>
            </Box>
          </Box>

          <Box display="flex" className={classes.timeBox}>
            <Box textAlign="left">
              <Typography variant="h5">
                {`${task.Deadline.toLocaleDateString()} ${task.StartDate.toLocaleTimeString()} - ${task.Deadline.toLocaleTimeString()}`}
              </Typography>
              <Typography variant="subtitle1">
                added:{" "}
                {`${task.Added.toLocaleDateString()} ${task.Added.toLocaleTimeString()}`}
              </Typography>
            </Box>
            <Box textAlign="right" flexGrow={1}>
              <Button color="primary">edit</Button>
              <Button color="secondary">delete</Button>
              <Button>share</Button>
            </Box>
          </Box>

          <Typography variant="subtitle1">description:</Typography>
          <Typography variant="body1" component="div">
            {task.Description}
          </Typography>

          <AddStepForm />
          {task.Steps.length > 0 && <ListOfSteps steps={task.Steps} />}

          <AddNoteForm />
          {task.Notes.length > 0 &&
            task.Notes.map((note) => <NoteCard note={note} key={note.Id} />)}
        </Fragment>
      ) : (
        <CircularProgress className={classes.circularProgress} />
      )}
    </Page>
  );
}

export default TaskDetailsPage;
