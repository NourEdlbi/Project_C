import React, { useState } from 'react';
import emailjs from 'emailjs-com';

export default function AddUser() {
  const [emailSent, setEmailSent] = useState(false);
  const [emailSendingError, setEmailSendingError] = useState("");

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
      {emailSent && <p>Email verstuurd!!</p>}
      {emailSendingError && <p className="error-message">{emailSendingError}</p>}
    </div>
  );
}



