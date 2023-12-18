import React, { useState } from 'react';
import emailjs from 'emailjs-com';

export default function PasswordReset() {
  const [emailSent, setEmailSent] = useState(false);
  const [emailSendingError, setEmailSendingError] = useState(""); 


  const handleSubmit = (event) => {
    event.preventDefault();
    setEmailSent(false);
    setEmailSendingError(""); 

    const email = event.target.elements.email.value;

    const templateParams = {
      email_to: email,
    };

    // Send the email
    emailjs.send(
      'service_hto0evy', // Your EmailJS Service ID
      'template_8vf0ad2',
      templateParams,
      'fY4BkSACibEGz5Y0e'
    )
    .then(response => {
      console.log('SUCCESS!', response.status, response.text);
      setEmailSent(true); 
      event.target.reset(); 
    })
    .catch(err => {
      console.error('FAILED...', err);
      setEmailSent(false); 
      setEmailSendingError("Helaas is het niet gelukt. Probeer het later opnieuw.."); 
    });
  };

  return (
    <div className="pagecontent">
      <h1>Wachtwoord vergeten</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="vul je email in."
            required
          />
        </div>
        <button type="submit">Wachtwoord aanvragen</button>
      </form>
      {emailSent && <p>Mail is verzonden!</p>}
      {emailSendingError && <p className="error-message">{emailSendingError}</p>}
    </div>
  );
}
