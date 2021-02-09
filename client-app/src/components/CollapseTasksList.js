import { Box, Collapse, makeStyles, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { Fragment } from "react";
import DetailsIcon from "@material-ui/icons/Details";
import ChangeHistoryIcon from "@material-ui/icons/ChangeHistory";
import TaskGroupsList from "./TaskGroupsList";

const useStyles = makeStyles((theme) => ({
  textWithIcon: {
    display: "flex",
    alignItems: "center",
    "flex-wrap": "wrap",
  },
}));

function CollapseTasksList({ tasks, icon, title, titleStyle, showGroupNames }) {
  const classes = useStyles();
  const [show, setShow] = useState(false);

  const handleClick = () => {
    let s = !show;
    setShow(s);
  };
  return (
    <Fragment>
      <Box
        className={classes.textWithIcon}
        onClick={handleClick}
      >
        <Box>{icon}</Box>
        <Box flexGrow={1}>
          <Typography variant="h5" className={titleStyle}>
            {title}
          </Typography>
        </Box>
        <Box>
          {show ? (
            <ChangeHistoryIcon className={titleStyle} />
          ) : (
            <DetailsIcon className={titleStyle} />
          )}
        </Box>
      </Box>

      <Collapse in={show}>
        <TaskGroupsList tasks={tasks} showGroupNames={showGroupNames} />
      </Collapse>
    </Fragment>
  );
}

export default CollapseTasksList;
