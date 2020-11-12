import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Toolbar,
} from "@material-ui/core";
import React from "react";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import AddIcon from "@material-ui/icons/Add";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import TodayIcon from "@material-ui/icons/Today";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";
import PeopleIcon from '@material-ui/icons/People';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: "240px",
  },
  addItemButton: {
    background: "#21d8ba",
    "&:hover": {
      background: "#43e3c9",
    },
    color: "white",
  },
  addIcon: {
    color: "white",
  },
  drawerPaper: {
    width: "240px",
  },
  drawerContainer: {
    marginTop: theme.spacing(3),
    overflow: "auto",
  },
  link: {
    textDecoration: "none",
    "&:hover": {
      textDecoration: "none",
    },
  },
}));

function SideMenu() {
  const classes = useStyles();
  return (
    <Drawer
      variant="permanent"
      color="primary"
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <div className={classes.drawerContainer}>
        <List>
          <Link to="/addtask" className={classes.link}>
            <ListItem button className={classes.addItemButton}>
              <ListItemIcon>
                <AddIcon className={classes.addIcon} />
              </ListItemIcon>
              <ListItemText>Add Task</ListItemText>
            </ListItem>
          </Link>

          <ListItem button>
            <ListItemIcon>
              <ImportContactsIcon />
            </ListItemIcon>
            <ListItemText>My Tasks</ListItemText>
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <TodayIcon />
            </ListItemIcon>
            <ListItemText>Today</ListItemText>
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <FolderOpenIcon />
            </ListItemIcon>
            <ListItemText>Groups</ListItemText>
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText>Shared</ListItemText>
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <CalendarTodayIcon />
            </ListItemIcon>
            <ListItemText>Calendar</ListItemText>
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
}

export default SideMenu;
