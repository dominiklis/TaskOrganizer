import {
  Typography,
} from "@material-ui/core";
import React from "react";
import { constStrings } from "../utils/constants";
import Page from "./Page";
import TaskForm from "./TaskForm";

function AddTaskPage() {
  return (
    <Page>
      <Typography variant="h6">{constStrings.addNewTask}</Typography>
      <TaskForm />
    </Page>
  );
}

export default AddTaskPage;
