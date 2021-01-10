import {
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Toolbar,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import PeopleIcon from "@material-ui/icons/People";
import WarningIcon from "@material-ui/icons/Warning";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: "220px",
    [theme.breakpoints.down("lg")]: {
      width: "75px",
    },
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
    width: "220px",
    [theme.breakpoints.down("sm")]: {
      width: "75px",
    },
  },
  drawerContainer: {
    marginTop: theme.spacing(3),
    overflow: "auto",
  },
  link: {
    textDecoration: "none",
    color: "#666666",
    "&:hover": {
      textDecoration: "none",
    },
  },
}));

const menuItems = [
  {
    name: "addTaskButton",
    label: "Add Task",
    icon: <AddIcon />,
    linkTo: "/add",
    styled: true,
  },
  {
    name: "myTaskButton",
    label: "My Tasks",
    icon: <ImportContactsIcon />,
    linkTo: "/",
  },
  {
    name: "overdueButton",
    label: "Overdue",
    icon: <WarningIcon />,
    linkTo: "/overdue",
  },
  {
    name: "sharedButton",
    label: "Shared",
    icon: <PeopleIcon />,
    linkTo: "/shared",
  },
  {
    name: "doneButton",
    label: "Done",
    icon: <CheckCircleIcon />,
    linkTo: "/done",
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
                    <ListItemIcon className={classes.styledIcon}>
                      {el.icon}
                    </ListItemIcon>
                    <Hidden smDown>
                      <ListItemText>{el.label}</ListItemText>
                    </Hidden>
                  </ListItem>
                ) : (
                  <ListItem button>
                    <ListItemIcon>{el.icon}</ListItemIcon>
                    <Hidden smDown>
                      <ListItemText>{el.label}</ListItemText>
                    </Hidden>
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
