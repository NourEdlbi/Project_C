/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
import React, { useState } from 'react';
import '../routes/Profile.css'

export default function Profile() {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [bio, setBio] = useState('This is my bio.');

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleBioChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(event.target.value);
  };

  return (
    <div>
      <div className='titel'>
        <h1>Profiel</h1>
      </div>
      <div className='labels'>
      <label>
        Name: 
        <input type="text" value={name} onChange={handleNameChange} />
      </label>
      <br />
      <label>
        Email: 
        <input type="email" value={email} onChange={handleEmailChange} />
      </label>
      <br />
      <label>
        Bio: 
        <textarea value={bio} onChange={handleBioChange} />
      </label></div>
      
    </div>
  );
}
