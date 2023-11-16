/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
import React, { useState, useEffect } from 'react';
import '../routes/Profile.css';

export default function Profile() {
  // Initialize state with localStorage values or default values
  const [name, setName] = useState(localStorage.getItem('profileName') || 'John Doe');
  const [email, setEmail] = useState(localStorage.getItem('profileEmail') || 'johndoe@example.com');
  const [bio, setBio] = useState(localStorage.getItem('profileBio') || 'This is my bio.');
  const [editMode, setEditMode] = useState(false);

  // Effect to load the profile from localStorage on component mount
  useEffect(() => {
    const storedName = localStorage.getItem('profileName');
    const storedEmail = localStorage.getItem('profileEmail');
    const storedBio = localStorage.getItem('profileBio');
    if (storedName) setName(storedName);
    if (storedEmail) setEmail(storedEmail);
    if (storedBio) setBio(storedBio);
  }, []);

  // Save profile to localStorage
  const saveProfile = () => {
    localStorage.setItem('profileName', name);
    localStorage.setItem('profileEmail', email);
    localStorage.setItem('profileBio', bio);
    setEditMode(false); // Exit edit mode after save
  };

  // Handlers for input changes
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleBioChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(event.target.value);
  };

  // Toggle edit mode state
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  return (
    <div className='profile-box'>
      <div className='titel'>
        <h1>Profiel</h1>
      </div>
      {editMode ? (
        <div className='labels'>
          <label>
            Name:
            <input type="text" value={name} onChange={handleNameChange} />
          </label>
          <label>
            Email:
            <input type="email" value={email} onChange={handleEmailChange} />
          </label>
          <label>
            Bio:
            <textarea value={bio} onChange={handleBioChange} />
          </label>
          <button onClick={saveProfile}>Opslaan</button> {/* Save button */}
        </div>
      ) : (
        <div className='info_page'>
          <p>
            <strong>Name:</strong> {name}
          </p>
          <p>
            <strong>Email:</strong> {email}
          </p>
          <p>
            <strong>Bio:</strong> {bio}
          </p>
          <div className='edit-button'>
            <button onClick={toggleEditMode}>Profiel Aanpassen</button> {/* Edit profile button */}
          </div>
        </div>
      )}
    </div>
  );
}
