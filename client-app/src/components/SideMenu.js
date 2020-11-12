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
import PeopleIcon from "@material-ui/icons/People";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: "240px",
  },
  styledButton: {
    background: "#21d8ba",
    "&:hover": {
      background: "#43e3c9",
    },
    color: "white",
  },
  styledIcon: {
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
    color: "grey",
    "&:hover": {
      textDecoration: "none",
    },
  },
}));

const menuItems = [
  {
    name: "addTaskButton",
    label: "Add Tasks",
    icon: <AddIcon />,
    linkTo: "/addtask",
    styled: true,
  },
  {
    name: "myTaskButton",
    label: "My Tasks",
    icon: <ImportContactsIcon />,
    linkTo: "/mytask",
  },
  {
    name: "todayButton",
    label: "Today",
    icon: <TodayIcon />,
    linkTo: "/todaystask",
  },
  {
    name: "groupsButton",
    label: "Groups",
    icon: <FolderOpenIcon />,
    linkTo: "/groups",
  },
  {
    name: "sharedButton",
    label: "Shared",
    icon: <PeopleIcon />,
    linkTo: "/shared",
  },
  {
    name: "calendarButton",
    label: "Calendar",
    icon: <CalendarTodayIcon />,
    linkTo: "/clanedar",
  },
];

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
          {menuItems.map((el) => {
            return (
              <Link to={el.linkTo} className={classes.link} key={el.name}>
                {el.styled ? (
                  <ListItem button className={classes.styledButton}>
                    <ListItemIcon className={classes.styledIcon}>{el.icon}</ListItemIcon>
                    <ListItemText>{el.label}</ListItemText>
                  </ListItem>
                ) : (
                  <ListItem button>
                    <ListItemIcon>{el.icon}</ListItemIcon>
                    <ListItemText>{el.label}</ListItemText>
                  </ListItem>
                )}
              </Link>
            );
          })}
        </List>
      </div>
    </Drawer>
  );
}

export default SideMenu;
