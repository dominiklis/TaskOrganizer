import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import AddTaskPage from './AddTaskPage'
import EditTaskPage from './EditTaskPage'
import MainPage from './MainPage'
import NotFoundPage from './NotFoundPage'
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
          <Route path="/edit/:id" component={EditTaskPage} exact />
          <Route component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
  )
}

export default Router
