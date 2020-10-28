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

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: "240px",
  },
  addItemButton: {
    background: "#32e0c4",
    "&:hover": {
      background: "#98efcb",
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
          <ListItem button className={classes.addItemButton}>
            <ListItemIcon>
              <AddIcon className={classes.addIcon} />
            </ListItemIcon>
            <ListItemText>Add Task</ListItemText>
          </ListItem>

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
