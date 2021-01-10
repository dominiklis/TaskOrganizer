import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardHeader,
  IconButton,
  makeStyles,
  Tooltip,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Tasks } from "../apicalls/requests";
import TagChip from "./TagChip";
import { IsAuthor } from "../apicalls/auth";
import ShareIcon from "@material-ui/icons/Share";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(1),
  },
  card: {
    padding: theme.spacing(2),
  },
  cardHeader: {
    background: "#037c81",
  },
  cardHeaderDone: {
    background: "#21d8ba",
  },
  calendarIcon: {
    marginRight: theme.spacing(1),
  },
  darkGreen: {
    color: "#0d5537",
  },
  link: {
    color: "black",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "none",
    },
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
  taskCompleted: {
    color: "red",
  },
}));

function TaskCard({ task }) {
  const classes = useStyles();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [taskCompleted, setTaskCompleted] = useState(task.completed);

  useEffect(() => {
    setStartDate(new Date(task.startDate));
    if (task.endDate) {
      setEndDate(new Date(task.endDate));
    }
  }, [task.startDate, task.endDate]);

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

  return (
    <Card className={classes.root}>
      <Box display="flex">
        <CardHeader
          className={`${
            taskCompleted ? classes.cardHeaderDone : classes.cardHeader
          }`}
        ></CardHeader>
        <CardActionArea disableRipple className={classes.card}>
          <Box display="flex">
            <Box flexGrow={25}>
              <Link className={classes.link} to={`/task/${task.id}`}>
                <Typography
                  variant="body1"
                  component="div"
                  color={`${taskCompleted ? "textSecondary" : "initial"}`}
                >
                  <Box display="flex">
                    <Box textAlign="left" flexGrow={1}>
                      {task.title.length > 60
                        ? `${task.title.substring(0, 60)}...`
                        : task.title}
                    </Box>
                  </Box>
                </Typography>

                {!IsAuthor(task.authorName) && (
                  <Typography variant="caption">{`task shared by ${task.authorName}`}</Typography>
                )}
                <Box display="flex">
                  <Typography
                    variant="body2"
                    color={`${taskCompleted ? "textSecondary" : "initial"}`}
                  >
                    {task.hasStartTime && " " + format(startDate, "HH:mm")}
                    {task.endDate && " - " + format(endDate, "HH:mm")}{" "}
                  </Typography>
                  <Box textAlign="right" flexGrow={1}>
                    <Typography
                      variant="body2"
                      color={`${taskCompleted ? "initial" : "textSecondary"}`}
                    >{`${
                      taskCompleted ? "completed" : "not completed"
                    }`}</Typography>
                  </Box>
                </Box>
              </Link>
              {task.tags.length > 0 && (
                <Box display="flex">
                  {task.tags.slice(0, 3).map((tag) => (
                    <TagChip key={tag} tag={tag} />
                  ))}
                  {task.tags.length > 3 && <Typography>{"..."}</Typography>}
                </Box>
              )}
            </Box>
          </Box>
        </CardActionArea>
        <CardActions>
          {IsAuthor(task.authorName) ? (
            <Tooltip
              title={taskCompleted ? "mark as incomplete" : "mark as completed"}
            >
              <form onSubmit={handleCompletedFormSubmit}>
                <IconButton
                  aria-label="edit"
                  className={classes.darkGreen}
                  type="submit"
                >
                  {taskCompleted ? <ClearIcon /> : <CheckIcon />}
                </IconButton>
              </form>
            </Tooltip>
          ) : (
            <IconButton className={classes.darkGreen} disabled>
              <ShareIcon />
            </IconButton>
          )}
        </CardActions>
      </Box>
    </Card>
  );
}

export default TaskCard;
