// Uforum.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../consts';

export default function Uforum() {
    const [postData, setPostData] = useState({ postName: '', content: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setPostData({
            ...postData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        };

        fetch(`${BASE_URL}/ForumPost`, options)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Post created:', data);
                // Handle post creation success
            })
            .catch((error) => {
                console.error('Error:', error);
                // Handle errors
            });
    };


    return (
        <div>
            <h1>Forum</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Post Title:</label>
                    <input
                        type="text"
                        name="postName"
                        value={postData.postName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Content:</label>
                    <textarea
                        name="content"
                        value={postData.content}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Post</button>
            </form>
            {/* Rest of the forum component */}
        </div>
    );
}
