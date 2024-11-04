import React, { useState, useEffect } from 'react';
import './Comment.css';
import axios from 'axios';

const Comment = () => {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');

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

  const handleAddComment = async () => {
    try {
      const newComment = { name, email, text };
      const response = await axios.post('https://sinai_blogApp-backend.cloud-stacks.com/api/comments', newComment, {
        headers: { 'Content-Type': 'application/json' }
      });
      setComments([...comments, response.data]);
      setName('');
      setEmail('');
      setText('');
    } catch (error) {
      console.error('Failed to add comment');
    }
  };

  const handleLikeComment = async (id) => {
    try {
      const response = await axios.put(`https://sinai_blogApp-backend.cloud-stacks.com/api/comments/${id}/like`);
      setComments(comments.map(comment => 
        comment.id === id ? response.data : comment
      ));
    } catch (error) {
      console.error('Failed to like comment');
    }
  };

  const handleReplyComment = async (id) => {
    const replyText = prompt('Enter your reply:');
    if (!replyText) return;
    try {
      const response = await axios.put(`https://sinai_blogApp-backend.cloud-stacks.com/api/comments/${id}/reply`, { text: replyText }, {
        headers: { 'Content-Type': 'application/json' }
      });
      setComments(comments.map(comment => 
        comment.id === id ? response.data : comment
      ));
    } catch (error) {
      console.error('Failed to reply to comment');
    }
  };

  return (
    <div className="comment-section">
      <div className="existing-comments">
        {comments.map(comment => (
          <div key={comment.id} className="comment">
            <p><strong>{comment.name}</strong> ({comment.email})</p>
            <p>{comment.text}</p>
            <button onClick={() => handleLikeComment(comment.id)}>Like ({comment.likes})</button>
            <button onClick={() => handleReplyComment(comment.id)}>Reply</button>
            <div className="replies">
              {comment.replies.map(reply => (
                <p key={reply.id}>{reply.text}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="comment-form">
        <input 
          type="text" 
          placeholder="Your Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        <input 
          type="email" 
          placeholder="Your Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <textarea 
          placeholder="Your Comment" 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
        />
        <button onClick={handleAddComment}>Post Comment</button>
      </div>
    </div>
  );
};

export default Comment;
