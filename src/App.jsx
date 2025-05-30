import { Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import ProtectedRoute from "./components/profile/ProtectedRoute"
import NavBar from "./components/profile/NavBar"
import LoginForm from "./components/profile/LoginForm"
import RegisterForm from "./components/profile/RegisterForm"
import ResetPasswordForm from "./components/profile/ResetPasswordForm"
import ProfileInfo from "./components/profile/ProfileInfo"
import "./styles/App.css"

function App() {
  return (
    <AuthProvider>
      <div className="app">
        <NavBar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<div className="page-content">Welcome to the Travel App!</div>} />
            <Route path="/about" element={<div className="page-content">About Us</div>} />
            <Route path="/contact" element={<div className="page-content">Contact Us</div>} />
            <Route
              path="/login"
              element={
                <div className="login-container">
                  <LoginForm />
                </div>
              }
            />
            <Route
              path="/register"
              element={
                <div className="login-container">
                  <RegisterForm />
                </div>
              }
            />
            <Route
              path="/reset-password"
              element={
                <div className="login-container">
                  <ResetPasswordForm />
                </div>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <div className="page-content">
                    <ProfileInfo />
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/itinerary"
              element={
                <ProtectedRoute>
                  <div className="page-content">Itinerary Page</div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/bookings"
              element={
                <ProtectedRoute>
                  <div className="page-content">Bookings Page</div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <div className="page-content">Settings Page</div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  )
}

export default App
