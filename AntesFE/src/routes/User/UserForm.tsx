import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../consts';

export default function UserForm() {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [postData, setPostData] = useState({ userID: 0, postName: '', content: '' });
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const [userID, setUserID] = useState('Guest');

    useEffect(() => {

        const storedUserInfo = localStorage.getItem('Userinfo');
        const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;
        if (userInfo && userInfo.id) {
            setUserID(parseInt(userInfo.id, 10));
        }

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
            body: JSON.stringify({ ...postData, userID: userID }),
        };

        fetch(`${BASE_URL}/ForumPost`, options)
            .then(response => response.json())
            .then(data => {
                setPosts(currentPosts => [...currentPosts, data]);
                setPostData({ userID: userID || null, postName: '', content: '' });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };


    const handleDeletePost = (postId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this post?");

        if (confirmDelete) {
            const options = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            fetch(`${BASE_URL}/DeleteForumPost/${postId}`, options)
                .then(response => {
                    if (response.ok) {
                        setPosts(currentPosts => currentPosts.filter(post => post.id !== postId));
                    } else {
                        console.error('Failed to delete post:', response.statusText);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
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
                    {userID === post.forumPosterID && (
                        <button onClick={() => handleDeletePost(post.id)}>Delete</button>

                    )}
                    <button onClick={() => handlePostClick(post.id)}>Details</button>
                </div>
            ))}

        </div>
    );
}
