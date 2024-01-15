import React, { useState } from 'react';
import emailjs from 'emailjs-com';

export default function AddUser() {
  const [emailSent, setEmailSent] = useState(false);
  const [emailSendingError, setEmailSendingError] = useState("");
  const [deleteEmail, setDeleteEmail] = useState("");
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setEmailSent(false);
    setEmailSendingError("");

    const newUser = {
      name: event.target.elements.name.value,
      surname: event.target.elements.surname.value,
      email: event.target.elements.email.value
    };

    const templateParams = {
      from_name: 'Team Antes',
      to_email: newUser.email,
      reply_to: 'your_email@example.com',
      // Placeholders must be the same like in emailjs.com!!
      name: newUser.name,
      surname: newUser.surname,
      email: newUser.email
    };

    emailjs.send(
      'service_hto0evy',
      'template_l05r34q',
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
      setEmailSendingError("Email versturen niet gelukt. Probeer het later opnieuw.");
    });
  };

  async function deleteUser(email) {
    try {
      const response = await fetch('https://localhost:7109/DeleteUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }),
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log(result.message); // Log success message
        setDeleteSuccess(true); // Set delete success state
      } else {
        const error = await response.json();
        console.error(error.error); // Log error message
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
    }
  }
  

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
        <div>
    </div>
      </form>
      <div>
        <h2>Delete User</h2>
        <input
          type="email"
          placeholder="Enter email to delete"
          value={deleteEmail}
          onChange={(e) => setDeleteEmail(e.target.value)}
        />
        <button onClick={() => deleteUser(deleteEmail)}>Delete User</button>
        {deleteSuccess && <p>User deleted successfully.</p>}
        {emailSendingError && <p className="error-message">{emailSendingError}</p>}
      </div>
      {emailSent && <p>Email verstuurd!!</p>}
      {emailSendingError && <p className="error-message">{emailSendingError}</p>}
    </div>
  );
}



