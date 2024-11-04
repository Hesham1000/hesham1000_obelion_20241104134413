import React, { useState, useEffect } from 'react';
import './ViewPostPage.css';
import axios from 'axios';

function ViewPostPage() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ name: '', email: '', text: '' });

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get('https://sinai_blogApp-backend.cloud-stacks.com/api/comments');
      setComments(response.data);
    } catch (error) {
      console.error('Failed to fetch comments');
    }
  };

  const handleInputChange = (e) => {
    setNewComment({ ...newComment, [e.target.name]: e.target.value });
  };

  const handlePostComment = async () => {
    if (newComment.name && newComment.email && newComment.text) {
      try {
        const response = await axios.post('https://sinai_blogApp-backend.cloud-stacks.com/api/comments', newComment, {
          headers: { 'Content-Type': 'application/json' }
        });
        setComments([...comments, response.data]);
        setNewComment({ name: '', email: '', text: '' });
      } catch (error) {
        console.error('Failed to post comment');
      }
    }
  };

  return (
    <div className="view-post-page">
      <header className="header">
        <div className="branding">Website Branding</div>
        <nav className="navigation">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/blog">Blog</a>
          <a href="/contact">Contact</a>
        </nav>
        <h1 className="post-title">Blog Post Title</h1>
      </header>
      <main>
        <article className="blog-content">
          <p>Blog post content goes here...</p>
        </article>
        <section className="comments-section">
          <h2>Comments</h2>
          {comments.map((comment, index) => (
            <div key={index} className="comment">
              <p><strong>{comment.name}</strong> says:</p>
              <p>{comment.text}</p>
            </div>
          ))}
        </section>
        <section className="comment-form">
          <h2>Leave a Comment</h2>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={newComment.name}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={newComment.email}
            onChange={handleInputChange}
          />
          <textarea
            name="text"
            placeholder="Your Comment"
            value={newComment.text}
            onChange={handleInputChange}
          />
          <button onClick={handlePostComment}>Post Comment</button>
        </section>
        <aside className="related-posts">
          <h2>Related Posts</h2>
          <a href="#">Related Post 1</a>
          <a href="#">Related Post 2</a>
        </aside>
      </main>
      <footer className="footer">
        <p>&copy; 2023 Your Website. All rights reserved.</p>
        <div className="social-links">
          <a href="#">Facebook</a>
          <a href="#">Twitter</a>
        </div>
      </footer>
    </div>
  );
}

export default ViewPostPage;
