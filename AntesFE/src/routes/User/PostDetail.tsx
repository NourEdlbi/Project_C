import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../consts';

export default function PostDetail() {
    const [forumDetail, setForumDetail] = useState({
        postName: '',
        content: '',
        postTime: '',
        forumPosterName: '',
    });
    const [comments, setComments] = useState([]);
    const [commentData, setCommentData] = useState({ forumID: 0, commenterID: 0, content: '' });
    const [userID, setUserID] = useState('Guest');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const storedUserInfo = localStorage.getItem('Userinfo');
        const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;
        if (userInfo && userInfo.id) {
            setUserID(parseInt(userInfo.id, 10));
        }
        fetch(`${BASE_URL}/GetForumDetail/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setForumDetail(data);
            })
            .catch(error => {
                console.error('Error fetching forum detail:', error);
            });

        fetch(`${BASE_URL}/GetComments/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setComments(data);
            })
            .catch(error => {
                console.error('Error fetching comments:', error);
            });
    }, [id]);

    const handleChange = (e) => {
        setCommentData({ ...commentData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newCommentData = {
            ...commentData,
            forumID: parseInt(id),
            commenterID: userID,
        };

        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newCommentData),
        };

        fetch(`${BASE_URL}/CreateComment`, options)
            .then(response => response.json())
            .then(data => {

                setComments([...comments, data]);
                setCommentData({ forumID: 0, commenterID: 0, content: '' });
            })
            .catch(error => {
                console.error('Error:', error);
            });

    };


    return (
        <div>
            {forumDetail.postName ? (
                <div>
                    <p>Geplaatst door: {forumDetail.forumPosterName}</p>
                    <p>Post datum/tijd: {new Date(forumDetail.postTime).toLocaleString()}</p>
                    <h1>{forumDetail.postName}</h1>
                    <h2>{forumDetail.content}</h2>
                </div>
            ) : (
                <p>Geen bestaande post.</p>
            )}
            <h3>Voeg een reactie toe:</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <textarea
                        name="content"
                        value={commentData.content}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Plaats reactie</button>
            </form>

            <button onClick={() => navigate(`/userSidebar/userForum`)}>Terug</button>
            <h2>Reacties:</h2>
            <ul>
                {comments.map(comment => (
                    <li key={comment.id}>
                        <p>Comment van: {comment.commenterName}</p>
                        <p>Comment datum/tijd: {new Date(comment.postTime).toLocaleString()}</p>
                        <h3>{comment.content}</h3>

                    </li>
                ))}
            </ul>

        </div>
    );
}
