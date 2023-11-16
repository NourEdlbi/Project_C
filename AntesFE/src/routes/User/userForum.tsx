/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
import React, { useState, useEffect } from 'react';
import { TextField, Button, Card, CardContent, Typography, CardActions } from '@mui/material';

export default function UserForum() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ id: 0, text: '', name: '', date: '' });
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('forumPosts')) || [];
    setPosts(storedPosts.map(post => ({ ...post, date: new Date(post.date) })));
  }, []);

  const handlePostChange = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const handlePostSubmit = () => {
    if (newPost.text && newPost.name) {
      const postId = posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1;
      const date = new Date();
      const updatedPosts = [...posts, { ...newPost, id: postId, date }];
      setPosts(updatedPosts);
      localStorage.setItem('forumPosts', JSON.stringify(updatedPosts));
      setNewPost({ ...newPost, id: postId, text: '' }); // Reset the text field but keep the name for convenience
    }
  };

  const openPost = (postId) => {
    const post = posts.find(p => p.id === postId);
    setSelectedPost(post);
  };

  const closePost = () => {
    setSelectedPost(null);
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom style={{position: 'relative', color: '#A2102C', bottom: '100%', left: '1%'}}>
        Forum
      </Typography>
      {selectedPost ? (
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h5" component="h2">
              {selectedPost.name} says: {selectedPost.text}
            </Typography>
            <Typography color="textSecondary">
              {selectedPost.date.toLocaleString()}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={closePost}>
              Back to Forum
            </Button>
          </CardActions>
        </Card>
      ) : (
        <>
          <TextField
            label="Your Name"
            variant="outlined"
            name="name"
            value={newPost.name}
            onChange={handlePostChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Write a post"
            variant="outlined"
            name="text"
            value={newPost.text}
            onChange={handlePostChange}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handlePostSubmit}
            style={{ marginTop: '20px' }}
          >
            Post
          </Button>
        </>
      )}
      <div style={{ marginTop: '20px' }}>
        {posts.map((post) => (
          <Card key={post.id} variant="outlined" style={{ marginBottom: '10px' }}>
            <CardContent>
              <Typography variant="h6" component="h3">
                {post.name} says:
              </Typography>
              <Typography variant="body2" component="p">
                {post.text}
              </Typography>
              <Typography color="textSecondary">
                {post.date.toLocaleString()}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => openPost(post.id)}>
                Open Post
              </Button>
              {/* Add a delete button if needed
              <Button size="small" color="secondary" onClick={() => deletePost(post.id)}>
                Delete Post
              </Button>
              */}
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
}
