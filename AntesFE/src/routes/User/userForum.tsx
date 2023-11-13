import React, { useState } from 'react';

export default function userForum() {
  const centerText = {
    textAlign: 'center',
  };

  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ id: 1, text: '', date: new Date() });
  const [selectedPost, setSelectedPost] = useState(null);

  const handlePostChange = (e) => {
    const { name, value } = e.target;
    setNewPost({
      ...newPost,
      [name]: value,
    });
  };

  const handlePostSubmit = () => {
    if (newPost.text) {
      setPosts([...posts, { ...newPost }]);
      setNewPost({ id: newPost.id + 1, text: '', date: new Date() });
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
    <div style={centerText}>
      <h2>Forum</h2>
      {selectedPost ? (
        <div>
          <button onClick={closePost}>Back to Forum</button>
          <h3>{selectedPost.text}</h3>
          <p>{selectedPost.date.toString()}</p>
        </div>
      ) : (
        <div>
          <input
            type="text"
            name="text"
            value={newPost.text}
            onChange={handlePostChange}
            placeholder="Write a post"
          />
          <button onClick={handlePostSubmit}>Post</button>
        </div>
      )}
      <div>
        {posts.map((post) => (
          <div key={post.id}>
            <p>{post.text}</p>
            <p>{post.date.toString()}</p>
            <button onClick={() => openPost(post.id)}>Open Post</button>
          </div>
        ))}
      </div>
    </div>
  );
}
