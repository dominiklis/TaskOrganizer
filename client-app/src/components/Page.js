import React from "react";
import SideMenu from "./SideMenu";
import AppNavbar from "./AppNavbar";
import { Grid, makeStyles, Toolbar } from "@material-ui/core";

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
        <Grid container spacing={2}>
          <Grid item xs={12} sm={11}>{children}</Grid>
          <Grid item xs={0} sm={1}></Grid>
        </Grid>
        
      </main>
    </div>
  );
}

export default Page;
