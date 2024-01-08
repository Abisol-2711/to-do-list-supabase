import { useState } from 'react'
import { supabase } from '../supabase/client'
import { useTasks } from '../context/TaskContext'

function TaskForm() {
  const [taskName, setTaskName] = useState()
  const { createTask, adding } = useTasks()
  // console.log(adding)

  const handleSubmit = async (e) => {
    e.preventDefault()
    createTask(taskName)
    setTaskName('')
    //Esto sirve para agregar datos a la tabala.
    /*
    Pasos:
    1.Llamar a supabase
    2.poner a que tabla le quiero agregar los datos. from('nombre de la tabla')
    3.Agregar un dato respetando los nombres de la tabla. 
     supabase.from('tasks').insert({
        name: taskName,
      })
      IMPORTANTE crear la RLS policy si no no se puede hacer el CRUD.
     */
    // const result = await supabase.from('tasks').insert({
    //   name: taskName,
    //   userId: user.id,
    // })
    // console.log(result)
  }

  return (
    <form onSubmit={handleSubmit} className="card card-body">
      <input
        type="text"
        name="taskName"
        placeholder="Whrite a task name"
        onChange={(e) => setTaskName(e.target.value)}
        value={taskName}
        className="form-control mb-2"
      />
      <div className="ms-auto">
        <button disabled={adding} className="btn btn-primary btn-sm">
          {adding ? 'Adding...' : 'Add'}
        </button>
      </div>
    </form>
  )
}

export default TaskForm
