import { useEffect } from 'react'
import { useTasks } from '../context/TaskContext'
import TaskCard from './TaskCard'

function TaskList({ done = false }) {
  const { tasks, getTasks, loading } = useTasks()
  // console.log(tasks)

  useEffect(() => {
    getTasks(done)
  }, [done])

  function renderTasks() {
    if (loading) {
      return <p>Loading...</p>
    } else if (tasks.length === 0) {
      return <p>No tasks found</p>
    } else {
      return (
        <div>
          <h1>List tasks</h1>
          {tasks.map((task) => (
            <TaskCard task={task} key={task.id} />
          ))}
        </div>
      )
    }
  }

  return <div>{renderTasks()}</div>
}

export default TaskList
