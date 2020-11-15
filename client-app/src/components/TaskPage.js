import { Typography } from "@material-ui/core";
import Page from "./Page";
import TaskList from "./TaskList";
import Clock from "./Clock";

function TaskPage({ tasks, title }) {
  return (
    <Page>
      <Clock />
      <Typography variant="h6">{title}</Typography>
      <TaskList tasks={tasks}></TaskList>
    </Page>
  );
}

export default TaskPage;
