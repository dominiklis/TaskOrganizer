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
import React, { useEffect, useState } from "react";

import CheckIcon from "@material-ui/icons/Check";
import { Link } from "react-router-dom";
import { format } from "date-fns";

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
}));

function TaskCard({ task }) {
  const classes = useStyles();
  // const [added, setAdded] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    // setAdded(new Date(task.added));
    setStartDate(new Date(task.startDate));
    if (task.endDate) {
      setEndDate(new Date(task.endDate));
    }
  }, [/*task.added, */ task.startDate, task.endDate]);

  return (
    <Card className={classes.root}>
      <Box display="flex">
        <CardHeader className={classes.cardHeader}></CardHeader>
        <CardActionArea disableRipple className={classes.card}>
          <Box display="flex">
            <Box flexGrow={25}>
              <Link className={classes.link} to={`/task/${task.id}`}>
                <Typography variant="body1" component="div">
                  <Box display="flex">
                    <Box textAlign="left" flexGrow={1}>
                      {task.title.length > 60
                        ? `${task.title.substring(0, 60)}...`
                        : task.title}
                    </Box>
                  </Box>
                </Typography>
                <Box display="flex">
                  <Typography variant="body2">
                    {task.hasStartTime && " " + format(startDate, "HH:mm")}
                    {task.endDate && " - " + format(endDate, "HH:mm")}{" "}
                  </Typography>
                </Box>
              </Link>
            </Box>
          </Box>
        </CardActionArea>
        <CardActions>
          <IconButton aria-label="edit" className={classes.darkGreen}>
            <CheckIcon />
          </IconButton>
        </CardActions>
      </Box>
    </Card>
  );
}

export default TaskCard;
