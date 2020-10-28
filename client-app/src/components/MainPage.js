import { Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Page from "./Page";

function MainPage() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, [date]);

  return (
    <Page>
      <Typography variant="h5">
        {date.toLocaleDateString()} - {date.toLocaleTimeString()}
      </Typography>
      <Typography variant="h6">recently added tasks: </Typography>
    </Page>
  );
}

export default MainPage;
