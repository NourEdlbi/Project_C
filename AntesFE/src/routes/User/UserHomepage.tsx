/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
import '../User/UserHomepage.css';
import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { BASE_URL } from '../../consts';
import { useNavigate } from 'react-router-dom';
const localizer = momentLocalizer(moment);

export default function Uhome() {
    const [posts, setPosts] = useState([]);
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
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
            });
    }, []);
    const [events, setEvents] = useState([
        {
            id: 1,
            title: 'Event 1',
            start: new Date(2023, 9, 10, 10, 0),
            end: new Date(2023, 9, 10, 12, 0),
        },
        // ... (existing events)
    ]);
    const handlePostClick = (postId) => {
        navigate(`/userSidebar/userForum/${postId}`);
    };
    return (
        <div className='container'>
            <div className="titel">
                <h1 >Home</h1>
            </div>

            <div className="posts">
                <h1>Posts</h1>
            </div >

            <div className="forum_posts">
                {posts.map(post => (
                    <div className='post'>
                        <div key={post.id}>
                            <p>Geplaatst door: {post.forumPosterName}</p>
                            <p>Post datum/tijd: {new Date(post.postTime).toLocaleString()}</p>
                            <h1 onClick={() => handlePostClick(post.id)}>{post.name}</h1>

                        </div>
                    </div>
                ))}
            </div>

            <div className='agenda'>
                <h1>Agenda</h1>
                <p>.</p>

                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: '40vh', width: '112%', backgroundColor: '#F8EEF0', margin: -12 }}
                />
            </div>

            <div className='quizzen'>
                <h1>Quiz</h1>
                Maak verschillende quizzen om je kennis te testen!
            </div>
        </div>
    );
}