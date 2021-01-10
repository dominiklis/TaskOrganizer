import {
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Tooltip,
  Typography,
  makeStyles,
  ListItemIcon,
  Collapse,
  Box,
} from "@material-ui/core";
import React, { useState } from "react";
import { Fragment } from "react";
import { UserTasks } from "../apicalls/requests";
import ClearIcon from "@material-ui/icons/Clear";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import DetailsIcon from "@material-ui/icons/Details";
import ChangeHistoryIcon from "@material-ui/icons/ChangeHistory";

const useStyles = makeStyles((theme) => ({
  textWithIcon: {
    marginTop: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    "flex-wrap": "wrap",
    color: "#0d7377",
  },
  listItemIcon: {
    color: "#d3d3d3",
  },
}));

function UsersWithTask({ taskId, usersToList, handleUnshare }) {
  const classes = useStyles();
  const [show, setShow] = useState(false);

  const handleClick = () => {
    let s = !show;
    setShow(s);
  };

  const handleUnshareFormSubmit = (e) => {
    e.preventDefault();
    const uname = e.target.elements[0].value;
    UserTasks.unshare({ email: uname, taskId: taskId }).then((response) => {
      if (response.status === 204) {
        let users = usersToList;
        users = users.filter((value) => value.email === uname);

        handleUnshare(users);
      }
    });
  };

  return (
    <Fragment>
      <Box
        display="flex"
        className={classes.textWithIcon}
        onClick={handleClick}
      >
        <Box flexGrow={1}>
          <Typography className={classes.title}>
            users that have access to this task:
          </Typography>
        </Box>
        <Box>{show ? <ChangeHistoryIcon /> : <DetailsIcon />}</Box>
      </Box>

      <Collapse in={show}>
        <List>
          {usersToList.map((user) => (
            <form onSubmit={handleUnshareFormSubmit} key={user.userName}>
              <input type="hidden" name="userName" value={user.userName} />
              <ListItem>
                <ListItemIcon className={classes.listItemIcon}>
                  <RadioButtonUncheckedIcon />
                </ListItemIcon>
                <ListItemText>
                  <Typography>{user.userName}</Typography>
                </ListItemText>
                <ListItemSecondaryAction>
                  <Tooltip title="remove access">
                    <IconButton edge="end" aria-label="delete" type="submit">
                      <ClearIcon />
                    </IconButton>
                  </Tooltip>
                </ListItemSecondaryAction>
              </ListItem>
            </form>
          ))}
        </List>
      </Collapse>
    </Fragment>
  );
}

export default UsersWithTask;
