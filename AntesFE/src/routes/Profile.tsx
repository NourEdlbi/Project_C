import React, { useState , useEffect} from 'react';
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
    const [bio, setBio] = useState('');
    const [changedBio, setChangedBio] = useState('');

    useEffect(() => {
        const storedUserInfo = localStorage.getItem('Userinfo');
        const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;
        setUserInfos(userInfo);

        if (userInfo && userInfo.name) {
            setName(userInfo.name);
        }
        if (userInfo && userInfo.email) {
            setEmail(userInfo.email)
        }
        const storedBio = localStorage.getItem('Bio');
        if (storedBio != null) {
            setBio(storedBio)
        }
    },[]);


    const update = {
        email: userInfos?.email, 
        bio: changedBio
    };

    const postoptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(update),
    };

    async function postBio(){
        await 
        fetch(`${BASE_URL}/PostBio`, postoptions).then(response => response.text())
            .then(data => {
                localStorage.setItem('Bio', JSON.stringify(data)); //dit werkt wel
            }
        );
        see("Bio")

        location.reload();
    }

    const getbio = {
        email: userInfos?.email 
    };

    const getoptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(getbio),
    };

    const getBio = () => {
        fetch(`${BASE_URL}/GetBio`, getoptions).then(response => response.json())
            .then(data => {
                localStorage.setItem('Bio',JSON.stringify(data));
                setBio(JSON.stringify(data))
                // do whatever you want with the data
            }
        );
        
    };

    const handleBioChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setChangedBio(event.target.value);
    };

    const [isNightMode, setIsNightMode] = useState(() => {
        const savedMode = localStorage.getItem('isNightMode');
        return savedMode !== null ? JSON.parse(savedMode) : false;
    });

    const [textSize, setTextSize] = useState(() => {
        const savedSize = localStorage.getItem('textSize');
        return savedSize !== null ? parseInt(savedSize, 10) : 16; // Default text size is 16 if not stored
    });

    useEffect(() => {
        localStorage.setItem('isNightMode', JSON.stringify(isNightMode));
        localStorage.setItem('textSize', textSize.toString()); // Save text size to local storage
        document.body.style.fontSize = `${textSize}px`; // Apply the text size to the body element
    }, [isNightMode, textSize]);

    const toggleNightMode = () => {
        setIsNightMode(!isNightMode);
    };

    const increaseTextSize = () => {
        setTextSize(prevSize => Math.min(prevSize + 2, 30));
    };

    const decreaseTextSize = () => {
        setTextSize(prevSize => Math.max(prevSize - 2, 10));
    };

    const [formData, setFormData] = useState({ password: '', confirmPassword: '' });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        fetch(`${BASE_URL}/Password_Reset`, options).then(res => console.log(res)).catch(error => console.log(error));
        console.log('Form submitted', formData);
        alert('Wachtwoord veranderd!');
    };

    const changepassword = {
        email: userInfos?.email, //we zijn ingelogd dus email komt van userinfo localstorage
        wachtwoord: formData.password,
    };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(changepassword),
    };

    function see(id) {
        const x = document.getElementById(id) as HTMLElement;
        if (x.style.display == "block") {
            x.style.display = "none";
        }
        else {
            x.style.display = "block";
        }
    }
    
    return (
        <div className='container'>
            <body onLoad={()=>getBio() }>
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
                    <button  onClick={() => see("Bio")} > Bewerk biografie</button>
                    <div id="Bio" className="settingButton">
                        <textarea  value={changedBio} onChange={handleBioChange} />
                        <button onClick={postBio}> opslaan</button>
                    </div>
                    
                </label>
               {/* //button for testing purposes will be removed
                <button onClick={getBio}>Getbio </button>*/}
                profile pic laten zien
                <label>
                    Tekstgrootte:
                    <button onClick={decreaseTextSize}>Maak tekst kleiner</button>
                    <button onClick={increaseTextSize}>Maak tekst groter</button>
                </label>
                   
                <label>
                    Nachtmodus:
                    <button onClick={toggleNightMode}>Verander</button>
                </label>
                <label>
                    Wachtoord:
                    <button onClick={() => see("wachtwoord")}> Wachtwoord veranderen</button>
                    <form id="wachtwoord" className="settingButton" onSubmit={handleSubmit}>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required >
                        </input>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required>
                        </input>  <br></br>
                        <button type="submit">Verander wachtwoord.</button>
                    </form>
                </label>
                </div>
            </body>
        </div>
    );
}
