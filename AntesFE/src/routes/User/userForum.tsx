import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography, CardActions } from '@mui/material';
import axios from 'axios';
export default function UserForum() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ id: 1, text: '', date: new Date() });
  const [selectedPost, setSelectedPost] = useState(null);

  const handlePostChange = (e) => {
    setNewPost({
      ...newPost,
      [e.target.name]: e.target.value,
    });
  };

  // const handlePostSubmit = () => {
  //   if (newPost.text) {
  //     setPosts([...posts, { ...newPost, date: new Date() }]);
  //     setNewPost({ id: newPost.id + 1, text: '', date: new Date() });
  //   }
  // };


  const handlePostSubmit = () => {
    if (newPost.text) {
      // Make an API call to save the post
      axios.post('/api/posts', {
        text: newPost.text,
        userId: 1, // Replace with the actual user ID
        name: 'test', // Replace with the actual user name
      })
        .then((response) => {
          // Handle the success response
          console.log('Post saved successfully:', response.data);
          setPosts([...posts, { ...newPost, date: new Date() }]);
          setNewPost({ id: newPost.id + 1, text: '', date: new Date() });
        })
        .catch((error) => {
          // Handle the error response
          console.error('Error saving post:', error);
        });
    }
  };
  const openPost = (postId) => {
    const post = posts.find((p) => p.id === postId);
    setSelectedPost(post);
  };

  const closePost = () => {
    setSelectedPost(null);
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Forum
      </Typography>
      {selectedPost ? (
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h5" component="h2">
              {selectedPost.text}
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
        <div>
          <TextField
            label="Write a post"
            variant="outlined"
            name="text"
            value={newPost.text}
            onChange={handlePostChange}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handlePostSubmit} style={{ marginTop: '20px' }}>
            Post
          </Button>
        </div>
      )}
      <div style={{ marginTop: '20px' }}>
        {posts.map((post) => (
          <Card key={post.id} variant="outlined" style={{ marginBottom: '10px' }}>
            <CardContent>
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
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
}
