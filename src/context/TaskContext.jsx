import { createContext, useContext, useState } from 'react'
import { supabase } from '../supabase/client'

export const TaskContext = createContext()
//Creación de un hook para que en vez de estar llamando a TaskContext y useContextext, se llame solo una vez
export const useTasks = () => {
  const context = useContext(TaskContext)
  if (!context)
    throw new Error('useTasks must be used whithin a TaskContextProvider')
  return context
}

//Crear un contexto sirve para poder utilizar todos los datos de en archivo en todos los damas archivo sin esta repitiendo las mismas lineas de codigo
export const TaskContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([])
  const [adding, setAdding] = useState(false)
  const [loading, setLoading] = useState(false)

  const getTasks = async (done = false) => {
    setLoading(true)
    const userInformation = await supabase.auth.getUser()
    const user = userInformation.data.user
    const { error, data } = await supabase
      .from('tasks')
      .select()
      .eq('userId', user.id)
      .eq('done', done)
      .order('id', { ascending: true })

    if (error) throw error

    setTasks(data)
    setLoading(false)
  }

  const createTask = async (taskName) => {
    setAdding(true)
    try {
      //IMPORTANTE porner el await antes de trabajar con supabase ya se que estan haciendo pediddos al back y eso requiere de tiempo, es decir, asincronia.
      const userInformation = await supabase.auth.getUser()
      const user = userInformation.data.user
      const { error, data } = await supabase
        .from('tasks')
        .insert({
          name: taskName,
          userId: user.id,
        })
        .select()

      if (error) throw error

      setTasks([...tasks, ...data])

      // console.log(data)
    } catch (error) {
      console.log(error)
    } finally {
      setAdding(false)
    }
  }

  const deleteTask = async (id) => {
    // console.log(id)
    const userInformation = await supabase.auth.getUser()
    const user = userInformation.data.user
    const { error, data } = await supabase
      .from('tasks')
      .delete()
      .eq('userId', user.id)
      .eq('id', id)

    if (error) throw error

    setTasks(tasks.filter((task) => task.id !== id))
  }

  const updateTask = async (id, updateFields) => {
    console.log(id, updateFields)
    const userInformation = await supabase.auth.getUser()
    const user = userInformation.data.user
    const { error, data } = await supabase
      .from('tasks')
      .update(updateFields)
      .eq('userId', user.id)
      .eq('id', id)

    if (error) throw error

    setTasks(tasks.filter((task) => task.id !== id))

    // console.log(data)
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        getTasks,
        createTask,
        adding,
        loading,
        deleteTask,
        updateTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}
