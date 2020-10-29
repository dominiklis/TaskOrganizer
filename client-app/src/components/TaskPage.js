import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getTaskById } from '../data/tasks';
import Page from './Page'

function TaskPage({match}) {
  const { id } = useParams();

  const [task, setTask] = useState({});
  const [taskLoaded, setTaskLoaded] = useState(false);

  useEffect(() => {
    const f = async () => {
      const t = await getTaskById(id);
      setTask(t);
      setTaskLoaded(true);
    };
    f();
  }, []);


  return (
    <Page>
      {taskLoaded ? task.Title : "loading..."}
    </Page>
  )
}

export default TaskPage