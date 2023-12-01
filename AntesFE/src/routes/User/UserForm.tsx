import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../consts';

export default function UserForm() {
    const [posts, setPosts] = useState([]);
    const [postData, setPostData] = useState({ postName: '', content: '' });
    const navigate = useNavigate();

    // Fetch posts from the backend when the component mounts
    useEffect(() => {
        fetch(`${BASE_URL}/GetForumPosts`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setPosts(data);
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
            });
    }, []);

    const handleChange = (e) => {
        setPostData({ ...postData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postData),
        };

        fetch(`${BASE_URL}/ForumPost`, options)
            .then(response => response.json())
            .then(data => {
                setPosts([...posts, data]);
                setPostData({ postName: '', content: '' });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    // Navigate to the post detail view
    const handlePostClick = (postId) => {
        navigate(`/userSidebar/userForum/${postId}`);
    };

    return (
        <div>
            <h1>Forum</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Titel post:</label>
                    <input
                        type="text"
                        name="postName"
                        value={postData.postName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Bericht:</label>
                    <textarea
                        name="content"
                        value={postData.content}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Plaatsen</button>
            </form>

            {posts.map(post => (
                <div key={post.id}>
                    <p>{post.name}</p>
                    <button onClick={() => handlePostClick(post.id)}>Details</button>
                </div>
            ))}
        </div>
    );
}