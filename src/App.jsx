import './App.css'
import Login from './components/Login'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Home from './components/Home'
import NotFound from './components/NotFound'
import { useEffect } from 'react'
import { supabase } from './supabase/client'
import { TaskContextProvider } from './context/TaskContext'
import Navbar from './components/Navbar'
function App() {
  const navigate = useNavigate()

  useEffect(() => {
    //Esto sirve para saber si es user esta activo o no, es decir si esta autenticado o no

    supabase.auth.onAuthStateChange((event, session) => {
      // console.log(event, session)
      //En este if estamos diciendo que si el user no esta autenticado lo redirija a la pag. login y si no a la pagina de bienvenida
      if (!session) {
        navigate('/login')
      } else {
        navigate('/')
      }
    })
  }, [])

  return (
    <>
      <TaskContextProvider>
        <Navbar />
        <div className="centrar">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </TaskContextProvider>
    </>
  )
}

export default App
