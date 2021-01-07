import React from "react";
import Page from "./Page";
import {
  makeStyles,
} from "@material-ui/core";
import { constStrings } from "../utils/constants";
import OverdueTasks from "./OverdueTasks";
import ActiveTasks from "./ActiveTasks";
import PageTitle from "./PageTitle";

function MainPage() {
  return (
    <Page>
      <PageTitle title={constStrings.activeTasks} />
      <OverdueTasks />
      <ActiveTasks />
    </Page>
  );
}

export default MainPage;
