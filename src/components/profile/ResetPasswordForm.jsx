import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import "../../styles/profileComponent.css"

const ResetPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const { resetPassword } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await resetPassword(email);
    if (success) {
      setMessage('Password reset link sent (simulated).');
      setTimeout(() => navigate('/login'), 2000);
    } else {
      setMessage('Error sending reset link.');
    }
  };

  return (
    <div className="card">
      <h2 className="card-title">Reset Password</h2>
      <div>
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
        {message && <p className={message.includes('Error') ? 'error' : 'success'}>{message}</p>}
        <button
          type="button"
          onClick={handleSubmit}
          className="button button-primary"
        >
          Send Reset Link
        </button>
      </div>
    </div>
  );
};

export default ResetPasswordForm;