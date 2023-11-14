import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PasswordReset() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Password reset request for:', email);
  };

  return (
    <div className="pagecontent">
      <h1>Wachtwoord vergeten</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="vul je email in."
          />
        </div>
        <button type="submit">Wachtwoord aanvragen</button>
      </form>
    </div>
  );
}