import {
  Box,
  Card,
  CardActionArea,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";

import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(1),
  },
  card: {
    padding: theme.spacing(2),
  },
}));

function TaskCard({ task }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea disableRipple className={classes.card}>
        <Box display="flex">
          <Box flexGrow={1}>
            <CheckBoxOutlineBlankIcon />
          </Box>
          <Box flexGrow={25}>
            <Typography variant="subtitle1" component="div">
              <Box display="flex">
                <Box textAlign="left" flexGrow={1}>
                  {task.Title.length > 60 ? `${task.Title.substring(0, 60)}...` : task.Title}
                </Box>
                <Box textAlign="right">
                  {task.Deadline.toLocaleDateString()}
                </Box>
              </Box>
            </Typography>
            <Typography variant="subtitle2" /*className={classes.flexClass}*/>
              added: {task.Added.toLocaleDateString()}  {task.Added.toLocaleTimeString()}
            </Typography>
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  );
}

export default TaskCard;
