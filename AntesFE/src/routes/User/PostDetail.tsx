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
    }, [id]);

    return (
        <div>
            <h1>Forum Post Detail</h1>
            {forumDetail.postName ? (
                <div>
                    <h3>{forumDetail.postName}</h3>
                    <p>{forumDetail.content}</p>
                    <p>Date Posted: {new Date(forumDetail.postTime).toLocaleString()}</p>
                    <p>Posted By: {forumDetail.forumPosterName}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
            <button onClick={() => navigate(`/userSidebar/userForum`)}>Go Back</button>
        </div>
    );
}
