import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import MainPage from './MainPage'
import TaskPage from './TaskPage'

function Router() {
  return (
    <BrowserRouter>
        <Switch>
          <Route path="/" component={MainPage} exact />
          <Route path="/task/:id" component={TaskPage} exact />

          {/* <Route>
            <NotFoundPage />
          </Route> */}
        </Switch>
      </BrowserRouter>
  )
}

export default Router
