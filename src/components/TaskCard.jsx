import { useTasks } from '../context/TaskContext'

function TaskCard({ task }) {
  const { deleteTask, updateTask } = useTasks()

  const handleDelete = () => {
    deleteTask(task.id)
  }

  const handleTogggleDone = () => {
    updateTask(task.id, { done: !task.done })
  }

  return (
    <div className="card card-body mb-2">
      <h1>{`${task.id}. ${task.name}`}</h1>
      <p>{task.done ? 'Done ✔️' : 'Not done ✖️'}</p>
      <button
        onClick={() => handleDelete()}
        className="btn btn-danger btn-sm me-1"
      >
        Delete
      </button>
      <button
        onClick={() => handleTogggleDone()}
        className="btn btn-secondary btn-sm"
      >
        Done
      </button>
    </div>
  )
}

export default TaskCard
