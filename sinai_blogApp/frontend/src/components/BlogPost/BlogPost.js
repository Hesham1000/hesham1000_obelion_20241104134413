import React, { useState } from 'react';
import './BlogPost.css';
import axios from 'axios';

function BlogPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [link, setLink] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) {
      formData.append('image', image);
    }
    formData.append('link', link);

    try {
      const response = await axios.post('https://sinai_blogApp-backend.cloud-stacks.com/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.status === 201) {
        // Redirect or handle success
        console.log('Post created successfully', response.data);
      }
    } catch (error) {
      console.error('Error creating post', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="blogpost-container">
      <header className="blogpost-header">
        <h1>Publish Your Blog Post</h1>
      </header>
      <form className="blogpost-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Write your thoughts..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <input
          type="url"
          placeholder="Add a link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <button type="submit" className="publish-button">
          Publish
        </button>
      </form>
      <footer className="blogpost-footer">
        <nav>
          <a href="/about">About Us</a>
          <a href="/contact">Contact Us</a>
        </nav>
      </footer>
    </div>
  );
}

export default BlogPost;
