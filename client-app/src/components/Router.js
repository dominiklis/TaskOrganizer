import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import AddTaskPage from './AddTaskPage'
import MainPage from './MainPage'
import NotFoundPage from './NotFoundPage'
import SignInPage from './SignInPage'
import SignUpPage from './SignUpPage'
import TaskDetailsPage from './TaskDetailsPage'
import TodaysTasksPage from './TodaysTasksPage'

function Router() {
  return (
    <BrowserRouter>
        <Switch>
          <Route path="/" component={MainPage} exact />
          <Route path="/today" component={TodaysTasksPage} exact />
          <Route path="/task/:id" component={TaskDetailsPage} exact />
          <Route path="/add" component={AddTaskPage} exact />
          <Route path="/signin" component={SignInPage} exact />
          <Route path="/signup" component={SignUpPage} exact />
          <Route component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
  )
}

export default Router
