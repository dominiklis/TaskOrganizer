import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardHeader,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";

import DateRangeIcon from "@material-ui/icons/DateRange";
import EditIcon from "@material-ui/icons/Edit";
import { Link } from "react-router-dom";

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
  calendarIcon: {
    marginLeft: theme.spacing(1),
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
}));

function TaskCard({ task }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Box display="flex">
        <CardHeader className={classes.cardHeader}></CardHeader>
        <CardActionArea disableRipple className={classes.card}>
          <Box display="flex">
            <Box flexGrow={25}>
              <Link className={classes.link} to={`/task/${task.TaskId}`}>
                <Typography variant="subtitle1" component="div">
                  <Box display="flex">
                    <Box textAlign="left" flexGrow={1}>
                      {task.Title.length > 60
                        ? `${task.Title.substring(0, 60)}...`
                        : task.Title}
                    </Box>
                    <Box textAlign="right">
                      {task.Deadline.toLocaleDateString()}
                    </Box>
                    <DateRangeIcon className={classes.calendarIcon} />
                  </Box>
                </Typography>
                <Typography variant="subtitle2">
                  added: {task.Added.toLocaleDateString()}{" "}
                  {task.Added.toLocaleTimeString()}
                </Typography>
              </Link>
            </Box>
          </Box>
        </CardActionArea>
        <CardActions>
          <IconButton aria-label="edit" className={classes.darkGreen}>
            <Link className={classes.link} to={`/edit/${task.TaskId}`}>
              <EditIcon />
            </Link>
          </IconButton>
        </CardActions>
      </Box>
    </Card>
  );
}

export default TaskCard;
