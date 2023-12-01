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

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
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
            commenterID: 2, // <<-- Temporary 
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
                    <p>{forumDetail.content}</p>
                </div>
            ) : (
                <p>Geen bestaande post.</p>
            )}
            <h2>Voeg een reactie toe:</h2>
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
                        <p>{comment.content}</p>
                        <p>Geplaatst door: {comment.commenterName}</p>
                        <p>Geplaatst op: {new Date(comment.postTime).toLocaleString()}</p>
                    </li>
                ))}
            </ul>

        </div>
    );
}
