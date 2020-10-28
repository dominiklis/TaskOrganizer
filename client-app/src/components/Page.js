import React from "react";
import SideMenu from "./SideMenu";
import AppNavbar from "./AppNavbar";
import { makeStyles, Toolbar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
  },
  content: {
    flexGrow: "5000",
    padding: theme.spacing(3),
  },
}));

function Page({ children }) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <AppNavbar />
      <SideMenu />
      <main className={classes.content}>
        <Toolbar />
        {children}
      </main>
    </div>
  );
}

export default Page;
