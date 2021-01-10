import React from 'react'
import { constStrings } from '../utils/constants'
import Page from './Page'
import PageTitle from './PageTitle'
import SharedByMeTasks from './SharedByMeTasks'
import SharedToMeTasks from './SharedToMeTasks'

function SharedTasksPage() {
  return (
    <Page>
      <PageTitle title={constStrings.sharedTasks} />
      <SharedToMeTasks />
      <SharedByMeTasks />
    </Page>
  )
}

export default SharedTasksPage
