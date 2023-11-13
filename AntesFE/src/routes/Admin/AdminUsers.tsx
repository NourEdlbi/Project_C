import React, { useState } from 'react';
import emailjs from 'emailjs-com';

export default function AddUser() {
  const [users, setUsers] = useState([]);
  const [emailSent, setEmailSent] = useState(false); // State to track email sending status
  const [emailSendingError, setEmailSendingError] = useState(""); // State to track email sending errors

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    setEmailSent(false); // Reset the email sent status on new submission
    setEmailSendingError(""); // Reset the email sending error on new submission

    const newUser = {
      name: event.target.elements.name.value,
      surname: event.target.elements.surname.value,
      email: event.target.elements.email.value
    };

    // Add the user to the state
    setUsers(prevUsers => [...prevUsers, newUser]);

    // Prepare the parameters to send in the email
    const templateParams = {
      from_name: newUser.name + ' ' + newUser.surname,
      to_email: newUser.email, // Email address from the form
      reply_to: 'your_email@example.com',
    };

    // Send the email
    emailjs.send(
      'service_hto0evy', // Service ID from EmailJS
      'template_l05r34q', // Template ID from EmailJS
      templateParams,
      'fY4BkSACibEGz5Y0e' // User ID from EmailJS
    )
    .then(response => {
      console.log('SUCCESS!', response.status, response.text);
      setEmailSent(true); // Set email sent status to true on success
      event.target.reset(); // Clear the form fields
    })
    .catch(err => {
      console.error('FAILED...', err);
      setEmailSent(false); // Keep email sent status as false on failure
      setEmailSendingError("Failed to send email. Please try again later."); // Set the error message
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" placeholder="Voornaam" required />
        </div>

        <div>
          <label htmlFor="surname">Surname:</label>
          <input type="text" id="surname" name="surname" placeholder="Achternaam" required />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" placeholder="Email" required />
        </div>

        <div>
          <button type="submit">Send Email</button>
        </div>
      </form>
      {emailSent && <p>Mail is verzonden!</p>}
      {emailSendingError && <p className="error-message">{emailSendingError}</p>}
    </div>
  );
}
