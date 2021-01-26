import { Tab, Tabs } from "@material-ui/core";
import React from "react";
import { Fragment } from "react";
import Notes from "./TaskNotes";
import TaskShare from "./TaskShare";
import TaskSteps from "./TaskSteps";

function TaskDetailsTabs({ isAuthor, taskId, steps, notes, usersToList }) {
  const [tabIndex, setTabIndex] = React.useState(0);

  const handleChange = (event, tabInd) => {
    setTabIndex(tabInd);
  };

  return (
    <Fragment>
      <Tabs value={tabIndex} onChange={handleChange} centered>
        <Tab label="Steps" />
        <Tab label="Notes" />
        <Tab label="Share" />
      </Tabs>

      {tabIndex === 0 && (
        <TaskSteps isAuthor={isAuthor} taskId={taskId} steps={steps} />
      )}
      {tabIndex === 1 && (
        <Fragment>
          <Notes isAuthor={isAuthor} taskId={taskId} notes={notes} />
        </Fragment>
      )}
      {tabIndex === 2 && (
        <TaskShare
          isAuthor={isAuthor}
          taskId={taskId}
          usersToList={usersToList}
        />
      )}
    </Fragment>
  );
}

export default TaskDetailsTabs;
