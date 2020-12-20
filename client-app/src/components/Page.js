import React, { useEffect, useState } from "react";
import SideMenu from "./SideMenu";
import AppNavbar from "./AppNavbar";
import { Grid, makeStyles, Toolbar } from "@material-ui/core";
import { CheckUser } from "../apicalls/auth";
import { useHistory } from "react-router-dom";
import { Fragment } from "react";

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
  const history = useHistory();
  const classes = useStyles();

  const [logged, setLogged] = useState(false);

  useEffect(() => {
    const user = CheckUser();
    setLogged(user);

    if (!user) {
      history.push("/signin");
    }
  }, [history]);

  return (
    <div className={classes.container}>
      {logged && (
        <Fragment>
          <AppNavbar />
          <SideMenu />
          <main className={classes.content}>
            <Toolbar />
            <Grid container spacing={1}>
              <Grid item xs={12} sm={11}>
                {children}
              </Grid>
              <Grid item xs={false} sm={1}></Grid>
            </Grid>
          </main>
        </Fragment>
      )}
    </div>
  );
}

export default Page;
