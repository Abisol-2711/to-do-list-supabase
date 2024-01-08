import { useEffect, useState } from 'react'
import { supabase } from '../supabase/client'
import { useNavigate } from 'react-router-dom'
import TaskForm from './TaskForm'
// import { useTasks } from '../context/TaskContext'
import TaskList from './TaskList'

function Home() {
  const [showTaskDone, setShowTaskDone] = useState(false)
  const navigate = useNavigate()
  // const { tasks } = useTasks()
  // console.log(tasks)

  useEffect(() => {
    if (!supabase.auth.getUser()) {
      navigate('/login')
    }
  }, [navigate])

  return (
    <div className="row pt-4">
      <TaskForm />
      <header className="d-flex justify-content-between my-3">
        <span className="h5">
          {showTaskDone ? 'Tasks done' : 'Tasks to do'}
        </span>
        <button
          onClick={() => {
            setShowTaskDone(!showTaskDone)
          }}
          className="btn btn-dark btn-sm"
        >
          {showTaskDone ? 'Show tasks to do' : 'Show tasks done'}
        </button>
      </header>
      <TaskList done={showTaskDone} />
    </div>
  )
}

export default Home
