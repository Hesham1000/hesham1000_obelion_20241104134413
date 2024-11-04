import React from 'react';
import Account from './src/components/Account/Account.js';
import BlogPost from './src/components/BlogPost/BlogPost.js';
import Comment from './src/components/Comment/Comment.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to My Blog</h1>
      </header>
      <main>
        <Account />
        <BlogPost />
        <Comment />
      </main>
    </div>
  );
}

export default App;
