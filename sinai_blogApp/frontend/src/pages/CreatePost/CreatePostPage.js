import React, { useState } from 'react';
import './CreatePostPage.css';
import axios from 'axios';

const CreatePostPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handlePublish = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.post('https://sinai_blogApp-backend.cloud-stacks.com/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Post published', response.data);
      window.location.href = '/'; // Redirect to homepage or dashboard
    } catch (err) {
      setError(err.response ? err.response.data.error : 'Error publishing post');
    }
  };

  return (
    <div className="create-post-page">
      <header className="header">
        <h1>Blog App</h1>
        <nav>
          <a href="/">Home</a>
          <a href="/about">About Us</a>
          <a href="/contact">Contact Us</a>
        </nav>
      </header>
      <main>
        <h2>Create a New Blog Post</h2>
        {error && <p className="error">{error}</p>}
        <form className="post-form">
          <input
            type="text"
            placeholder="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Write your post content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          <button type="button" onClick={handlePublish}>Publish</button>
        </form>
      </main>
      <footer>
        <a href="/about">About Us</a>
        <a href="/contact">Contact Us</a>
      </footer>
    </div>
  );
};

export default CreatePostPage;
