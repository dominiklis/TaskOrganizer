import {
  AppBar,
  Button,
  IconButton,
  InputBase,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import AlarmOnIcon from "@material-ui/icons/AlarmOn";
import SearchIcon from "@material-ui/icons/Search";
import { Link, useHistory } from "react-router-dom";
import { Auth } from "../apicalls/auth";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: "linear-gradient(45deg, #0d7377 30%, #32e0c4 90%)",
  },
  alarmIcon: {
    marginRight: theme.spacing(1),
  },
  searchForm: {
    flexGrow: 1,
    display: "flex",
  },
  searchBar: {
    color: "white",
    flexGrow: 1,
  },
  searchIcon: {
    color: "white",
    marginRight: theme.spacing(1),
  },
  title: {
    // marginRight: theme.spacing(2),
  },
  titleButton: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    color: "white",
  },
  link: {
    textDecoration: "none",
    "&:hover": {
      textDecoration: "none",
    },
  },
}));

function AppNavbar() {
  const classes = useStyles();

  const history = useHistory();

  const [searchString, setSearchString] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchString !== "") {
      console.log("SRCH: " + searchString);
    }
  };

  const handleSearchInputChange = (e) => {
    let newSearchString = e.target.value;
    setSearchString(newSearchString);
  };

  const handleSignOutButton = () => {
    Auth.signOut();
    history.push("/signin");
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Link to="/" className={classes.link}>
            <Button className={classes.titleButton} disableRipple>
              <AlarmOnIcon className={classes.alarmIcon} />
              <Typography variant="h6" className={classes.title}>
                Task Organizer
              </Typography>
            </Button>
          </Link>
          <form className={classes.searchForm} onSubmit={handleSearchSubmit}>
            <InputBase
              placeholder="search..."
              onChange={handleSearchInputChange}
              className={classes.searchBar}
            />
            <IconButton
              type="submit"
              aria-label="search"
              className={classes.searchIcon}
            >
              <SearchIcon />
            </IconButton>
          </form>
          <Button variant="contained" onClick={handleSignOutButton}>
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default AppNavbar;
