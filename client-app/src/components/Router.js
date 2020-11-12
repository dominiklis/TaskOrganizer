import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import AddTaskPage from './AddTaskPage'
import MainPage from './MainPage'
import NotFoundPage from './NotFoundPage'
import TaskPage from './TaskPage'

function Router() {
  return (
    <BrowserRouter>
        <Switch>
          <Route path="/" component={MainPage} exact />
          <Route path="/task/:id" component={TaskPage} exact />
          <Route path="/addtask" component={AddTaskPage} exact />
          <Route component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
  )
}

export default Router
