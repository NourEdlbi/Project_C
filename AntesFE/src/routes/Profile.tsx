/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
import React, { useState } from 'react';
import '../routes/Profile.css';
import { BASE_URL } from "../consts.ts";
export default function Profile() {
    //need to get name and email from jason token
    interface userinfoInterface {
        id: number;
        name: string;
        email: string;
        admin: boolean;
    }

    const [userInfos, setUserInfos] = useState<userinfoInterface>();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('blablabalba');
    const [changedBio, setChangedBio] = useState('');

    const update = {
        email: "hash@hash.hash", //userInfos?.email,
        bio: changedBio
    };

    const postoptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(update),
    };

    const postBio = () => {
        fetch(`${BASE_URL}/PostBio`, postoptions).then(response => response.json())
            .then(data => {
                setBio(data) // dit moet nog kijken want werkr nog niet
                // do whatever you want with the data
            }
        );
    };

    const getbio = {
        email: "hash@hash.hash" //userInfos?.email 
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
                setBio(data)
                // do whatever you want with the data
            }
        );
    };

    const handleBioChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setChangedBio(event.target.value);
    };
    window.onload = function () {
        getBio();
        const test = localStorage.getItem('Userinfo');
        setUserInfos(JSON.parse((test)!));
        setName((userInfos.name)!);
        setEmail((userInfos.email)!);
    };

    const test = () => {
        const test = localStorage.getItem('Userinfo');
        getBio();
        //setUserInfos(JSON.parse((test)!));
        setUserInfos(JSON.parse((test)!));
        setName((userInfos.name)!);
        setEmail((userInfos.email)!);
        
    }

    return (
        <div className='container'>
            <div className='titel'>
                <h1>Profiel</h1>
            </div>
            <div className='labels'>
                <label>
                    Name: {name}         
                </label>
                <br />
                <label>
                    Email: {email} 
                </label>
                <br />
                <label>
                    Bio: {bio}  <br></br>
                </label>

                <button onClick={postBio}> changeBio </button>
                <textarea value={changedBio} onChange={handleBioChange} />
                <button onClick={getBio}>Getbio </button>
                <button onClick={test}> Getinfofromlocalstorage</button>
                profile pic
            </div>
        </div>
    );
}
