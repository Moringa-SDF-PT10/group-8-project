import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import "../../styles/profileComponent.css"

const LoginForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Simple hardcoded authentication
    if (email === "user@moringa.com" && password === "moringa1234!") {
      // Store user in localStorage
      const user = { email, name: "Moringa Collins" }
      localStorage.setItem("user", JSON.stringify(user))

      // Call login from context if available
      if (login) {
        await login(email, password)
      }

      navigate("/")
    } else {
      setError("Invalid email or password. Try: user@example.com / moringa1234!")
    }
  }

  return (
    <div className="card">
      <h2 className="card-title">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="label">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            placeholder="user@moringa.com"
            required
          />
        </div>
        <div className="form-group">
          <label className="label">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            placeholder="moringa1234!"
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="button button-primary">
          Login
        </button>
      </form>
      <p className="text-link">Demo credentials: user@moringa.com / moringa1234!</p>
    </div>
  )
}

export default LoginForm
