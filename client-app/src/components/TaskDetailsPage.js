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

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    Tasks.details(id).then((response) => {
      if (response.status === 200) {
        setTask(response.data);
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

  return (
    <Page>
      {taskLoaded ? (
        <Fragment>
          <Box display="flex">
            <Box textAlign="left" flexGrow={1}>
              <Typography variant="h4">{task.title}</Typography>
            </Box>
          </Box>

          <Box display="flex" className={classes.timeBox}>
            <Box textAlign="left">
              <Typography variant="h5">
                {format(startDate, "dd.MM.yyyy")}
                {task.hasStartTime && " " + format(startDate, "HH:mm")}
                {task.endDate && " - " + format(endDate, "HH:mm")}{" "}
              </Typography>
              
              <Typography variant="subtitle1">
                {`added: ${format(added, "dd.MM.yyyy HH:mm")}`}
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
            {task.description}
          </Typography>

          <AddStepForm />
          {task.steps && task.steps.length > 0 && (
            <ListOfSteps steps={task.steps} />
          )}

          <AddNoteForm />
          {task.notes &&
            task.notes.length > 0 &&
            task.notes.map((note) => <NoteCard note={note} key={note.id} />)}
        </Fragment>
      ) : (
        <CircularProgress className={classes.circularProgress} />
      )}
    </Page>
  );
}

export default TaskDetailsPage;
