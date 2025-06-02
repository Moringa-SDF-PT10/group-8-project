import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import "../../styles/profileComponent.css"

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await register(name, email, password);
    if (success) {
      navigate('/profile');
    } else {
      setError('Registration failed');
    }
  };

  return (
    <div className="card">
      <h2 className="card-title">Register</h2>
      <div>
        <div className="form-group">
          <label className="label">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
            required
          />
        </div>
        <div className="form-group">
          <label className="label">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
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
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button
          type="button"
          onClick={handleSubmit}
          className="button button-primary"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default RegisterForm;