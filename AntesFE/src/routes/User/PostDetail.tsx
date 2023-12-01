import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function PostDetail() {
    const { id } = useParams();
    const [post, setPost] = useState({ title: '', content: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mock function to simulate fetching a post by ID
        const fetchPostById = async (postId) => {
            const mockPosts = [
                { id: 1, title: 'Hello World', content: 'Welcome to learning React!' },
                { id: 2, title: 'Installation', content: 'You can install React from npm.' }
            ];

            const foundPost = mockPosts.find(p => p.id.toString() === postId);
            if (foundPost) {
                setPost(foundPost);
            }
            setLoading(false);
        };

        fetchPostById(id);
    }, [id]);

    if (loading) {
        return <div>Loading post...</div>;
    }

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
        </div>
    );
}
