import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import "../../styles/profileComponent.css"

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext)

  if (loading) {
    return <div className="text text-center">Loading...</div>
  }

  return user ? children : <Navigate to="/login" />
}

export default ProtectedRoute
