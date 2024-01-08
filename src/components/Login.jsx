import { useEffect, useState } from 'react'
import { supabase } from '../supabase/client'
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()

  useEffect(() => {
    if (!supabase.auth.getUser()) {
      navigate('/')
    }
  }, [navigate])

  const [email, setEmail] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log(email)
    try {
      const result = await supabase.auth.signInWithOtp({
        email,
      })
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="row pt-4">
      <div className="cool-md4 offset-md-4">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="youremail@site.com"
            onChange={(e) => setEmail(e.target.value)}
            className="form-control mb-2"
          />
          <button className="btn btn-primary">Send</button>
        </form>
      </div>
    </div>
  )
}

export default Login
