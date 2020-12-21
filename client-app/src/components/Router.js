import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import OverdueTasksPage from "../components/OverdueTasksPage";
import AddTaskPage from "./AddTaskPage";
import MainPage from "./MainPage";
import NotFoundPage from "./NotFoundPage";
import SignInPage from "./SignInPage";
import SignUpPage from "./SignUpPage";
import TagPage from "./TagPage";
import TaskDetailsPage from "./TaskDetailsPage";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={MainPage} exact />
        <Route path="/task/:id" component={TaskDetailsPage} exact />
        <Route path="/add" component={AddTaskPage} exact />
        <Route path="/signin" component={SignInPage} exact />
        <Route path="/signup" component={SignUpPage} exact />
        <Route path="/overdue" component={OverdueTasksPage} exact />
        <Route path="/tag/:tagName" component={TagPage} exact />
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
