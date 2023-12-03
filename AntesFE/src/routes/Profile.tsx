/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
import React, { useState } from 'react';
import '../routes/Profile.css';
import { BASE_URL } from "../consts.ts";
export default function Profile() {
    //need to get name and email from jason token
    const [name, setName] = useState('John Doe');
    const [email, setEmail] = useState('johndoe@example.com');
    const [bio, setBio] = useState('This is my bio.');

    const update = {
        email: "tes@te.nl",
        bio: bio
    };

    const postoptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(update),
    };

    const postBio = () => {
        fetch(`${BASE_URL}/PostBio`, postoptions).then(res => console.log(res)).catch(error => console.log(error));
    };

    const getbio = {
        email: "tes@te.nl",
    };

    const getoptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(getbio),
    };

    const getBio = () => {
        fetch(`${BASE_URL}/GetBio`, getoptions).then(response => response.json())
            .then(data => {
                setBio( data)
                // do whatever you want with the data
            });
    };

    const handleBioChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setBio(event.target.value);
    };
    window.onload = function () {
        getBio();
    };

    return (
    <div className='container'>
        <div className='titel'>
        <h1>Profiel</h1>
        </div>
        <div className='labels'>
        <label>
        Name: 
        {name}
        </label>
        <br />
        <label>
        Email: 
        {email} 
        </label>
        <br />
        <label>
        Bio: 
                    <textarea value={bio} onChange={handleBioChange} />
                    <button onClick={postBio}> changeBio </button>
                    <button onClick={getBio}> testbutton </button>

                </label>
            profile pic
            </div>
        
      
    </div>
    );
}
