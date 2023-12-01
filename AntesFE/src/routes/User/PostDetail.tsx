import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../consts';

export default function PostDetail() {
    const [forumDetail, setForumDetail] = useState({
        postName: '',   // Use 'postName' instead of 'Name'
        content: '',    // Use 'content' instead of 'Content'
        postTime: '',   // Use 'postTime' instead of 'PostTime'
        forumPosterName: '', // Use 'forumPosterName' instead of 'ForumPosterName'
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
                setForumDetail(data); // Update the state with fetched data
            })
            .catch(error => {
                console.error('Error fetching forum detail:', error);
            });
    }, [id]);

    return (
        <div>
            <h1>Forum Post Detail</h1>
            {forumDetail.postName ? ( // Use 'postName' instead of 'Name'
                <div>
                    <h3>{forumDetail.postName}</h3>  {/* Use 'postName' instead of 'Name' */}
                    <p>{forumDetail.content}</p>      {/* Use 'content' instead of 'Content' */}
                    <p>Date Posted: {new Date(forumDetail.postTime).toLocaleString()}</p> {/* Use 'postTime' instead of 'PostTime' */}
                    <p>Posted By: {forumDetail.forumPosterName}</p> {/* Use 'forumPosterName' instead of 'ForumPosterName' */}
                </div>
            ) : (
                <p>Loading...</p>
            )}
            <button onClick={() => navigate(`/userSidebar/userForum`)}>Go Back</button>
        </div>
    );
}
