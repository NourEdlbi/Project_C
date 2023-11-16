import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { useNavigate } from 'react-router-dom';

export default function PasswordReset() {
    const [emailSent, setEmailSent] = useState(false); // State to track email sending status
    const [emailSendingError, setEmailSendingError] = useState(""); // State to track email sending errors
    const navigate = useNavigate();
    const tologin = () => {
        navigate('/');
    }
  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    setEmailSent(false); // Reset the email sent status on new submission
    setEmailSendingError(""); // Reset the email sending error on new submission

    const email = event.target.elements.email.value;

    const templateParams = {
      email_to: email, // Update the property to match the template variable
      // Add other parameters if needed
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
      setEmailSent(true); // Set email sent status to true on success
      event.target.reset(); // Clear the form fields
    })
    .catch(err => {
      console.error('FAILED...', err);
      setEmailSent(false); // Keep email sent status as false on failure
      setEmailSendingError("Helaas is het niet gelukt. Probeer het later opnieuw.."); // Set the error message
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
          <button onClick={tologin}> To Login page</button>
    </div>
  );
}
