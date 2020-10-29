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
}));

function AppNavbar() {
  const classes = useStyles();

  const [searchString, setSearchString] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log(searchString);
  };

  const handleSearchInputChange = (e) => {
    let newSearchString = e.target.value;
    setSearchString(newSearchString);
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Button className={classes.titleButton} disableRipple>
            <AlarmOnIcon className={classes.alarmIcon} />
            <Typography variant="h6" className={classes.title}>
              Task Organizer
            </Typography>
          </Button>
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
          <Button variant="contained">Sign Out</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default AppNavbar;
