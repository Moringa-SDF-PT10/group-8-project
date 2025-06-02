import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import "../../styles/profileComponent.css"

const ProfileInfo = () => {
  const { user } = useContext(AuthContext)

  return (
    <div className="card">
      <h2 className="card-title">Profile</h2>
      <p className="text">
        <strong>Name:</strong> {user?.name || "N/A"}
      </p>
      <p className="text">
        <strong>Email:</strong> {user?.email || "N/A"}
      </p>
      <p className="text">
        <strong>Joined:</strong> {user ? new Date().toLocaleDateString() : "N/A"}
      </p>
    </div>
  )
}

export default ProfileInfo
