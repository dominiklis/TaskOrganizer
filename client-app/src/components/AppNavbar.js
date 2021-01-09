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

  const handleSearchButton = () => {
    if (searchString !== "") {
      history.push(`/search/${searchString}`);
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

  const handleSearchEnter = (e) => {
    if (e.key === "Enter") {
      handleSearchButton();
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Link to="/" className={classes.link}>
            <Button className={classes.titleButton} disableRipple>
              <AlarmOnIcon className={classes.alarmIcon} />
              <Typography variant="h6">Task Organizer</Typography>
            </Button>
          </Link>
          <InputBase
            placeholder="search..."
            onChange={handleSearchInputChange}
            className={classes.searchBar}
            onKeyDown={handleSearchEnter}
          />
          <IconButton
            onClick={handleSearchButton}
            aria-label="search"
            className={classes.searchIcon}
          >
            <SearchIcon />
          </IconButton>
          <Button variant="contained" onClick={handleSignOutButton}>
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default AppNavbar;
