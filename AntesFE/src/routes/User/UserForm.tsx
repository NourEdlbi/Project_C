import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../consts';

export default function UserForm() {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [postData, setPostData] = useState({ postName: '', content: '' });
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

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
                setFilteredPosts(data);
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
            });
    }, []);

    useEffect(() => {
        const filtered = posts.filter(post =>
            post.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPosts(filtered);
    }, [searchTerm, posts]);

    const handleChange = (e) => {
        setPostData({ ...postData, [e.target.name]: e.target.value });
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
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
                setPosts(currentPosts => [...currentPosts, data]);
                setPostData({ postName: '', content: '' });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const handlePostClick = (postId) => {
        navigate(`/userSidebar/userForum/${postId}`);
    };

    return (
        <div>
            <h1>Forum</h1>
            <div>
                <input
                    type="text"
                    placeholder="Zoek in berichten..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
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

            {filteredPosts.map(post => (
                <div key={post.id}>
                    <p>{post.name}</p>
                    <button onClick={() => handlePostClick(post.id)}>Details</button>
                </div>
            ))}
        </div>
    );
}
